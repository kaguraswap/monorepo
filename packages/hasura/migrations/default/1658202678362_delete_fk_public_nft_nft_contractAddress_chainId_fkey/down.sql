alter table "public"."nft"
  add constraint "nft_contractAddress_chainId_fkey"
  foreign key ("contractAddress", "chainId")
  references "public"."contract"
  ("contractAddress", "chainId") on update restrict on delete restrict;
