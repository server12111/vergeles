// Builds the static site for GitHub Pages and force-pushes out/ to the gh-pages branch.
// Usage: npm run deploy
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const remote = execSync("git remote get-url origin").toString().trim();
const repo = remote.replace(/\.git$/, "").split("/").pop();
const owner = remote.replace(/\.git$/, "").split("/").slice(-2)[0];

run("npm run build", {
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: `/${repo}`,
    NEXT_PUBLIC_SITE_URL: `https://${owner}.github.io/${repo}`,
    MSYS_NO_PATHCONV: "1",
  },
});

// Without .nojekyll GitHub Pages hides the _next/ folder.
writeFileSync("out/.nojekyll", "");
run("git init -q -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run('git commit -q -m "Deploy"', { cwd: "out" });
run(`git push -f -q ${remote} gh-pages`, { cwd: "out" });
console.log(`Deployed: https://${owner}.github.io/${repo}/`);
