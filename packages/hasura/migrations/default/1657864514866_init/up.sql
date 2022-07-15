
SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.orders (
    hash text NOT NULL,
    "chainId" integer NOT NULL,
    "contractAddress" text NOT NULL,
    "tokenId" text NOT NULL,
    raw jsonb NOT NULL,
    type text
);
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (hash);

alter table "public"."orders" rename column "hash" to "id";

alter table "public"."orders" add column "direction" text
 null;

DROP table "public"."orders";

CREATE TABLE "public"."nft" ("chainId" Text NOT NULL, "contractAddress" text NOT NULL, "tokenId" text NOT NULL, "holder" text, "metadata" jsonb, PRIMARY KEY ("chainId","contractAddress","tokenId") );

CREATE TABLE "public"."contract" ("chainId" text NOT NULL, "contractAddress" text NOT NULL, "tokenURI" text, "supportsInterface" jsonb, PRIMARY KEY ("chainId","contractAddress") );

CREATE TABLE "public"."order" ("id" text NOT NULL, "chainId" text NOT NULL, "contractAddress" text NOT NULL, "tokenId" text NOT NULL, "type" text NOT NULL, "isValid" boolean NOT NULL, "signedOrder" jsonb NOT NULL, PRIMARY KEY ("id") );

alter table "public"."nft" alter column "holder" set not null;

alter table "public"."nft" alter column "metadata" set not null;

alter table "public"."contract" drop column "tokenURI" cascade;

alter table "public"."contract" alter column "supportsInterface" set not null;

alter table "public"."nft"
  add constraint "nft_contractAddress_chainId_fkey"
  foreign key ("contractAddress", "chainId")
  references "public"."contract"
  ("contractAddress", "chainId") on update restrict on delete restrict;

alter table "public"."order"
  add constraint "order_tokenId_contractAddress_chainId_fkey"
  foreign key ("tokenId", "contractAddress", "chainId")
  references "public"."nft"
  ("tokenId", "contractAddress", "chainId") on update restrict on delete restrict;

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

alter table "public"."contract" add column "tokenURI" text
 null;
