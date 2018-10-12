import observe from './observer';
import Compile from './compile';

class DcyVue {
    constructor(options) {
        this.vm = this;
        this.data = options.data;
        this.proxyKeys(this.data);
        observe(this.data);
        new Compile(options.el, this.vm);
    }

    proxyKeys(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {
                    return this.data[key];
                },
                set(newVal) {
                    this.data[key] = newVal;
                }
            });
        });
    }
}

export default DcyVue;