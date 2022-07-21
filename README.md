# monorepo

This is KaguraSwap monorepo

# Dev

```
yarn
docker-compose up
yarn dev
```

- web

  - http://localhost:3000

- hasura

  - http://localhost:9695/console

# Hasura Setup

https://hasura.io/docs/latest/graphql/core/migrations/migrations-setup/#step-7-apply-the-migrations-and-metadata-on-another-instance-of-the-graphql-engine

```
# in hasura package directory

# apply metadata, this will connect Hasura to the configured databases.
hasura metadata apply --endpoint <endpoint> --admin-secret <token>
# apply migrations to the connected databases.
hasura migrate apply --all-databases --endpoint <endpoint> --admin-secret <token>
# reload metadata to make sure Hasura is aware of any newly created database objects.
hasura metadata reload --endpoint <endpoint> --admin-secret <token>
```
