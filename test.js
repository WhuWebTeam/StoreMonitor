class Test {
    constructor() {
        this.name = 'sfrgb';
    }

    async getName() {
        return this.name;
    }

    async setName(name) {
        this.name = name;
    }

    async printName() {
        const name = await this.getName();
        console.log(name);
    }
}


const t = new Test();
t.printName();