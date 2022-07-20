CREATE
OR REPLACE VIEW "public"."orders_is_valid" AS
SELECT * FROM "orders"
WHERE "orders"."isValid" = true;
