import * as R from "ramda";
import { Client } from "../common";

const clientNameLens = R.lensProp<Client>("name");
const clientEmployeeAgeLens = R.lensPath<Client>(["employee", "age"]);

const client: Client = {
  id: 1,
  name: "Jim",
  employee: { name: "John", age: 25 },
};

console.log("Ramda view", R.view(clientNameLens, client));
console.log(
  "Ramda set",
  R.view(clientNameLens, R.set(clientNameLens, `Jim update`, client))
);

console.log("Ramda view path", R.view(clientEmployeeAgeLens, client));
console.log(
  "Ramda set path",
  R.view(clientEmployeeAgeLens, R.set(clientEmployeeAgeLens, 30, client))
);
