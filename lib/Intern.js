const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school, coffeeAbility){
        super(name, id, email);
        this.school = school;
        this.coffeeAbility = coffeeAbility;
    }

    getRole() {
        return "Intern";
    }

    getSchool(){
        return this.school;
    }

    getBrewAbility(){
        return this.coffeeAbility;
    }
}

module.exports = Intern;
