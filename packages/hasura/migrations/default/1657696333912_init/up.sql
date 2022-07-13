SET check_function_bodies = false;
CREATE TABLE public.orders (
    hash text NOT NULL,
    "chainId" integer NOT NULL,
    "contractAddress" text NOT NULL,
    "tokenId" text NOT NULL,
    raw jsonb NOT NULL,
    type text
);
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (hash);
