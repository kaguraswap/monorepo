CREATE TABLE "public"."contract" ("chainId" text NOT NULL, "contractAddress" text NOT NULL, "tokenURI" text, "supportsInterface" jsonb, PRIMARY KEY ("chainId","contractAddress") );
