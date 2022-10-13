const { parentPort } = require("worker_threads");
let count = 0;

for (let i = 0; i < 1000000000; i++) {
  count += i;
}

console.log("TERMINADO : ", count);

const message = "Tâche intensive terminée, le count final est : " + count;

parentPort.postMessage(message);
