CREATE
OR REPLACE VIEW "public"."validBuyOrders" AS
SELECT
  *
FROM
  orders
WHERE
  (orders."isValid" = true) AND
  (orders.direction = 'buy');
