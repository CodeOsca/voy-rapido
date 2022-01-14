window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.ripple-efect');

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let x = event.clientX - event.target.offsetLeft;
            let y = event.clientY - event.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.className = 'ripple-span';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            btn.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000)
        })
    })
});