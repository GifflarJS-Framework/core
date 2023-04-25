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
          "@templates": "./src/templates/*",
          "@test": "./src/test",
          "@shared": "./src/shared",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    // ["@babel/plugin-proposal-decorators", { legacy: true }],
    // "babel-plugin-parameter-decorator",
  ],
  ignore: ["**/*.spec.ts"],
};
