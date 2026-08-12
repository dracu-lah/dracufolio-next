import next from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**"] },
  ...next,
  ...nextTypescript,
];

export default eslintConfig;
