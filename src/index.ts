#!/usr/bin/env node
import ArgumentHandler from "@modules/argumentHandler";

const argv = process.argv;

console.log(argv);
const dir = argv[0];
const file = argv[1];
const args = argv.slice(2);

const argumentHandler = new ArgumentHandler();

argumentHandler.execute({ args, dir, file });
