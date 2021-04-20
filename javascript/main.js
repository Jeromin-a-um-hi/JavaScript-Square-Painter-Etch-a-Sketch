const button = document.querySelector("button");
const resolution = document.querySelector("input");
const canvas = document.querySelector("#drawcanvas");
const togglebutton = document.querySelector("#toggle");
const resetbutton = document.querySelector("#Reset");
const savebutton = document.querySelector("#Save");
const save = document.querySelector("#canvas");
let image = "";
let colour = "blue";
let rightclickdown = false;
let borders;

canvas.addEventListener("mousedown", () => {
    rightclickdown = true;
});

document.body.addEventListener("mouseup", () => {
    rightclickdown = false;
});

function addUse(){
    tds = document.querySelectorAll("td");

    tds.forEach((td) => {
        td.addEventListener("mousedown", () => {
            td.style.backgroundColor = colour;
        });
        td.addEventListener("mouseover", () => {
            if(rightclickdown === true){
                td.style.backgroundColor = colour;
            };
        });
    });
};

function createCanvas(resolution){
    for(i = 0; i < resolution; i++){
        const tr = document.createElement("tr");
        canvas.appendChild(tr);

        for(n = 0; n < resolution; n++){
            const td = document.createElement("td");
            td.classList.add("borders");
            tr.appendChild(td);  
        };

        addUse(); 
    };
};

button.addEventListener("click", () => {
    if (canvas.firstChild){
        while (canvas.firstChild){
            canvas.removeChild(canvas.firstChild);
        };
    };

    createCanvas(resolution.value);
});

togglebutton.addEventListener("click", () => {
    tds = document.querySelectorAll("td");

    tds.forEach((td) => {
        td.classList.toggle("borders");
    });
});

resetbutton.addEventListener("click", () => {
    tds = document.querySelectorAll("td");

    tds.forEach((td) => {
        td.style.backgroundColor = "white";
    });
});

class colourbutton {
    constructor(id, colourname) {
        this.id = id;
        this.colourname = colourname;

        id.addEventListener("click", () => {
            colour = colourname;
        });
    };
};

new colourbutton(document.querySelectorAll(".btns1")[0], "Violet");
new colourbutton(document.querySelectorAll(".btns1")[1], "Indigo");
new colourbutton(document.querySelectorAll(".btns1")[2], "Blue");
new colourbutton(document.querySelectorAll(".btns1")[3], "Green");
new colourbutton(document.querySelectorAll(".btns1")[4], "Yellow");
new colourbutton(document.querySelectorAll(".btns1")[5], "Orange");
new colourbutton(document.querySelectorAll(".btns1")[6], "Red");

savebutton.addEventListener("click", () => {
    tds.forEach((td) => {
        if(td.classList.contains("borders")){
            td.classList.remove("borders");
        }
        else{
            borders = false;
        };
    });
    html2canvas(canvas).then((canvas) => {
        link = canvas.toDataURL("image/jpeg", 1.0);
        download = document.createElement("a");
        download.href = link;
        download.download = link;
        download.click();
    });
    tds.forEach((td) => {
        if(borders === false){
            return;
        }
        else{
            td.classList.toggle("borders");
        }
    });
});