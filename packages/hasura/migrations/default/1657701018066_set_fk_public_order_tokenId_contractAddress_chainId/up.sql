alter table "public"."order"
  add constraint "order_tokenId_contractAddress_chainId_fkey"
  foreign key ("tokenId", "contractAddress", "chainId")
  references "public"."nft"
  ("tokenId", "contractAddress", "chainId") on update restrict on delete restrict;
