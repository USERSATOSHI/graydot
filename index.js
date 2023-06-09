const blocks = document.getElementById("blocks");
const dropZone = document.getElementById("dropAt");
const reset = document.getElementById("reset");

// Looping over Blocks structure in blocks.js to create boxes in #blocks
for (const block in Blocks) {
    const el = document.createElement("div");
    el.id = block;
    el.className = "block";
    el.draggable = true;
    el.textContent = Blocks[block].name;

    el.addEventListener("dragstart", dragstart_handler);
    el.addEventListener("touchstart", touchstart_handler);

    blocks?.appendChild(el);
}
// function to set style of element
function setStyle(el, style) {
    for (const key in style) {
        el.style[key] = style[key];
    }
}

// dragStartEvent handler
function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}
// dragoverEvent handler
function dragover_handler(ev) {
    ev.dataTransfer.dropEffect = "move";
    ev.preventDefault();
}
// dropEvent handler
function drop_handler(ev) {
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("application/my-app");
    const node = document.createElement(Blocks[data].tag);

    // generate random id for the element
    node.id = Blocks[data].setId(getRandomHex()).id;
    setStyle(node, Blocks[data].style);
    node.textContent = Blocks[data].content;

    if (Blocks[data].src) {
        node.src = Blocks[data].src;
    }
    // append the element to the target
    ev.target.appendChild(node);

    // run script if it exists
    if (Blocks[data].script) {
        Blocks[data].script(Blocks[data]);
    }

}

// adding event listeners to dropZone
dropZone.addEventListener("dragover", dragover_handler);
dropZone.addEventListener("drop", drop_handler);
dropZone.addEventListener("touchmove", touchmove_handler);
dropZone.addEventListener("touchend", touchend_handler);

// adding dragOver event listener to blocks to prevent no-drop cursor
blocks.addEventListener("dragover", (ev) => {
    ev.dataTransfer.dropEffect = "move";
    ev.preventDefault();
});

// reset button click event listener
reset.addEventListener("click", () => {
    dropZone.innerHTML = "";
});

// touchevents functions

const touchData = {};

function touchstart_handler(ev) {
    // if app exists then reset its style
    if (touchData.app) {
        touchData.el.style.position = "static";
        touchData.el.style.zIndex = "unset";
        touchData.el.style.transform = "unset";
        touchData.el.style.transition = "all 0.5s ease";
        touchData.el.style.pointerEvents = "auto";
        touchData.el.style.opacity = 1;
    }

    // set info of the app in touchData
    touchData.app = ev.target.id;
    touchData.x = ev.touches[0].clientX;
    touchData.y = ev.touches[0].clientY;
    touchData.el = document.getElementById(touchData.app);
    touchData.el.style.opacity = 0.5;
}

function touchmove_handler(ev) {
    // move the app
    touchData.el.style.left = ev.touches[0].clientX + "px";
    touchData.el.style.top = ev.touches[0].clientY + "px";
}

function touchend_handler(ev) {
    if (!touchData.app) return;

    // reset the style of the app
    touchData.el.style.position = "static";
    touchData.el.style.zIndex = "unset";
    touchData.el.style.transform = "unset";
    touchData.el.style.transition = "all 0.5s ease";
    touchData.el.style.pointerEvents = "auto";
    touchData.el.style.opacity = 1;

    // create the element
    const node = document.createElement(Blocks[touchData.app].tag);

    // generate random id for the element
    node.id = Blocks[touchData.app].setId(getRandomHex()).id;

    setStyle(node, Blocks[touchData.app].style);
    node.textContent = Blocks[touchData.app].content;
    if (Blocks[touchData.app].src) {
        node.src = Blocks[touchData.app].src;
    }

    // append the element to the target
    ev.target.appendChild(node);

    // run script if it exists
    if (Blocks[touchData.app].script) {
        +Blocks[touchData.app].script(Blocks[touchData.app]);
    }

    // reset touchData
    touchData.app = null;
    touchData.x = null;
    touchData.y = null;
    touchData.el = null;
}
