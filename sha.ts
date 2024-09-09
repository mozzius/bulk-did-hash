import { sha224 } from "js-sha256";

const arg = process.argv.slice(2);

if (!arg[0]) throw new Error("Give me a DID");

console.log(sha224(arg[0]));
