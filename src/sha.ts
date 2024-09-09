import { AtpAgent } from "@atproto/api";
import { sha256 } from "js-sha256";

const arg = process.argv.slice(3);

const agent = new AtpAgent({
  service: "https://public.api.bsky.app",
});

const didOrHandle = arg[0];

if (!didOrHandle) throw new Error("Give me a DID");

if (didOrHandle.startsWith("did:")) console.log(sha256(didOrHandle));
else {
  agent
    .resolveHandle({ handle: didOrHandle })
    .then(({ data: { did } }) => console.log(sha256(did)));
}
