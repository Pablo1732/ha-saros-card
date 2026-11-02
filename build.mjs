// Build: `npm run build` → dist/saros-card.js
// Dev:   `npm run dev`   → Testseite mit Beispieldaten auf http://localhost:5174
import * as esbuild from "esbuild";
import { readFileSync } from "node:fs";

const serve = process.argv.includes("--serve");
const { version } = JSON.parse(readFileSync("package.json", "utf8"));
// Build-Zeit in der Versionsanzeige (Browser-Konsole) → sichtbar, ob HA wirklich den neuen Stand geladen hat
const built = new Date().toISOString().slice(0, 16).replace("T", " ");

const common = {
  bundle: true,
  define: { __VERSION__: JSON.stringify(serve ? `${version}-dev` : `${version} (${built} UTC)`) },
  format: "esm",
  // Ältere Android-WebViews (Echo Show) → bewusst konservatives Ziel
  target: ["es2019", "chrome70"],
  legalComments: "none",
  logLevel: "info",
};

if (serve) {
  const ctx = await esbuild.context({
    ...common,
    entryPoints: { "saros-card": "src/index.ts", mock: "dev/mock.ts" },
    outdir: "dev/out",
    sourcemap: true,
  });
  await ctx.watch();
  // CORS offen: zum Testen lädt das echte HA-Dashboard die Karte von hier
  await ctx.serve({ servedir: "dev", port: 5174, cors: { origin: "*" } });
} else {
  await esbuild.build({
    ...common,
    entryPoints: ["src/index.ts"],
    outfile: "dist/saros-card.js",
    minify: true,
  });
}
