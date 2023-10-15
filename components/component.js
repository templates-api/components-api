class Component
{
    constructor() {
        this.defaultCSS = {
        
        };
    }
   
    render(newNode) {
        this.rootNode.childNodes.push(newNode)

        renderNewNode(createRealNode(this.rootNode), this.parentElement);
    }
    refresh()
    {
        renderNewNode(createRealNode( this.rootNode),this.parentElement);
    }
    getRootNode() {
        return this.rootNode;
    }
    setTheme(rules)
    {
        Object.assign(this.defaultCSS,rules);
    }
    setRootNode(node) {
        if (!node && !this.rootNode) {

            this.rootNode = {};
        }
        if (node && !this.rootNode) {
            this.rootNode = {};
        }
        Object.assign(this.rootNode, node);
    }
    getElement(selector) {
        this.parentElement = document.querySelector(selector);
        return this.parentElement;
    }

    addNode(newNode) {
        this.rootNode.childNodes.push(newNode);
    }
    clearNode() {
        this.rootNode.childNodes = [];
    }
    update(newNode, oldNode) {
        
        updateOldNode(newNode, oldNode, this.parentElement);
    }
}
