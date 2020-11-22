const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue, "555-555-1234");
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser", "555-555-1234");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue, "555-555-1234");
  expect(e.getGithub()).toBe(testValue);
});

test("Can get phone number via getPhone()", () => {
  const testValue = "555-555-1234";
  const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser", testValue);
  expect(e.getPhone()).toBe(testValue);
});
