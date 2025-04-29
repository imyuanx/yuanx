/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const config = {
  endOfLine: 'lf',
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^types$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/common/use(.*)$',
    '^@/components/(.*)$',
    '^@/icons/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'tsx', 'jsx', 'decorators-legacy'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
