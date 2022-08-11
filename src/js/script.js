import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';

class canvasView {

    _container = document.querySelector('.container');
    _draw = SVG().addTo('.container').size('100%', '100%');
    _deletebtn = document.querySelector('.delete');
    _rectbtn = document.querySelector('.rect');
    _drawing = false;
    _move = false;
    _shapeType;
    _activeObj;
    
    // model 에서 받아와야하는 부분
    // count, shapeType, x,y,w,h 전달해야함
    count = 0;

    constructor (){
        this._addDrawHandler();
        // this._drawStart();

    }

    
    _addDrawHandler() {

        // start drawing with n key
        document.addEventListener('keydown', (e) => {
            if (e.key == 'n') {
                this._drawStart();
            }
        })
        
        // start drawing
        this._rectbtn.addEventListener('click', () => {
            this._drawStart();
        })
        
        // delete all
        this._deletebtn.addEventListener('click', () => {
            this._draw.clear();
        });

        // delete active figure
        document.addEventListener('keydown',  (e) => {
            if (e.key === 'Delete') {
                if (this._activeObj !== '') document.querySelector(`#${this._activeObj}`).remove();
            }
        })

    }

    _drawStart() {
        this._drawing = !this._drawing;
        console.log(this.count);
    
        if (this._drawing) {
            this._container.style.cursor = "crosshair";
            this._draw.on('click', this._renderDraw.bind(this));
        }
    
        if (!this._drawing) {
           this._drawStop();
        }
    }

    _renderDraw(e) {
        let left = e.offsetX;
        let top = e.offsetY;
        let x, y, w, h;
        let box;
    
        this._move = !this._move;
        console.log(this._drawing);
        if (this._move) {
    
            this._draw.on('mousemove',  (e) => {
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
    
                if (document.querySelector(`#rect_${this.count}`)) document.querySelector(`#rect_${this.count}`).remove();
                box = this._draw.rect(w, h).move(x, y).fill('none').stroke('black').id(`rect_${this.count}`);
    
                box.on('mouseover', e => {
                    if (!this._drawing)
                        box.fill({ color: '#ccc', opacity: 1 }).stroke('black');
                    this._activeObj = e.target.id;
                });
                box.on('mouseleave', e => {
                    box.fill({ color: '#ccc', opacity: 0 }).stroke('black');
                    this._activeObj = '';
                });
                box.draggable();
            });
        }
        if (!this._move) {
            this.count++;
            this._drawStop();
            this._drawing = !this._drawing;
        }

    }

    _drawStop() {
        this._draw.off('mousemove');
        this._draw.off('click');
        this._container.style.cursor = '';

    }


}

new canvasView();


// const container = document.querySelector('.container');
// const draw = SVG().addTo('.container').size('100%', '100%');
// const deletebtn = document.querySelector('.delete');
// const rectbtn = document.querySelector('.rect');


// let drawing = false;
// let move = false;
// let shapeType;
// let count = 0;
// let activeObj = '';


// document.addEventListener('keydown', function (e) {
//     console.log(e.key);
// })

// document.addEventListener('keydown', function (e) {
//     if (e.key == 'n') {
//         drawHandler();
//     }
// })

// rectbtn.addEventListener('click', function (e) {
//     drawHandler(shapeType);
// })

// deletebtn.addEventListener('click', function () {
//     draw.clear();
// });


// const drawHandler = function (shapeType) {

//     drawing = !drawing;
//     console.log(count);

//     if (drawing) {
//         container.style.cursor = "crosshair";
//         draw.on('click', rectDraw);
//     }

//     if (!drawing) {
//         drawStop();
//     }
// }

// const drawStop = function () {
//     draw.off('mousemove');
//     draw.off('click');
//     container.style.cursor = '';
// }

// const rectDraw = function (e) {
//     let left = e.offsetX;
//     let top = e.offsetY;
//     let x, y, w, h;
//     let box;

//     move = !move;

//     if (move) {

//         draw.on('mousemove', function (e) {
//             x = left
//             y = top

//             if (left > e.offsetX) {
//                 x = e.offsetX
//                 w = left - e.offsetX
//             }
//             else w = e.offsetX - left;

//             if (top > e.offsetY) {
//                 y = e.offsetY
//                 h = top - e.offsetY;
//             }
//             else h = e.offsetY - top;

//             if (document.querySelector(`#rect_${count}`)) document.querySelector(`#rect_${count}`).remove();
//             box = draw.rect(w, h).move(x, y).fill('none').stroke('black').id(`rect_${count}`);

//             box.on('mouseover', e => {
//                 if (!drawing)
//                     box.fill({ color: '#ccc', opacity: 1 }).stroke('black');
//                 activeObj = e.target.id;
//             });
//             box.on('mouseleave', e => {
//                 box.fill({ color: '#ccc', opacity: 0 }).stroke('black');
//                 activeObj = '';
//             });
//             box.draggable();
//         });
//     }
//     if (!move) {
//         count++;
//         drawStop();
//         drawing = !drawing;
//     }
// }

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Delete') {
//         if (activeObj !== '') document.querySelector(`#${activeObj}`).remove();
//     }
// })