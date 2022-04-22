$(function() {
    let setGrid = function(containerSelector, columns, gridColor = '#1eb4e9') {
        function drawGrid() {
            let container      = document.querySelector(containerSelector);
            let containerWidth = container.offsetWidth;
            let containerLeft  = container.offsetLeft;
            let columnWidth    = containerWidth / columns;
            document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="grids"></div>');
            for(let i = columns; i >= 0; i--) {
                let columnLeft  = i * columnWidth + containerLeft;
                let gridElement = '<div class="grid-col '+ i +'" style="position: fixed; top: 0; bottom: 0; z-index: 1000; width: 1px; left:'+ columnLeft +'px; background-color: '+ gridColor +';"></div>';
                document.querySelector('.grids').insertAdjacentHTML('afterbegin', gridElement);
            }
        }
        function removeGrid() {
            let gridBlock = document.querySelector('.grids');
            if(gridBlock) {
                gridBlock.remove();
            }
        }
        drawGrid();
        window.onresize = function () {
            removeGrid();
            drawGrid();
        }
    }
    // setGrid('.container', 12);
});