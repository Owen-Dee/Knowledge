import observe from './observer';
import Watcher from './watcher';

class DcyVue {
    constructor(data, el, exp) {
        this.data = data;
        this.proxyKeys(data);
        observe(data);
        el.innerHTML = this.data[exp];
        new Watcher(this, exp, (value) => {
            el.innerHTML = value;
        });
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