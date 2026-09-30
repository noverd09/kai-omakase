// Dev helper: search Openverse for CC0 / public-domain images (no attribution required).
// Usage: node scripts/openverse-search.mjs "nigiri sushi" [pageSize]
const q = process.argv[2];
const n = process.argv[3] ?? "12";
const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license=cc0,pdm&page_size=${n}&mature=false&aspect_ratio=wide,tall,square`;
const res = await fetch(url, { headers: { "User-Agent": "kai-portfolio-dev/1.0" } });
if (!res.ok) { console.error(res.status, await res.text()); process.exit(1); }
const j = await res.json();
for (const r of j.results) {
  console.log([r.id, `${r.width}x${r.height}`, r.source, r.license, (r.creator ?? "?").slice(0, 24), (r.title ?? "").slice(0, 50), r.url].join(" | "));
}
