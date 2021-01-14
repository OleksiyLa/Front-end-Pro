window.addEventListener('load', function() {
    const hero = document.querySelector('#playerImg');
    let step = 10;
    const h = 150;
    let playerWidth = hero.clientWidth;
    let playerHeight = hero.clientHeight;
    let finishJump = true;

    function moveHero (e) {
        if (!isBlockInWindow()) {
            return
        }

        switch(e.keyCode) {
            case 37: hero.style.left = hero.offsetLeft - step + 'px'; hero.style.transform = 'rotateY(180deg)'; break;
            case 39: hero.style.left = hero.offsetLeft + step + 'px'; hero.style.transform = ''; break;
            case 38: if(hero.clientHeight != playerHeight * 0.6 ){
                hero.style.top = hero.offsetTop - step + 'px'; hero.style.transform = 'rotateZ(-90deg)'}; break;
            case 40: if(hero.clientHeight != playerHeight * 0.6 ){
                hero.style.top = hero.offsetTop + step + 'px'; hero.style.transform = 'rotateZ(90deg)'}; break;
            case 17: hero.style.width = playerWidth * 1.15 + 'px'; hero.style.height = playerHeight * 0.6 + 'px'; 
                hero.style.top = hero.offsetTop + playerHeight * 0.4 + 'px'; break;
            case 32: if(finishJump){ if(hero.clientHeight != playerHeight * 0.6 ){jump(); finishJump = false; setTimeout(function(){finishJump = true;},1000)}; break;}
        }
    }

    function getUp (e) {
        switch(e.keyCode) {
            case 17: hero.style.width = playerWidth + 'px'; hero.style.height = playerHeight + 'px'; 
                hero.style.top = hero.offsetTop - playerHeight * 0.4 + 'px'; break;
        }
    }

    function jump () {
        hero.style.transition = '.5s';
        let offsetTop = hero.offsetTop;
        hero.style.top = offsetTop - h + 'px';
        setTimeout(function(){
            hero.style.top = offsetTop + 'px';
            setTimeout(function(){
                hero.style.transition = '';},500)
        }, 500);
    }

    function isBlockInWindow () {

        if (hero.offsetLeft + hero.offsetWidth >= window.innerWidth) {
            hero.style.left = window.innerWidth - hero.offsetWidth - step * 2 + 'px';
            return false;
        }

        if (hero.offsetTop + hero.offsetHeight >= window.innerHeight) {
            hero.style.top = window.innerHeight - hero.offsetHeight - step * 2 + 'px';
            return false;
        }

        if (hero.offsetLeft <= 0) {
            hero.style.left = step * 2 + 'px';
            return false;
        }

        if (hero.offsetTop <= 0) {
            hero.style.top = step * 2 + 'px';
            return false;
        }
        
        return true;
    }

    document.addEventListener('keydown', moveHero);
    document.addEventListener('keyup', getUp);
});


