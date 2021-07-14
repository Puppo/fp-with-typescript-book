import { Client, Employee } from "../common";
import { composeLenses, Lens, over, propLens, set, view } from "./lens";

const nameLens: Lens<Client, string> = propLens("name");
const client: Client = {
  id: 1,
  name: "Jim",
  employee: { name: "John", age: 25 },
};
console.log("Custom lens get", nameLens.get(client));

const updateClient = nameLens.set(client)("Jim - Update");
console.log("Custom lens set", nameLens.get(updateClient));

var overClient: Client = over(nameLens, x => x.toUpperCase(), client);
console.log("Custom lens view over", view(nameLens, overClient));

const clientEmployeeLens: Lens<Client, Employee> = propLens("employee");
const employeeAgeLens: Lens<Employee, number> = propLens("age");

const clientEmployeeAgeLens = composeLenses(
  employeeAgeLens,
  clientEmployeeLens
);

console.log("Custom lens view path", view(clientEmployeeAgeLens, client));
console.log(
  "Custom lens set path",
  view(clientEmployeeAgeLens, set(clientEmployeeAgeLens, client, 30))
);
