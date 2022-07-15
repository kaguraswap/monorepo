
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."contract" add column "tokenURI" text
--  null;

alter table "public"."nft" drop constraint "nft_contractAddress_chainId_fkey",
  add constraint "nft_chainId_contractAddress_fkey"
  foreign key ("chainId", "contractAddress")
  references "public"."contract"
  ("chainId", "contractAddress") on update cascade on delete restrict;

alter table "public"."nft" drop constraint "nft_chainId_contractAddress_fkey",
  add constraint "nft_contractAddress_chainId_fkey"
  foreign key ("contractAddress", "chainId")
  references "public"."contract"
  ("contractAddress", "chainId") on update restrict on delete restrict;

DELETE FROM "public"."order" WHERE "id" = '0x0000000000000000000000000000000000000000000000000000000000000002';

DELETE FROM "public"."order" WHERE "id" = '0x0000000000000000000000000000000000000000000000000000000000000001';

DELETE FROM "public"."nft" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000002' AND "tokenId" = '2';

DELETE FROM "public"."nft" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000002' AND "tokenId" = '1';

DELETE FROM "public"."nft" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000002' AND "tokenId" = '0';

DELETE FROM "public"."nft" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000001' AND "tokenId" = '2';

DELETE FROM "public"."nft" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000001' AND "tokenId" = '1';

DELETE FROM "public"."nft" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000001' AND "tokenId" = '0';

DELETE FROM "public"."contract" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000002';

DELETE FROM "public"."contract" WHERE "chainId" = '1' AND "contractAddress" = '0x0000000000000000000000000000000000000001';

alter table "public"."order" drop constraint "order_tokenId_contractAddress_chainId_fkey";

alter table "public"."nft" drop constraint "nft_contractAddress_chainId_fkey";

alter table "public"."contract" alter column "supportsInterface" drop not null;

alter table "public"."contract" alter column "tokenURI" drop not null;
alter table "public"."contract" add column "tokenURI" text;

alter table "public"."nft" alter column "metadata" drop not null;

alter table "public"."nft" alter column "holder" drop not null;

DROP TABLE "public"."order";

DROP TABLE "public"."contract";

DROP TABLE "public"."nft";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."orders";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."orders" add column "direction" text
--  null;

alter table "public"."orders" rename column "id" to "hash";
