export type Employee = { name: string; age: number };

export type Client = Readonly<{
  id: number;
  name: string;
  employee: Employee;
}>;
