import { AtpAgent } from "@atproto/api";
import { sha256 } from "js-sha256";
import { promises as fs } from "node:fs";

const arg = process.argv.slice(3);

if (!arg[0]) throw new Error("Give me a file path");

const agent = new AtpAgent({
  service: "https://public.api.bsky.app",
});

async function main() {
  const list = await fs.readFile(arg[0], "utf-8");
  const listArray = list.split("\n").filter(Boolean);
  const handlesOrDids = [...new Set(listArray)];

  const dids = await Promise.all(
    handlesOrDids.map(async (handleOrDid) => {
      if (handleOrDid.startsWith("did:")) return handleOrDid; // it's a did

      const {
        data: { did },
      } = await agent.resolveHandle({ handle: handleOrDid }).catch(() => {
        console.error("Could not resolve:", handleOrDid);
        return { data: { did: null } };
      });
      return did;
    }),
  );

  await fs.writeFile(
    "./hashes.csv",
    dids
      .filter((x) => typeof x === "string")
      .map((did) => sha256(did))
      .join("\n"),
  );
}

main();
