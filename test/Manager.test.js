const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const testValue = 100;
  const e = new Manager("Foo", 1, "test@test.com", testValue, "black");
  expect(e.officeNumber).toBe(testValue);
});

test('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const e = new Manager("Foo", 1, "test@test.com", 100, "black");
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const testValue = 100;
  const e = new Manager("Foo", 1, "test@test.com", testValue, "black");
  expect(e.getOfficeNumber()).toBe(testValue);
});

test("Can get coffee preference via getCoffeePreference()", () => {
  const testValue = "black";
  const e = new Manager("Foo", 1, "test@test.com", 100, testValue);
  expect(e.getCoffeePreference()).toBe(testValue);
});