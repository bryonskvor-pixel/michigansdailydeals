// scripts/scraper.ts
// Dutchie GraphQL scraper for Michigan dispensary menus
// Vercel Cron: runs daily at 8am ET
// Two-step process:
//   1. MenuFiltersV2 → confirm which target brands are stocked + brand IDs
//   2. FilteredProducts (paginated) → fetch all products, filter client-side by brand

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ============================================================
// CONFIRMED DUTCHIE ENDPOINTS & HASHES
// All captured from mintdeals.com/monroe-mi network tab
// ============================================================
const DUTCHIE = {
  GRAPHQL:      'https://dutchie.com/graphql',
  GRAPHQL_API4: 'https://dutchie.com/api-4/graphql',
  HASHES: {
    MenuFiltersV2:    '2f0b3233b8a2426b391649ca3f0f7a5d43b9aefd683f6286d7261a2517e3568e',
    FilteredProducts: '98b4aaef79a84ae804b64d550f98dd64d7ba0aa6d836eb6b5d4b2ae815c95e32',
    FilteredSpecials: '0dfb85a4fc138c55a076df7cbd511428e1cf5a5b863b3eb',
  },
};

// ============================================================
// TARGET BRANDS — with confirmed Dutchie IDs from Mint Monroe
// ============================================================
const TARGET_BRANDS: Record<string, { id: string; aliases: string[] }> = {
  '710 Labs':          { id: 'ef96572a-2030-4b58-9504-5b98a7bd9c7e', aliases: ['710labs'] },
  'Common Citizen':    { id: 'b640dcb4-100b-4953-8b79-1958efcf137c', aliases: [] },
  'Hytek':             { id: 'ef9b4274-5f03-428e-b77b-9b101c418483', aliases: ['hy-tek'] },
  'Peninsula Gardens': { id: '597aaeda-579f-4f32-a1ad-3d19074e197f', aliases: ['peninsula'] },
  'Michigrown':        { id: 'abf42981-8d58-4bff-aaed-dbed76031960', aliases: [] },
  'KSHN':              { id: 'f8e383d0-7b2a-4d5d-80ab-7a1d1ae8e0ea', aliases: ['kshn pouch'] },
  'Mary Jones':        { id: '0c438f96-3d7a-49b2-9d85-31210ea51004', aliases: ['mary jones soda'] },
  'Eastside Alchemy':  { id: 'deb785e8-edf0-4a83-8dce-63a75ddf9b73', aliases: [] },
  'Cannalicious':      { id: '77a5a3a2-3c85-439d-8380-f82278a270bf', aliases: ['cannalicious labs'] },
  'Legit Labs':        { id: 'e7c8034b-4c4f-4929-94d5-8dd7520288ff', aliases: [] },
  'A1ZA':              { id: 'b61fc0d6-5048-4dff-bbd5-2058b9e1f1be', aliases: [] },
  'Pro Gro':           { id: '3a6b36a6-94b0-4735-ab0f-acccd7c5c1f3', aliases: ['progro', 'progrow'] },
  'Pleasanteas':       { id: '2393ba9a-bac1-47c1-a931-4a465339271d', aliases: ['pleasant teas'] },
  'Mitten Extracts':   { id: 'ba02e9fb-ab00-443e-90dd-28e920e1be08', aliases: ['mitten'] },
  'Humblebee':         { id: '', aliases: ['humble bee'] },
  'Uniq Pressure':     { id: '', aliases: ['uniq'] },
  'Dabstract':         { id: '', aliases: [] },
  'Doja Exclusive':    { id: '', aliases: ['doja'] },
  'Barracuda':         { id: '', aliases: [] },
  'Deli Flower':       { id: '', aliases: [] },
  'Lit Labs':          { id: '', aliases: [] },
  'Redbud Roots':      { id: '', aliases: ['red bud'] },
  'North Coast':       { id: '', aliases: [] },
  'Vapin Ape':         { id: '', aliases: ["vapin'ape"] },
  'Alien Tek Farms':   { id: '', aliases: ['alien tek'] },
  'Lume':              { id: '', aliases: [] },
};

// ============================================================
// DISPENSARIES
// endpoint: override if dispensary hosts Dutchie on their own domain
//           defaults to DUTCHIE.GRAPHQL if not specified
// ============================================================
const DISPENSARIES: Array<{
  id: number;
  name: string;
  city: string;
  dutchie_id: string;
  endpoint?: string; // custom domain for Dutchie API
}> = [
  {
    id: 12,
    name: 'Mint Cannabis Monroe',
    city: 'Monroe',
    dutchie_id: '62058ef65b73e100946b628d',
    // uses dutchie.com/graphql (default)
  },
  {
    id: 10,
    name: 'Uniq Cannabis Monroe',
    city: 'Monroe',
    dutchie_id: '63fcc07560e361018fe35c11',
    endpoint: 'https://uniqcannabis.com/api-1/graphql', // their own Dutchie domain
  },
  { id: 59, name: 'Happy Daze Monroe', city: 'Monroe', dutchie_id: '69b9d92a3d316b54fad23373' },
  // Uncomment and add dutchie_id as you capture them:
  // { id: 11, name: 'NAR Cannabis Monroe',  city: 'Monroe', dutchie_id: '' },
  // { id: 14, name: 'Joyology Monroe',      city: 'Monroe', dutchie_id: '' },
  // { id: 1,  name: 'JARS Monroe',          city: 'Monroe', dutchie_id: '' },
  // { id: 6,  name: 'PUFF Monroe',          city: 'Monroe', dutchie_id: '' },
  // { id: 3,  name: 'King of Budz Monroe',  city: 'Monroe', dutchie_id: '' },
  // { id: 5,  name: 'Exclusive Monroe',     city: 'Monroe', dutchie_id: '' },
  // { id: 2,  name: 'URB Monroe',           city: 'Monroe', dutchie_id: '' },
];

