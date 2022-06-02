#!/usr/bin/env node
import "reflect-metadata";
import "./modules";
import "./shared/container";
import { IArgumentHandler } from "@modules/ArgumentHandler/types/IArgumentHandler";
import { container } from "tsyringe";

const argv = process.argv;

console.log(argv);
const dir = argv[0];
const file = argv[1];
const args = argv.slice(2);

const argumentHandler = container.resolve<IArgumentHandler>("ArgumentHandler");

argumentHandler.execute({ args, dir, file });
