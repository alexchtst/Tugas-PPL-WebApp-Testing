// jest.setup.ts
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfills
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Web APIs
class RequestMock extends Function {
  constructor() {
    super("...args", "return this._call(...args)");
  }
}
global.Request = RequestMock as any;

class ResponseMock {
  constructor() {}
  static json = jest.fn();
}
global.Response = ResponseMock as any;

// Mock alert
window.alert = jest.fn();
