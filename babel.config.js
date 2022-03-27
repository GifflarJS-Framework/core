module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@utils": "./src/utils",
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@test": "./src/test",
        },
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
  ignore: ["**/*.spec.ts"],
};
