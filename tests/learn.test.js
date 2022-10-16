let testfunctions = require("../testfunctions/testfunction");
test("Test sum functions", () => {
  expect(testfunctions.sum(1, 2)).toEqual(3);
  expect(testfunctions.sum(10, 4)).toEqual(14);
});

test("Test sum functions", () => {
  expect(testfunctions.sum(10, 20)).toEqual(30);
});
