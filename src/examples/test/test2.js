function getData() {
    debugger
    return 100;
}

export default class Test2 {
    demo = getData();

    constructor() {
        debugger
        console.log(this.demo);
    }
}