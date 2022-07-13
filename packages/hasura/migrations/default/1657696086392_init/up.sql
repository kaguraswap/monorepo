SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
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
