alter table "public"."contracts" alter column "tokenURI" drop not null;
alter table "public"."contracts" add column "tokenURI" text;
