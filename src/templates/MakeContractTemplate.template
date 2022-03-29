//Contract template
// Factory
import { createContract } from "gifflar";

// Creating contract model
const myContract = createContract("MyContract");

// Creating a contract variable
myContract.createVariable("string", "message", "public");

// Creating a contract constructor function
myContract
  .createConstructor("public")
  .setInput("string", "_message")
  .setAssignment("message", "_message");

export default myContract;
