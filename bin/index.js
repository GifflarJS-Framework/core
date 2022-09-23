#!/usr/bin/env node
"use strict";

require("reflect-metadata");

require("./modules");

require("./shared/container");

var _tsyringe = require("tsyringe");

const argv = process.argv; // console.log(argv);

const dir = argv[0];
const file = argv[1];
const args = argv.slice(2);

const argumentHandler = _tsyringe.container.resolve("ArgumentHandler");

argumentHandler.execute({
  args,
  dir,
  file
});