// ============================================================
// DUTCHIE GRAPHQL CALLER — no auth required
// ============================================================
async function dutchieQuery(
  operationName: string,
  variables: Record<string, unknown>,
  hash: string,
  endpoint = DUTCHIE.GRAPHQL
): Promise<any> {
  const params = new URLSearchParams({
    operationName,
    variables:  JSON.stringify(variables),
    extensions: JSON.stringify({ persistedQuery: { version: 1, sha256Hash: hash } }),
  });

  const res = await fetch(`${endpoint}?${params}`, {
    headers: {
      'User-Agent':      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept':          'application/json',
      'Referer':         'https://dutchie.com/',
    },
  });

  if (!res.ok) throw new Error(`Dutchie ${operationName}: ${res.status}`);
  return res.json();
}

// ============================================================
// STEP 1: Discover which target brands are stocked
// ============================================================
async function fetchMenuFilters(dispensaryId: string, endpoint = DUTCHIE.GRAPHQL_API4) {
  const data = await dutchieQuery(
    'MenuFiltersV2',
    { dispensaryId, pricingType: 'rec', isKioskMenu: false },
    DUTCHIE.HASHES.MenuFiltersV2,
    endpoint
  );
  return {
    brands:      (data?.data?.menuFiltersV2?.brands ?? []) as Array<{ id: string; name: string }>,
    hasSpecials: (data?.data?.menuFiltersV2?.hasProductsOnSpecial ?? false) as boolean,
  };
}

function matchTargetBrands(dispensaryBrands: Array<{ id: string; name: string }>) {
  const matched: Record<string, string> = {};
  for (const db of dispensaryBrands) {
    const dName = db.name.toLowerCase().trim();
    for (const [targetName, { aliases }] of Object.entries(TARGET_BRANDS)) {
      const names = [targetName.toLowerCase(), ...aliases];
      if (names.some(n => dName.includes(n) || n.includes(dName))) {
        if (!matched[targetName]) matched[targetName] = db.id;
      }
    }
  }
  return matched;
}

// ============================================================
// STEP 2: Fetch all products paginated
// ============================================================
async function fetchAllProducts(dispensaryId: string, endpoint = DUTCHIE.GRAPHQL): Promise<any[]> {
  const all: any[] = [];
  let page = 0;

  while (true) {
    const data = await dutchieQuery(
      'FilteredProducts',
      {
        includeEnterpriseSpecials: false,
        productsFilter: {
          dispensaryId,
          pricingType:                         'rec',
          strainTypes:                         [],
          subcategories:                       [],
          Status:                              'Active',
          types:                               [],
          useCache:                            true,
          isDefaultSort:                       true,
          sortBy:                              'popular',
          sortDirection:                       1,
          bypassOnlineThresholds:              false,
          isKioskMenu:                         false,
          removeProductsBelowOptionThresholds: true,
          platformType:                        'ONLINE_MENU',
          preOrderType:                        null,
        },
        page,
        perPage: 25,
      },
      DUTCHIE.HASHES.FilteredProducts,
      endpoint
);
    
    const products   = data?.data?.filteredProducts?.products ?? [];
    const totalCount = data?.data?.filteredProducts?.totalCount ?? 0;
    all.push(...products);

    const fetched = page * 25 + products.length;
    if (fetched >= totalCount || products.length < 25) break;
    page++;
    await new Promise(r => setTimeout(r, 300));
  }

  return all;
}

// ============================================================
// STEP 3: Fetch specials for sale price detection
// ============================================================
async function fetchSpecials(dispensaryId: string, endpoint = DUTCHIE.GRAPHQL_API4): Promise<any[]> {
  try {
    const data = await dutchieQuery(
      'FilteredSpecials',
      { includeEnterpriseSpecials: false, specialsFilter: { dispensaryId, current: true } },
      DUTCHIE.HASHES.FilteredSpecials,
      endpoint
    );
    return data?.data?.specials ?? [];
  } catch { return []; }
}

