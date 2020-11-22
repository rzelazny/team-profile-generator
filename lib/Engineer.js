const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github, phone){
        super(name, id, email);
        this.github = github;
        this.phone = phone;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }

    getPhone() {
        return this.phone;
    }
}

module.exports = Engineer;