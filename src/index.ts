const arg = process.argv.slice(2);

switch (arg[0]) {
  case "sha":
    import("./sha.js");
    break;
  case "bulk":
    import("./bulk.js");
    break;
  default:
    console.log("Usage: pnpm sha <did-or-handle>");
    console.log("Usage: pnpm bulk <path-to-file.txt>");
}
