const test = {
  a: "a.string",
  b: [1, 2, 3],
  c: {
    a2: "a2.string",
    b2: {
      b3: ["b3.string"],
      a3: ["a3.1", "a3.2", undefined, null, true, false],
    },
    c2: ["c2.string"],
  },
};

function applyFunction(value, fieldFn) {
  if (typeof value === "object" && value != null) {
    const values = Array.isArray(value) ? value : Object.values(value);
    values.forEach((el) => applyFunction(el, fieldFn));
    return;
  }

  fieldFn(value);
}

applyFunction(test, (value) => console.log(value));
