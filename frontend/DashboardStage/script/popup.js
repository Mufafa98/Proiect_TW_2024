
export function showPopup(textContent) {
    const popupContainer = document.getElementById('popupContainer');

    console.log(popupContainer);
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const text = document.createElement('p');
    text.classList.add('popupText');
    text.textContent = textContent;
    popup.appendChild(text);
    popupContainer.appendChild(popup);
    setTimeout(() => {
        popup.style.right = '0px';
    }, 0);
    setTimeout(() => {
        hidePopup(popup);
    }, 4000);
}

function hidePopup(popup) {
    popup.classList.add('slow-hide');
    popup.style.right = '-500px';
    setTimeout(() => {
        popup.remove();
    }, 1500);
}


