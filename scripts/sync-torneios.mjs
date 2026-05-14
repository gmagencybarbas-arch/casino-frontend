import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "torneios");
const dest = join(root, "public", "images", "tournaments");

if (!existsSync(src)) {
  console.warn("sync-torneios: pasta torneios/ não encontrada, a saltar.");
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

for (const name of readdirSync(src)) {
  const from = join(src, name);
  if (!statSync(from).isFile()) continue;
  copyFileSync(from, join(dest, name));
}

console.log("sync-torneios: ficheiros copiados de torneios/ → public/images/tournaments/");
