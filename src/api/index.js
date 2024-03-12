const args = process.argv.slice(2);
// Clean mode dissables network simulation
const cleanMode = args.find((arg) => arg.startsWith("clean"));

const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

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

const getDataCall = (url) => {
  return new Promise((resolve, reject) => {
    const random = Math.random();

    resolve({
      data: `SOME_STRING_DATA_${random * 10}`,
      status: 200,
    });
  });
};

const apiCaller = cleanMode ? getDataCall : fakeApiCall;

const tryApiCallOnValue = async (value) => {
  if (isValidHttpUrl(value)) {
    let attempts = 1;
    while (attempts <= 5) {
      try {
        const data = await apiCaller(value);
        return { url: value, data };
      } catch (error) {
        attempts++;
        if (attempts > 5) {
          throw new Error("FAILED DUE TO API FAILURE. ABORT");
        }
        console.log(
          "\x1b[33m%s\x1b[0m",
          `Failed to fetch data from ${value}. Status code: ${error.status}. Attempt: ${attempts}/5`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
  return value;
};

const applyApiCall = async (value, apiCallFn = tryApiCallOnValue) => {
  if (typeof value === "object" && value != null) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        value[i] = await applyApiCall(value[i], apiCallFn);
      }
      return value;
    } else {
      for (const key in value) {
        value[key] = await applyApiCall(value[key], apiCallFn);
      }
      return value;
    }
  }

  return await apiCallFn(value);
};

module.exports = applyApiCall;
