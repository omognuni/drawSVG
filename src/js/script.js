import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';


const draw = SVG().addTo('.container').size('100%', '100%');
const deletebtn = document.querySelector('.delete');
const rectbtn = document.querySelector('.rect');


let drawing = false;
let rect = false;
let count = 0;

let left;
let top;

rectbtn.addEventListener('click', function (e) {
    drawing = !drawing;

    if (drawing) {
        draw.on('click', startDraw);
    }
    else draw.off('click');

})

deletebtn.addEventListener('click', function () {
    draw.clear();
});

const startDraw = function (e) {
    left = e.offsetX;
    top = e.offsetY;
    console.log(e.target)
    drawer();
}

// const

const drawer = function () {
    let x, y, w, h;
    let box;
    rect = !rect;

    if (rect) {
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

            if (document.querySelector(`.id-${count}`)) document.querySelector(`.id-${count}`).remove();
            box = draw.rect(w, h).move(x, y).addClass(`id-${count}`).fill('none').stroke('black');

            box.on('mouseover', e => {
                if (!drawing)
                    box.fill({ color: '#ccc', opacity: 1 }).stroke('black');
            });
            box.on('mouseleave', e => box.fill({ color: '#ccc', opacity: 0 }).stroke('black'));
            box.draggable();
        })
    }

    if (!rect) {
        count++;
        draw.off('mousemove');
        draw.off('click');
        drawing = !drawing;
    }

}