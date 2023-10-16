class TableComponent extends Component
{
    constructor() {
        super();
    }

    create() {
        super.setTheme({
            "table": {
                "border": "0.5px solid black",
                "padding": "2px 5px",
                "border-collapse": "collapse",
                "width":"100%"

            },
            "th": {
                "color": "black",
                "backgroundColor": "#B4B4B4",
                "padding": "2px",
                "padding-left": "5px",
                "padding-right": "5px"
            },
            "tr": {
                "color": "black",
                "border": "1px solid black",
                "height": "100%",
                "width": "100%",
                "margin": "0"
            },
            "td":
            {
                "color": "black",
                "border": "1px solid black",
                "height": "100%",
                "width": "100%",
                "margin": "0",
                "padding":"0.25rem "+ ((window.innerWidth/2)-(50.55*window.innerWidth/100))+"px "+"0.25rem "+((window.innerWidth/2)-(50.75*window.innerWidth/100))+"px"
            }
        });
        super.setRootNode({
            tagName: "table", attributes: {}, style: this.defaultCSS.table, "childNodes": [], "nodeType": "element"
        });
        table.refresh();
    }
    style(style) {
        super.setRootNode({
            tagName: "table", attributes: {}, style: {
                ...style
            }, "childNodes": [], "nodeType": "element"
        });
    }

    render(newNode) {
        if (!newNode) {

            super.refresh();
        } else
        {
            super.render(newNode);
        }
    }

    addRow(node) {
        const childNodes = node.childNodes || [];

        if (node) {
            if (node.columns) {
                node.columns.forEach((column)=> {
                    childNodes.push(
                        {
                            "tagName": "td",
                            "attributes": column.attributes || {},
                            "style": column.style || this.defaultCSS.td,
                            "childNodes": column.childNodes || [],
                            "text": column.text || "",
                            "nodeType": "element"
                        }
                    );


                });
            }
            super.addNode({
                "tagName": "tr",
                "attributes": node.attributes || {},
                "style": node.style || this.defaultCSS.tr,
                "childNodes": childNodes,
                "text": node.text || "",
                "nodeType": "element"
            });

        }
    }
    addHead(node) {
        const childNodes = node.childNodes || [];

        if (node) {
            if (node.columns) {
                node.columns.forEach((column)=> {
                    childNodes.push(
                        {
                            "tagName": "td",
                            "attributes": column.attributes || {},
                            "style": column.style || this.defaultCSS.td,
                            "childNodes": column.childNodes || [],
                            "text": column.text || "",
                            "nodeType": "element"
                        }
                    );


                });
            }
            super.addNode({
                "tagName": "th",
                "attributes": node.attributes || {},
                "style": node.style || this.defaultCSS.th,
                "childNodes": childNodes,
                "text": node.text || "",
                "nodeType": "element"
            });

        }
    }
}
class AnchorComponent extends Component
{
    constructor() {
        super()
    }

    render() {
        super.refresh();
    }
    create() {
        super.setTheme({
            "a": {
                color: "#00E0FF"
            }
        });
        super.setRootNode({
            "tagName": "a", "attributes": {}, "style": 
                this.defaultCSS.a
            , "childNodes": [], "nodeType": "element",
            "text":""
        })
    }
    style(style) {
        if (style) {
            Object.assign(this.rootNode.style, style);
        }
        Object.assign(this.rootNode.style, this.defaultCSS.a);
    }
    href(url) {
        Object.assign(this.rootNode.attributes, {
            "href": url
        })
    }
    text(text) {
        this.rootNode.text =text;
    }
      }
