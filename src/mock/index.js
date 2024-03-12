const fs = require("node:fs");
const args = process.argv.slice(2);
const records = args.find((arg) => arg.startsWith("records"));
const numberOfRecordsToGenerate = records ? records.split("=")[1] : 50;

const createMockFile = (numberOfRecords) => {
  const dataArr = [];
  for (let i = 1; i <= numberOfRecords; i++) {
    const random = Math.random();
    const field = random.toString(16).substring(2);
    dataArr.push({
      id: i,
      field,
      fieldObj: {
        a: field,
        [field]: random >= 0.5 ? "invalidURL" : `https://${random}.google.com`,
      },
      fieldArray: Array(Math.floor(random * 10))
        .fill()
        .map((_, index) => field.substring(index)),
      fieldBoolean: random >= 0.75,
    });
  }
  const jsonData = JSON.stringify(dataArr);
  try {
    fs.writeFileSync("./src/mock/mock.json", jsonData);
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
};

const initMock = () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Number of generated records:",
    numberOfRecordsToGenerate
  );
  console.time("Creating mock finished in");
  createMockFile(numberOfRecordsToGenerate);
  console.timeEnd("Creating mock finished in");
};

module.exports = initMock;
