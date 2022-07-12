/* eslint-disable @typescript-eslint/no-var-requires */
const tcpPortUsed = require("tcp-port-used");
const kill = require("kill-port");
const firebase = require("../firebase.json");

const main = async () => {
  for (const { port } of Object.values(firebase.emulators)) {
    if (!isNaN(port)) {
      tcpPortUsed.check(port, "localhost").then((isUsed) => {
        if (isUsed) {
          kill(port, "tcp").then(console.log("killed:", port));
        }
      });
    }
  }
};

main();
