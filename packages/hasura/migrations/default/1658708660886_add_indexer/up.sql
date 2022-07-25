
CREATE TABLE "public"."block" ("chainId" text NOT NULL, "blockNumber" integer NOT NULL, PRIMARY KEY ("chainId","blockNumber") );

alter table "public"."block" rename to "blocks";

CREATE TABLE "public"."transactions" ("chainId" text NOT NULL, "blockNumber" integer NOT NULL, "transactionIndex" integer NOT NULL, "transactionHash" text NOT NULL, PRIMARY KEY ("chainId","blockNumber","transactionIndex") );

CREATE TABLE "public"."logs" ("chainId" text NOT NULL, "blockNumber" integer NOT NULL, "transactionIndex" integer NOT NULL, "logIndex" integer NOT NULL, "topics" jsonb NOT NULL, "data" text NOT NULL, PRIMARY KEY ("chainId","blockNumber","transactionIndex","logIndex") );

alter table "public"."blocks" add column "isSynced" boolean
 not null;

alter table "public"."transactions" add column "isSynced" boolean
 not null;

alter table "public"."logs" drop column "topics" cascade;

alter table "public"."logs" drop column "data" cascade;

alter table "public"."logs" add column "address" text
 null;

alter table "public"."logs" add column "topics" jsonb
 not null;

alter table "public"."logs" add column "data" text
 not null;

alter table "public"."contracts" alter column "supportsInterface" drop not null;

alter table "public"."contracts" add column "isSynced" boolean
 null;

alter table "public"."transactions" alter column "isSynced" set default 'false';
alter table "public"."transactions" alter column "isSynced" drop not null;

alter table "public"."logs" add column "isSynced" boolean
 null default 'false';

alter table "public"."blocks" alter column "isSynced" set default 'false';
alter table "public"."blocks" alter column "isSynced" drop not null;
