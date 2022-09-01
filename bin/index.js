#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./modules");
require("./shared/container");
var tsyringe_1 = require("tsyringe");
var argv = process.argv;
console.log(argv);
var dir = argv[0];
var file = argv[1];
var args = argv.slice(2);
var argumentHandler = tsyringe_1.container.resolve("ArgumentHandler");
argumentHandler.execute({ args: args, dir: dir, file: file });
