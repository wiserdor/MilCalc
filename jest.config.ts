/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  rootDir: "./src",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  }
};

export default config;
