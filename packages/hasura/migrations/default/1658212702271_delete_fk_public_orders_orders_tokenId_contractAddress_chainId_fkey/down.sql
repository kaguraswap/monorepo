alter table "public"."orders"
  add constraint "orders_tokenId_contractAddress_chainId_fkey"
  foreign key ("tokenId", "contractAddress", "chainId")
  references "public"."assets"
  ("tokenId", "contractAddress", "chainId") on update restrict on delete restrict;
