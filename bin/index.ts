import ArgumentHandler from "@modules/argumentHandler/implementations/default";

const argv = process.argv;

const dir = argv[0];
const file = argv[1];
const args = argv.slice(2);

const argumentHandler = new ArgumentHandler();

argumentHandler.execute({ args, dir, file });
