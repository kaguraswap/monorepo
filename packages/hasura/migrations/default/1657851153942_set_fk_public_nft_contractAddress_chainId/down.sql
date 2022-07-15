alter table "public"."nft" drop constraint "nft_contractAddress_chainId_fkey",
  add constraint "nft_chainId_contractAddress_fkey"
  foreign key ("chainId", "contractAddress")
  references "public"."contract"
  ("chainId", "contractAddress") on update cascade on delete restrict;
