const createRealNode = function(virtualNode) {
    if (virtualNode.nodeType === 'text') {
        // If the virtual node is a text node, create a text node.
        return document.createTextNode(virtualNode.text);
    } else {
        // If it's an element, create the element and its attributes.
        if (virtualNode.tagName) {
            const element = document.createElement(virtualNode.tagName);
            if (virtualNode.attributes) {

                for (const [attr, value] of Object.entries(virtualNode.attributes)) {
                    element.setAttribute(attr, value);
                }
            }
            if (virtualNode.style) {

                for (const [style, value] of Object.entries(virtualNode.style)) {
                    element.style[style] = value;
                }
            }
            if (virtualNode.text) {

                element.textContent = virtualNode.text;
            }
            if (virtualNode.childNodes) {

                // Recursively create child nodes and append them to the element
                for (const childVirtualNode of virtualNode.childNodes) {
                    const childElement = createRealNode(childVirtualNode);
                    element.appendChild(childElement);
                }

                return element;
            }
        }
    }
}
const createVirtualNode = function(realNode) {
    if (realNode.nodeType === Node.TEXT_NODE) {
        // If it's a text node, create a virtual text node.
        return {
            nodeType: 'text',
            text: realNode.textContent,
        };
    } else if (realNode.nodeType === Node.ELEMENT_NODE) {
        // If it's an element node, create a virtual element node.
        const virtualNode = {
            nodeType: 'element',
            tagName: realNode.tagName.toLowerCase(),
            attributes: {},
            style: {},
            childNodes: [],
            text: '',
            id: realNode.id,
            classList: [],
            siblings: [],
        };

        // Copy attributes and styles
        for (const attr of realNode.attributes) {
            virtualNode.attributes[attr.name] = attr.value;
        }

        for (const style in realNode.style) {
            virtualNode.style[style] = realNode.style[style];
        }

        // Recursively create child virtual nodes
        for (const childNode of realNode.childNodes) {
            const childVirtualNode = createVirtualNode(childNode);
            virtualNode.childNodes.push(childVirtualNode);
        }

        return virtualNode;
    }
}
const clearNode = function(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

const addNode = function(newNode, parentElement) {
    if (newNode && parentElement) {

        parentElement.appendChild(newNode);
    }
}
const renderNewNode = function(newNode, parentElement) {
    if (newNode && parentElement) {
        clearNode(parentElement)
        if (parentElement.childNodes.length == 0) {
            parentElement.appendChild(newNode);
        }
    }
}
const updateOldNode = function(realNode, oldNode, parentElement) {
    if (realNode && oldNode && parentElement) {
        if (realNode.nodeType !== Node.TEXT_NODE) {
            // This node is not a text node
            // Check and update text content
            if (oldNode.textContent !== realNode.textContent) {

                // Replace child nodes if text content doesn't match
                while (oldNode.firstChild) {
                    oldNode.removeChild(oldNode.firstChild);
                }
                for (let i = 0; i < realNode.childNodes.length; i++) {
                    const newChild = realNode.childNodes[i].cloneNode(true);
                    oldNode.appendChild(newChild);
                }
            }

            // Check and update styles (unchanged from previous code)
            for (const property in realNode.style) {
                if (realNode.style.hasOwnProperty(property)) {

                    if (oldNode.style.getPropertyValue(property) !== realNode.style.getPropertyValue(property)) {
                        oldNode.style.setProperty(property, realNode.style.getPropertyValue(property));
                    }
                }
            }

            // Check and update attributes (unchanged from previous code)

            if (realNode.attributes) {
                for (const name of realNode.getAttributeNames()) {
                    const value = realNode.getAttribute(name);
                    if (oldNode.getAttribute(name) !== value) {
                        oldNode.setAttribute(name, value);
                    }
                }
            }

            // Recursively update child nodes (unchanged from previous code)
            for (let i = 0; i < realNode.childNodes.length; i++) {
                updateOldNode(realNode.childNodes[i], oldNode.childNodes[i], oldNode);
            }
        }
    }
};
