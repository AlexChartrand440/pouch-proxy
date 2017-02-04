# pouch-proxy
A proxy server for caching PouchDB state as operations against a RESTful API.

## Setup

Install Node 6.x and Typescript 2.x.

```
npm install -g typescript
tsc -v
```

Navigate to the repo root.  Setup a `settings.json` file in the root based on `./src/settings.ts` `App.Settings` type.

Run:

```
npm install
./run.sh
```
