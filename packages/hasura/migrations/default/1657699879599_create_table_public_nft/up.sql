CREATE TABLE "public"."nft" ("chainId" Text NOT NULL, "contractAddress" text NOT NULL, "tokenId" text NOT NULL, "holder" text, "metadata" jsonb, PRIMARY KEY ("chainId","contractAddress","tokenId") );
