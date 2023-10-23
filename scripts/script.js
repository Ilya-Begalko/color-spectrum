const cols = document.querySelectorAll('.col');


document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === "space") {
        setRandomColor();
    }
});

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }

    if (type === 'copy') {
        copyColor(event.target.textContent);

        new Toast({
            title: false,
            text: 'Color copied!',
            theme: 'default',
            autohide: true,
            interval: 1000
        });
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

function setRandomColor(isInitial) {
    const colors = isInitial ? getColorFromHash() : [];

    cols.forEach((col, index) => {
        const isLock = col.querySelector('i').classList.contains('fa-lock');

        const title = col.querySelector('h2');
        const btn = col.querySelector('button');
        const color = isInitial ? (colors[index] ? colors[index] : generateRandomColor()) : generateRandomColor();

        if (isLock) {
            colors.push(title.textContent);
            return
        }

        title.textContent = color;
        col.style.background = color;

        if (!isInitial) {
            colors.push(color);
        }


        setObjectColor(title, color);
        setObjectColor(btn, color);
    });

    updateColorsHash(colors);
}

function updateColorsHash(color = []) {
    document.location.hash = color.map((col) => {
        return col.toString().substring(1)
    }).join('-');
}

function getColorFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(col => '#' + col);
    }
    return [];
}

function copyColor(text) {
    return navigator.clipboard.writeText(text);
}

setRandomColor(true);