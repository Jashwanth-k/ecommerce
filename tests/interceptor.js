module.exports = {
  mockRequest() {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  },

  mockResponse() {
    // the below functions will be called in the controller
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.writeHead = jest
      .fn()
      .mockImplementation((status) => (res.status = status));
    res.end = jest
      .fn()
      .mockImplementation((data) => (res.body = JSON.parse(data)));
    return res;
  },
};
