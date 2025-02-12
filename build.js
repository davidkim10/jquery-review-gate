const esbuild = require("esbuild");
const copy = require("esbuild-plugin-copy").default;

// Build for JavaScript
esbuild
  .build({
    entryPoints: ["src/js/review-gate.jquery.js"],
    bundle: true,
    minify: true,
    outfile: "dist/js/review-gate.jquery.min.js",
    target: ["ie11"],
    plugins: [
      copy({
        assets: [
          {
            from: "src/js/jquery.emojiRatings.min.js",
            to: "./",
            keepStructure: false,
          },
        ],
      }),
    ],
  })
  .catch(() => process.exit(1));

// Build for CSS
esbuild
  .build({
    entryPoints: ["src/css/review-gate.css"],
    bundle: false,
    minify: true,
    outfile: "dist/css/review-gate.min.css",
  })
  .catch(() => process.exit(1));
