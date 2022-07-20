SET check_function_bodies = false;
CREATE TABLE public.assets (
    "chainId" text NOT NULL,
    "contractAddress" text NOT NULL,
    "tokenId" text NOT NULL,
    amount numeric(78,0) NOT NULL,
    holder text NOT NULL,
    metadata jsonb NOT NULL
);
CREATE TABLE public.contracts (
    "chainId" text NOT NULL,
    "contractAddress" text NOT NULL,
    "supportsInterface" jsonb NOT NULL
);
CREATE TABLE public.orders (
    id text NOT NULL,
    direction text NOT NULL,
    protocol text NOT NULL,
    offerer text NOT NULL,
    "chainId" text NOT NULL,
    "contractAddress" text NOT NULL,
    "tokenId" text NOT NULL,
    price text NOT NULL,
    "sortablePrice" numeric(78,0) NOT NULL,
    "signedOrder" jsonb NOT NULL,
    "isValid" boolean NOT NULL
);
CREATE VIEW public."validOrders" AS
 SELECT orders.id,
    orders.direction,
    orders.protocol,
    orders.offerer,
    orders."chainId",
    orders."contractAddress",
    orders."tokenId",
    orders.price,
    orders."sortablePrice",
    orders."signedOrder",
    orders."isValid"
   FROM public.orders
  WHERE (orders."isValid" = true);
ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contract_pkey PRIMARY KEY ("chainId", "contractAddress");
ALTER TABLE ONLY public.assets
    ADD CONSTRAINT nft_pkey PRIMARY KEY ("chainId", "contractAddress", "tokenId");
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);
