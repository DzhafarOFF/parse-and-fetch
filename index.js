const fs = require("node:fs");
const initMock = require("./src/mock");
const applyApiCall = require("./src/api");

initMock();

const parseDataV1 = () => {
  fs.readFile("./src/mock/mock.json", { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.log(`Error occured during reading: ${error}`);
    }
    if (data) {
      const parsed = JSON.parse(data);

      if (Array.isArray(parsed)) {
        applyApiCall(parsed)
          .then((data) => {
            const proccessedData = JSON.stringify(data);
            fs.writeFile(
              "./result/proccessed.json",
              proccessedData,
              "utf-8",
              (err) => {
                if (err) {
                  console.log(err);
                }
                console.log(
                  "\x1b[42m%s\x1b[0m",
                  "DONE! Results are saved in ./result/proccessed.json"
                );
              }
            );
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            console.timeEnd("Total time");
          });
      }
    }
  });
};

console.time("Total time");

parseDataV1();
