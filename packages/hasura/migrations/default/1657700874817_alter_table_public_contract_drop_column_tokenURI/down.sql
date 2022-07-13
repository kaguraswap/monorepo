alter table "public"."contract" alter column "tokenURI" drop not null;
alter table "public"."contract" add column "tokenURI" text;
