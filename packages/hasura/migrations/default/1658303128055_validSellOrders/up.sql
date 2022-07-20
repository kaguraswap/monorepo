CREATE
OR REPLACE VIEW "public"."validSellOrders" AS
SELECT
  *
FROM
  orders
WHERE
  (orders."isValid" = true) AND
  (orders.direction = 'sell');
