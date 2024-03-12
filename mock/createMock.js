const fs = require("node:fs");

const createMockFile = (numberOfRecords = 50) => {
  const dataArr = [];
  for (let i = 1; i <= numberOfRecords; i++) {
    const random = Math.random();
    const field = random.toString(16).substring(2);
    dataArr.push({
      id: i,
      field,
      fieldObj: {
        a: field,
        [field]: random >= 0.5 ? "invalidURL" : "https://google.com",
      },
      fieldArray: Array(Math.floor(random * 10))
        .fill()
        .map((_, index) => field.substring(index)),
      fieldBoolean: random >= 0.75,
    });
  }
  const jsonData = JSON.stringify(dataArr);
  try {
    fs.writeFileSync("./mock/mock.json", jsonData);
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
};
createMockFile();
