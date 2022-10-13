const { Worker } = require("worker_threads");

module.exports = (req, res, next) => {
  console.log(req);
  console.log(res);
  console.log(next);
  return new Promise((resolve, reject) => {
    const worker = new Worker(req);
    // Quand le worker est actif
    worker.on("online", () => {
      console.log("DEBUT : execution de la tâche intensive en //");
    });
    worker.on("message", (message) => {
      console.log("MILIEU : ", message);
      return resolve;
    });
    worker.on("error", reject);
    worker.on("exit", (exitCode) => {
      if (exitCode !== 0) {
        reject(
          new Error("AIE, le worker s'est stoppé avec le code : ", exitCode)
        );
      }
    });
  });
};
