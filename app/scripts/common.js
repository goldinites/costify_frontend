let userItem = document.getElementsByClassName('user-settings-item toggle');
let userItems = Array.from(userItem);
userItems.forEach(function (element) {
    element.addEventListener('click', function () {
        element.classList.toggle('active');
    });
});