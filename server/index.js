const fs = require("node:fs");
const stream = require("stream");

const queue = [];
const dataToWrite = [];

const fakeApiCall = (url) => {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random <= 0.95) {
        resolve({
          data: `SOME_STRING_DATA_${random * 10}`,
          status: 200,
          timeResponse: random * 1000,
        });
      } else {
        reject({ status: 429 });
      }
    }, random * 1000);
  });
};

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function applyApiCall(value, apiCallFn = fakeApiCall) {
  if (typeof value === "object" && value != null) {
    console.log(value);
    const values = Array.isArray(value) ? value : Object.values(value);
    values.forEach((el) => applyApiCall(el, apiCallFn));
    return;
  }

  if (isValidHttpUrl(value)) {
    apiCallFn(value)
      .then((data) => {
        console.log(data);
        // DO STUFF
      })
      .catch((error) => {
        console.log({ error });
      });
  }
}

const parseDataV1 = () => {
  fs.readFile("./mock/mock.json", { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.log(`Error occured during reading: ${error}`);
    }
    if (data) {
      const parsed = JSON.parse(data);

      if (Array.isArray(parsed)) {
        parsed.map((obj) => {
          applyApiCall(obj);
        });
      }
    }
  });
};
parseDataV1();
