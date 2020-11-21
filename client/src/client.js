
const writeEvent = (text) => {
    // <ul> element
    const parent = document.querySelector('#regForm');

    // <li> element
    const el = document.createElement('text');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#grpName');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};


const sock = io(); // Establishing connection of client to server.
sock.on('message', writeEvent);

document
    .querySelector('#regForm')
    .addEventListener('submit', onFormSubmitted);