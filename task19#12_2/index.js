window.addEventListener('load', function() {
    const box = document.querySelector('#box');
    let offsetLeft;
    let offsetTop;
    const step = 40;
    const textBorderHitTime = 2000;

    function moveByKeys (event) {
        offsetLeft = box.offsetLeft;
        offsetTop = box.offsetTop;
        if (!isBlockInWindow()) {
            textBorderHit("БЭМС");
            return
        }
        switch (event.code) {
            case 'ArrowLeft' : box.style.left = offsetLeft - step + 'px'; break;
            case 'ArrowRight' : box.style.left = offsetLeft + step + 'px'; break;
            case 'ArrowUp' : box.style.top = offsetTop - step + 'px'; break;
            case 'ArrowDown' : box.style.top = offsetTop + step + 'px'; break;
        }
    }

    document.addEventListener('keydown', moveByKeys);

    function isBlockInWindow () {

        if (box.offsetLeft + box.offsetWidth >= window.innerWidth) {
            box.style.left = window.innerWidth - box.offsetWidth - step * 2 + 'px';
            return false;
        }

        if (box.offsetTop + box.offsetHeight >= window.innerHeight) {
            box.style.top = window.innerHeight - box.offsetHeight - step * 2 + 'px';
            return false;
        }

        if (box.offsetLeft <= 0) {
            box.style.left = step * 2 + 'px';
            return false;
        }

        if (box.offsetTop <= 0) {
            box.style.top = step * 2 + 'px';
            return false;
        }
        
        return true;
    }

    function textBorderHit (str) {
        box.innerHTML = str;
        setTimeout(() => {
        box.innerHTML = '';
        }, textBorderHitTime);
    }

});