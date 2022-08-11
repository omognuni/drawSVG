import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';

const container = document.querySelector('.container');
const draw = SVG().addTo('.container').size('100%', '100%');
const deletebtn = document.querySelector('.delete');
const rectbtn = document.querySelector('.rect');


let drawing = false;
let move = false;
let shapeType;
let count = 0;
let activeObj = '';


document.addEventListener('keydown', function (e) {
    console.log(e.key);
})

document.addEventListener('keydown', function (e) {
    if (e.key == 'n') {
        drawHandler();
    }
})

rectbtn.addEventListener('click', function (e) {
    drawHandler(shapeType);
})

deletebtn.addEventListener('click', function () {
    draw.clear();
});


const drawHandler = function (shapeType) {

    drawing = !drawing;
    console.log(count);

    if (drawing) {
        container.style.cursor = "crosshair";
        draw.on('click', rectDraw);
    }

    if (!drawing) {
        drawStop();
    }
}

const drawStop = function () {
    draw.off('mousemove');
    draw.off('click');
    container.style.cursor = '';
}

const rectDraw = function (e) {
    let left = e.offsetX;
    let top = e.offsetY;
    let x, y, w, h;
    let box;

    move = !move;

    if (move) {

        draw.on('mousemove', function (e) {
            x = left
            y = top

            if (left > e.offsetX) {
                x = e.offsetX
                w = left - e.offsetX
            }
            else w = e.offsetX - left;

            if (top > e.offsetY) {
                y = e.offsetY
                h = top - e.offsetY;
            }
            else h = e.offsetY - top;

            if (document.querySelector(`#rect_${count}`)) document.querySelector(`#rect_${count}`).remove();
            box = draw.rect(w, h).move(x, y).fill('none').stroke('black').id(`rect_${count}`);

            box.on('mouseover', e => {
                if (!drawing)
                    box.fill({ color: '#ccc', opacity: 1 }).stroke('black');
                activeObj = e.target.id;
            });
            box.on('mouseleave', e => {
                box.fill({ color: '#ccc', opacity: 0 }).stroke('black');
                activeObj = '';
            });
            box.draggable();
        });
    }
    if (!move) {
        count++;
        drawStop();
        drawing = !drawing;
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete') {
        if (activeObj !== '') document.querySelector(`#${activeObj}`).remove();
    }
})