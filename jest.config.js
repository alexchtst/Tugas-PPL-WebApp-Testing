// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/app/components/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/generated/(.*)$": "<rootDir>/app/generated/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>"],

  // ✅ Tambahkan ini untuk mengabaikan file Prisma dari coverage
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/app/generated/prisma/",
    "<rootDir>/app/generated/prisma/runtime/",
  ],
};

module.exports = createJestConfig(customJestConfig);
