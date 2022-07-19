ALTER TABLE "public"."assets" ALTER COLUMN "amount" drop default;
alter table "public"."assets" alter column "amount" set not null;
