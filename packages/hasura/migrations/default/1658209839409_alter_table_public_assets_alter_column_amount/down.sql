alter table "public"."assets" alter column "amount" drop not null;
alter table "public"."assets" alter column "amount" set default '1'::numeric;
