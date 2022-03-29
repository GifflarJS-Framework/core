import { container } from "tsyringe";
import ArgumentHandlerDefault from "./implementations/ArgumentHandlerDefault";

const implementations = {
  default: ArgumentHandlerDefault,
};

container.register("ArgumentHandlerDefault", {
  useClass: implementations.default,
});

export default implementations.default;
