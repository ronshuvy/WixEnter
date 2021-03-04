
class Student {

    health = {}

    constructor(name) {
        this.name = name;
    }

    sayHello = function () {
        console.log('Hello World!');
    };

    sayGoodBye = (x) => console.log(x);

}

const s1 = new Student('Ron');
s1.sayHello();
s1.sayGoodBye('xx');