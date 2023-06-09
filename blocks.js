function getRandomHex() {
    // return a 32 bit hex string
    return Math.floor(Math.random() * 0xffffffff).toString(16);
}

// a chainable class for creating blocks
class Block {
    constructor({ name, tag, style, content, id, src, script } = {}) {
        this.name = name;
        this.tag = tag;
        this.style = style;
        this.content = content;
        this.id = id;
        this.src = src;
        this.script = script;

        return this;
    }
    setScript(script) {
        this.script = script;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setTag(tag) {
        this.tag = tag;
        return this;
    }
    setStyle(style) {
        this.style = style;
        return this;
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    setId() {
        this.id = getRandomHex();
        return this;
    }
    setSrc(src) {
        this.src = src;
        return this;
    }
}

// Main Blocks Store
const Blocks = {
    // a boxed text block
    block1: new Block({
        name: "Boxed Text",
        tag: "div",
        style: {
            "background-color": "#1e1e1e",
            width: "100%",
            height: "200px",
            display: "flex",
            "justify-content": "space-around",
            "align-items": "center",
            color: "#fff",
            "font-size": "2rem",
            "font-weight": "bold",
            border: "1px solid #00ffff45",
        },
        content: "Hello World",
        id: getRandomHex(),
    }),
    // a text block
    block2: new Block({
        name: "text",
        tag: "p",
        style: {
            "background-color": "transparent",
            width: "100%",
            height: "200px",
            display: "flex",
            "justify-content": "space-around",
            "align-items": "center",
            "text-align": "left",
            color: "#656565",
            "font-size": "1rem",
            "font-weight": "normal",
            border: "1px solid #00ffff45",
        },
        content: "This is a text block",
        id: getRandomHex(),
    }),
    // an image block
    block3: new Block({
        name: "image",
        tag: "img",
        style: {
            "background-color": "transparent",
            width: "200px",
            height: "200px",
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            "border-radius": "4px",
            border: "1px solid #00ffff45",
        },
        src: "https://picsum.photos/200/200",
        id: getRandomHex(),
    }),
    // an empty block to add other blocks
    block4: new Block({
        name: "block",
        tag: "div",
        style: {
            "background-color": "#1e1e1e",
            width: "100%",
            height: "200px",
            display: "flex",
            "justify-content": "space-around",
            "align-items": "center",
            color: "#fff",
            "font-size": "2rem",
            "font-weight": "bold",
            padding: "2rem",
            border: "1px solid #00ffff45",
        },
        content: "",
        id: getRandomHex(),
    }),
    // a block to display time
    block5: new Block({
        name: "time",
        tag: "div",
        style: {
            "background-color": "#1e1e1e",
            width: "100%",
            height: "200px",
            display: "flex",
            "justify-content": "space-around",
            "align-items": "center",
            color: "#fff",
            "font-size": "2rem",
            "font-weight": "bold",
            padding: "1rem",
            border: "1px solid #00ffff45",
        },
        content: "Time: " + new Date().toLocaleTimeString(),
    }).setScript((block) => {   
        setInterval(() => {
            document.getElementById(block.id).textContent =
                "Time: " + new Date().toLocaleTimeString();
        }, 1000);
    }),
    // a block to get memes
    block6: new Block({
        name: "get meme",
        tag: "button",
        style: {
            "background-color": "#1e1e1e",
            width: "100%",
            height: "200px",
            display: "flex",
            "justify-content": "space-around",
            "align-items": "center",
            color: "#fff",
            "font-size": "2rem",
            "font-weight": "bold",
            padding: "1rem",
            border: "1px solid #00ffff45",
        },
        content: "Get Meme",
    }).setScript((block) => {
        document.getElementById(block.id).addEventListener("click", async () => {
           const api = "https://meme-api.com/gimme/wholesomememes";
              const meme = await fetch(api)    
                .then((response) => {
                    return response.json();
                }
                );
            const img = meme.url;

            document.getElementById(block.id).textContent = "Loading...";
            document.getElementById(block.id).style.color = "#656565";
            document.getElementById(block.id).style.cursor = "not-allowed";
            document.getElementById(block.id).style.pointerEvents = "none";

            setTimeout(() => {
                document.getElementById(block.id).textContent = "Get Meme";
                document.getElementById(block.id).style.color = "#fff";
                document.getElementById(block.id).style.cursor = "pointer";
                document.getElementById(block.id).style.pointerEvents = "auto";
                document.getElementById(block.id).style.background = "#1e1e1e";
                document.getElementById(block.id).style.border = "1px solid #00ffff45";
            }
            , 1000);

            document.getElementById(block.id).style.background = "#656565";
            document.getElementById(block.id).style.border = "1px solid #656565";
            
            const node = document.createElement("img");
            node.id = getRandomHex();
            node.src = img;
            node.style.height = "300px";
            node.style.border = "1px solid #00ffff45";
            node.style.borderRadius = "4px";

            document.getElementById("dropAt").appendChild(node);
        });
    }),
};
