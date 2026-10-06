// Next 16 static export writes route-segment payloads as nested folders
// (out/catalog/__next.catalog/__PAGE__.txt) while the client router requests
// flat names (out/catalog/__next.catalog.__PAGE__.txt). Static hosts like
// GitHub Pages have no rewrites, so we write the flat copies here.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
let copied = 0;

function collect(dir, parts, target) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collect(p, [...parts, name], target);
    else {
      copyFileSync(p, join(target, [...parts, name].join(".")));
      copied++;
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) collect(p, [name], dir);
    else walk(p);
  }
}

walk(root);
console.log(`flatten-rsc: wrote ${copied} segment files`);
