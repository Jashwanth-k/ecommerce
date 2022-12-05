let testfunctions = require("../../testfunctions/testfunction");
// beforeEach(() => console.log("tests started running"));
afterAll(() => console.log("tests completed"));
beforeEach(() => jest.useFakeTimers());

test("test sum function", () => {
  expect(testfunctions.sum(1, 2)).toEqual(3);
});

test("undefined", () => {
  const n = undefined;
  expect(n).toBeUndefined();
});

test("regex test", () => {
  expect("something").toMatch(/some/);
  expect(() => {});
});

test("test sum function", () => {
  expect(testfunctions.sum(12, 19)).toEqual(31);
  expect(() => testfunctions.checkNumbersErr(2)).toThrow("n is a number");
  expect(callBackFunction((a, b) => a + b)).toEqual(6);
  const mockedFunction = jest.fn((x) => x * 2);
  forEach([1, 2, 3, 4], mockedFunction);
  expect(mockedFunction.mock.calls.length).toBe(4);
  expect(mockedFunction.mock.calls[1][0]).toBe(2);
  expect(mockedFunction.mock.results[0].value).toBe(2);

  const myMock = jest.fn();
  myMock.mockReturnValueOnce(3).mockReturnValue("done");

  expect(myMock()).toBe(3);
  expect(myMock()).toBe("done");
});

// with callbacks
function callBackFunction(callback) {
  return callback(1, 5);
}

function forEach(items, callback) {
  for (let item of items) callback(item);
}
