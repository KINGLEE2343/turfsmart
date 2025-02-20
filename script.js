const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorDisplay = document.getElementById('colorDisplay');
const colorValue = document.getElementById('colorValue');

let painting = false;

// Start painting
canvas.addEventListener('mousedown', (e) => {
    painting = true;
    draw(e);
});

// Stop painting
canvas.addEventListener('mouseup', () => {
    painting = false;
    ctx.beginPath();
});

// Draw on the canvas
canvas.addEventListener('mousemove', (e) => {
    if (painting) {
        draw(e);
    }
});

// Draw function
function draw(e) {
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000'; // You can change this to any color or implement a color picker

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Color sensing
canvas.addEventListener('click', (e) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    const a = pixel[3];

    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    colorDisplay.style.backgroundColor = rgba;
    colorValue.textContent = `Color: rgba(${r}, ${g}, ${b}, ${a})`;
});
