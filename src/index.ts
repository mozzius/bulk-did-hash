#!/usr/bin/env node

const arg = process.argv.slice(2);

switch (arg[0]) {
  case "sha":
    import("./sha.js");
    break;
  case "bulk":
    import("./bulk.js");
    break;
  default:
    console.log("Usage: npx bulk-did-hash sha <did-or-handle>");
    console.log("Usage: npx bulk-did-hash bulk <path-to-file.txt>");
}
