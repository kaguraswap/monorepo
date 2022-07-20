CREATE OR REPLACE VIEW "public"."validSellOrders" AS 
 SELECT orders.id,
    orders."chainId",
    orders."contractAddress",
    orders."tokenId",
    orders.protocol,
    orders."isValid",
    orders."signedOrder",
    orders.offerer,
    orders."sortablePrice",
    orders.price,
    orders.direction
   FROM orders
  WHERE ((orders."isValid" = true));
