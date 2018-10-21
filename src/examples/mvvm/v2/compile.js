import Watcher from './watcher';

class Compile {
    constructor(el, vm) {
        this.el = document.querySelector(el);
        this.vm = vm;
        this.fragment = null;
        this.init();
    }

    init() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.error('Dom is not exist!');
        }
    }

    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            //将Dom元素移入fragment中,那么el的firstChild将由第二个子节点代替
            fragment.appendChild(child);
            child = el.firstChild;
        }

        return fragment;
    }

    compileElement(el) {
        let childNodes = el.childNodes;
        [].slice.call(childNodes).forEach((node) => {
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;
            if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        });
    }

    compileText(node, exp) {
        let initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, (value) => {
            this.updateText(node, value);
        });
    }

    updateText(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }
}

export default Compile;