import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const dir = path.dirname(url.fileURLToPath(import.meta.url));
const template = fs.readFileSync(path.join(dir, "dist/index.html"), "utf8");
const { render } = await import("./dist-ssr/entry-server.js");

const html = template.replace("<!--app-html-->", render());
fs.writeFileSync(path.join(dir, "dist/index.html"), html);
console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
