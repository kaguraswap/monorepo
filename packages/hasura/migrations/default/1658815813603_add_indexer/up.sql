

CREATE TABLE "public"."block" ("chainId" text NOT NULL, "blockNumber" integer NOT NULL, PRIMARY KEY ("chainId","blockNumber") );

alter table "public"."block" rename to "blocks";

CREATE TABLE "public"."transactions" ("chainId" text NOT NULL, "blockNumber" integer NOT NULL, "transactionIndex" integer NOT NULL, "transactionHash" text NOT NULL, PRIMARY KEY ("chainId","blockNumber","transactionIndex") );

CREATE TABLE "public"."logs" ("chainId" text NOT NULL, "blockNumber" integer NOT NULL, "transactionIndex" integer NOT NULL, "logIndex" integer NOT NULL, "topics" jsonb NOT NULL, "data" text NOT NULL, PRIMARY KEY ("chainId","blockNumber","transactionIndex","logIndex") );

alter table "public"."blocks" add column "isSynced" boolean
 not null;

alter table "public"."transactions" add column "isSynced" boolean
 not null;

alter table "public"."logs" drop column "topics" cascade;

alter table "public"."logs" drop column "data" cascade;

alter table "public"."logs" add column "address" text
 null;

alter table "public"."logs" add column "topics" jsonb
 not null;

alter table "public"."logs" add column "data" text
 not null;

alter table "public"."contracts" alter column "supportsInterface" drop not null;

alter table "public"."contracts" add column "isSynced" boolean
 null;

alter table "public"."transactions" alter column "isSynced" set default 'false';
alter table "public"."transactions" alter column "isSynced" drop not null;

alter table "public"."logs" add column "isSynced" boolean
 null default 'false';

alter table "public"."blocks" alter column "isSynced" set default 'false';
alter table "public"."blocks" alter column "isSynced" drop not null;

alter table "public"."contracts" alter column "isSynced" set default 'false';

alter table "public"."assets" add column "isSynced" boolean
 null default 'false';

CREATE
OR REPLACE VIEW "public"."transfers" AS
SELECT
  t1."chainId",
  t1."blockNumber",
  t1."transactionIndex",
  t1."logIndex",
  t1.address AS "contractAddress",
  (t1.topics ->> 1) AS "from",
  (t1.topics ->> 2) AS "to",
  (t1.topics ->> 3) AS "tokenId",
  1 AS amount
FROM
  (
    logs t1
    JOIN contracts t2 ON ((t1.address = t2."contractAddress"))
  )
WHERE
  (
    (
      (t1.topics ->> 0) = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' :: text
    )
    AND (
      ((t2."supportsInterface" ->> 'isERC721' :: text)) :: boolean = true
    )
  );

CREATE
OR REPLACE VIEW "public"."tokens" AS
SELECT
  t1."chainId",
  t1."contractAddress",
  t1."tokenId",
  t1."to" AS holder,
  1 AS amount
FROM
  (
    transfers t1
    LEFT JOIN transfers t2 ON (
      (
        (t1."chainId" = t2."chainId")
        AND (t1."contractAddress" = t2."contractAddress")
        AND (t1."tokenId" = t2."tokenId")
        AND (t1."blockNumber" < t2."blockNumber")
        AND (t1."transactionIndex" < t2."transactionIndex")
        AND (t1."logIndex" < t2."logIndex")
      )
    )
  )
WHERE
  (
    (t2."chainId" IS NULL)
    AND (
      t1."to" <> '0x0000000000000000000000000000000000000000000000000000000000000000' :: text
    )
    AND (
      t1."to" <> '0x000000000000000000000000000000000000000000000000000000000000dead' :: text
    )
  );

