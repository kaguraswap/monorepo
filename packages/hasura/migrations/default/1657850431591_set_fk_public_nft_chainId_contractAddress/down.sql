alter table "public"."nft" drop constraint "nft_chainId_contractAddress_fkey",
  add constraint "nft_contractAddress_chainId_fkey"
  foreign key ("contractAddress", "chainId")
  references "public"."contract"
  ("contractAddress", "chainId") on update restrict on delete restrict;
