const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const testValue = "UCLA";
  const e = new Intern("Foo", 1, "test@test.com", testValue, "Genuine barista");
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Foo", 1, "test@test.com", "UCLA", "Genuine barista");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UCLA";
  const e = new Intern("Foo", 1, "test@test.com", testValue, "Genuine barista");
  expect(e.getSchool()).toBe(testValue);
});

test("Can get coffee brewing ability via getBrewAbility()", () => {
  const testValue = "Genuine barista";
  const e = new Intern("Foo", 1, "test@test.com", "UCLA", testValue);
  expect(e.getBrewAbility()).toBe(testValue);
});
