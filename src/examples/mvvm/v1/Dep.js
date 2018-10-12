class Dep {
    constructor() {
        this.subs = [];
    }

    static target = null;

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}

export default Dep;