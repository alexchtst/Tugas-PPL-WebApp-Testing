// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/app/components/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1", // Add this line for app-wide aliases
    "^@/generated/(.*)$": "<rootDir>/app/generated/$1", // Add this for Prisma
  },
  moduleDirectories: ["node_modules", "<rootDir>"], // Add this to help with module resolution
};

module.exports = createJestConfig(customJestConfig);