// ============================================================
// NORMALIZE Dutchie product → Supabase row
// ============================================================
function normalize(
  product: any,
  dispensaryDbId: number,
  specials: any[],
  matchedBrand: string
): Record<string, unknown> {
  const special = specials.find(s =>
    s.menuItems?.some((i: any) => i.id === product.id)
  );
  const opts      = product.Options ?? product.options ?? [];
  const opt0      = opts[0] ?? {};
  const basePrice = opt0.price ?? product.price ?? 0;
  const salePrice = special
    ? (opt0.discountedPrice ?? opt0.specialPrice ?? basePrice)
    : basePrice;

  return {
    dispensary_id:      dispensaryDbId,
    brand_name:         product.brand?.name ?? product.brandName ?? matchedBrand,
    matched_brand:      matchedBrand,
    product_name:       product.Name ?? product.name ?? '',
    category:           (product.type ?? product.Type ?? '').toLowerCase(),
    subcategory:        (product.subtype ?? product.Subtype ?? '').toLowerCase(),
    strain:             product.strain?.name ?? product.Strain ?? null,
    size:               opt0.unit ?? opt0.weight ?? null,
    price:              basePrice,
    sale_price:         salePrice,
    on_sale:            salePrice < basePrice,
    thc_percent:        product.potencyThc?.formatted ?? null,
    cbd_percent:        product.potencyCbd?.formatted ?? null,
    in_stock:           (product.quantityAvailable ?? 1) > 0,
    dutchie_product_id: product.id ?? null,
    image_url:          product.Image ?? product.image ?? null,
    last_scraped:       new Date().toISOString(),
  };
}

async function upsertProducts(rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const { error } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'dutchie_product_id,dispensary_id' });
  if (error) throw new Error(error.message);
}

async function markStale(dispensaryDbId: number, seenIds: string[]) {
  if (!seenIds.length) return;
  await supabase
    .from('products')
    .update({ in_stock: false, last_scraped: new Date().toISOString() })
    .eq('dispensary_id', dispensaryDbId)
    .not('dutchie_product_id', 'in', `(${seenIds.map(i => `'${i}'`).join(',')})`)
    .eq('in_stock', true);
}

// ============================================================
// MAIN
// ============================================================
export async function runScraper() {
  console.log(`[Scraper] Start ${new Date().toISOString()}`);
  let totalScraped = 0;
  const errors: string[] = [];
  const summary: Record<string, number> = {};

  for (const dispensary of DISPENSARIES) {
    console.log(`\n[Scraper] ── ${dispensary.name}`);
    const ep     = dispensary.endpoint ?? DUTCHIE.GRAPHQL;
    const ep_api4 = dispensary.endpoint
      ? dispensary.endpoint.replace('/graphql', '/graphql') // same if custom
      : DUTCHIE.GRAPHQL_API4;

    try {
      // 1. Which target brands are here?
      const { brands, hasSpecials } = await fetchMenuFilters(dispensary.dutchie_id, ep_api4);
      const matched = matchTargetBrands(brands);
      const names   = Object.keys(matched);
      console.log(`[Scraper] Target brands: ${names.join(', ') || 'none'}`);
      if (!names.length) { summary[dispensary.name] = 0; continue; }

      // 2. Fetch all products
      const allProducts = await fetchAllProducts(dispensary.dutchie_id, ep);
      console.log(`[Scraper] Menu size: ${allProducts.length} products`);

      // 3. Specials
      const specials = hasSpecials ? await fetchSpecials(dispensary.dutchie_id, ep_api4) : [];

      // 4. Filter to target brands
      const targetProducts = allProducts.filter(p => {
        const bn = (p.brand?.name ?? p.brandName ?? '').toLowerCase();
        return names.some(n => {
          const { aliases } = TARGET_BRANDS[n];
          return [n.toLowerCase(), ...aliases].some(a => bn.includes(a) || a.includes(bn));
        });
      });
      console.log(`[Scraper] Target brand products: ${targetProducts.length}`);

      // 5. Normalize
      const rows = targetProducts.map(p => {
        const bn = (p.brand?.name ?? p.brandName ?? '').toLowerCase();
        const matchedName = names.find(n => {
          const { aliases } = TARGET_BRANDS[n];
          return [n.toLowerCase(), ...aliases].some(a => bn.includes(a) || a.includes(bn));
        }) ?? 'Unknown';
        return normalize(p, dispensary.id, specials, matchedName);
      });

      // 6. Save
      await upsertProducts(rows);
      totalScraped += rows.length;
      summary[dispensary.name] = rows.length;

      // 7. Mark stale
      await markStale(dispensary.id, rows.map(r => r.dutchie_product_id as string).filter(Boolean));

      console.log(`[Scraper] ✓ Saved ${rows.length} products`);
      await new Promise(r => setTimeout(r, 1500));

    } catch (err: any) {
      errors.push(`${dispensary.name}: ${err.message}`);
      console.error(`[Scraper] ✗ ${err.message}`);
    }
  }

  console.log(`\n[Scraper] Done. Scraped: ${totalScraped}. Errors: ${errors.length}`);
  return { success: !errors.length, scraped: totalScraped, errors, summary };
}
