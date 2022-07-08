import * as admin from "firebase-admin";

admin.initializeApp();

interface Files {
  [key: string]: string;
}

const files: Files = {
  nft: "./handlers/nft",
  order: "./handlers/order",
};

const loadFunctions = (filesObj: Files) => {
  Object.entries(filesObj).forEach(([key, value]) => {
    const { FUNCTION_NAME } = process.env;
    const shouldExport = !FUNCTION_NAME || FUNCTION_NAME.startsWith(key);
    if (shouldExport) {
      exports[key] = require(value);
    }
  });
};

loadFunctions(files);
