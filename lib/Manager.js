const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber, coffeePreference){
        super(name, id, email);
        this.coffeePreference = coffeePreference;
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }
    getOffice(){
        return this.officeNumber;
    }

    getCoffeePreference(){
        return this.coffeePreference;
    }
}

module.exports = Manager;
