/** @typedef {import('prettier').Config} PrettierConfig */

const nextConfig = {
  trailingComma: "all",
  tabWidth: 2,
  useTabs: true,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  arrowParens: "always",
  importOrder: ["^components/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default nextConfig;
