import '@testing-library/jest-dom'
// Mock global alert to avoid "not implemented" errors from JSDOM
window.alert = jest.fn();