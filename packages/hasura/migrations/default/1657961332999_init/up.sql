SET check_function_bodies = false;
CREATE TABLE public.contract (
    "chainId" text NOT NULL,
    "contractAddress" text NOT NULL,
    "supportsInterface" jsonb NOT NULL,
    "tokenURI" text
);
CREATE TABLE public.nft (
    "chainId" text NOT NULL,
    "contractAddress" text NOT NULL,
    "tokenId" text NOT NULL,
    holder text NOT NULL,
    metadata jsonb NOT NULL
);
CREATE TABLE public."order" (
    id text NOT NULL,
    "chainId" text NOT NULL,
    "contractAddress" text NOT NULL,
    "tokenId" text NOT NULL,
    type text NOT NULL,
    "isValid" boolean NOT NULL,
    "signedOrder" jsonb NOT NULL
);
ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_pkey PRIMARY KEY ("chainId", "contractAddress");
ALTER TABLE ONLY public.nft
    ADD CONSTRAINT nft_pkey PRIMARY KEY ("chainId", "contractAddress", "tokenId");
ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.nft
    ADD CONSTRAINT "nft_contractAddress_chainId_fkey" FOREIGN KEY ("contractAddress", "chainId") REFERENCES public.contract("contractAddress", "chainId") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_tokenId_contractAddress_chainId_fkey" FOREIGN KEY ("tokenId", "contractAddress", "chainId") REFERENCES public.nft("tokenId", "contractAddress", "chainId") ON UPDATE RESTRICT ON DELETE RESTRICT;
