/* eslint-disable @typescript-eslint/no-var-requires */
const kill = require("kill-port");
const firebase = require("./firebase.json");

const main = () => {
  for (const { port } of Object.values(firebase.emulators)) {
    if (!isNaN(port)) {
      kill(port, "tcp").then(console.log).catch(console.log);
    }
  }
};

main();
