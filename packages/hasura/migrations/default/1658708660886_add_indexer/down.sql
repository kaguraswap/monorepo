
alter table "public"."blocks" alter column "isSynced" set not null;
ALTER TABLE "public"."blocks" ALTER COLUMN "isSynced" drop default;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."logs" add column "isSynced" boolean
--  null default 'false';

alter table "public"."transactions" alter column "isSynced" set not null;
ALTER TABLE "public"."transactions" ALTER COLUMN "isSynced" drop default;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."contracts" add column "isSynced" boolean
--  null;

alter table "public"."contracts" alter column "supportsInterface" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."logs" add column "data" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."logs" add column "topics" jsonb
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."logs" add column "address" text
--  null;

alter table "public"."logs" alter column "data" drop not null;
alter table "public"."logs" add column "data" text;

alter table "public"."logs" alter column "topics" drop not null;
alter table "public"."logs" add column "topics" jsonb;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."transactions" add column "isSynced" boolean
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."blocks" add column "isSynced" boolean
--  not null;

DROP TABLE "public"."logs";

DROP TABLE "public"."transactions";

alter table "public"."blocks" rename to "block";

DROP TABLE "public"."block";
