const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event)=>{
    if(event.code.toLowerCase() == "space"){
        setRandomColor();
    }
});

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }

    return '#' + color;
}

function setObjectColor(object, color) {
    const luminance = chroma(color).luminance();
    object.style.color = luminance > 0.5 ? 'black' : 'white';
}

function setRandomColor() {
    cols.forEach(col => {
        const title = col.querySelector('h2');
        const btn = col.querySelector('button');
        const color = generateRandomColor();
        

        title.textContent = color;
        col.style.background = color;

        setObjectColor(title, color);
        setObjectColor(btn, color);
    })
}

setRandomColor();