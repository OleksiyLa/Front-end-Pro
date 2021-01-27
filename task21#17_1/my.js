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
        if (hero.classList.contains('removed')) {
            return
        }
        removeClassesFromMenu('active');
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

    const imgSources = ["https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/05a9c560-a732-4444-b060-9bbd764a396c/d7t0gft-af4a53bc-108e-453b-a910-6df2f1b34019.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDVhOWM1NjAtYTczMi00NDQ0LWIwNjAtOWJiZDc2NGEzOTZjXC9kN3QwZ2Z0LWFmNGE1M2JjLTEwOGUtNDUzYi1hOTEwLTZkZjJmMWIzNDAxOS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LCbyfavaIMpW54BxIaI0hhIDqV6yU592BYEbMLYtj-g",
    "https://i.pinimg.com/originals/d8/55/9f/d8559f57d2cfcc8db35f032b424f1fe8.gif",
    "https://camo.githubusercontent.com/a0d58634789b846466557b4c210c1638560a4bd4457161899e026ce7345bb288/687474703a2f2f32352e6d656469612e74756d626c722e636f6d2f63393961353739646233616530666331363462663463636131343838383564332f74756d626c725f6d6a6776386b45754d67317338376e37396f315f3430302e676966",
    "https://i.gifer.com/WME8.gif"];
    let contextElement = document.querySelector('.doc');
    let contextElementOnChar = document.querySelector('.hero');
    let contextJump = document.querySelector('#jump');
    let contextMoveLeft = document.querySelector('#move-left');
    let contextMoveRight = document.querySelector('#move-right');
    let changeImage = document.querySelector('#change-image');
    let resetPosition = document.querySelector('#reset');
    let addRemove = document.querySelector('#add-remove');
    let imgNum = imgSources.length;
    let counter = 0;

    window.addEventListener("contextmenu", function(event){
        event.preventDefault();
        removeClassesFromMenu('active');

        if(event.target === hero) {
            contextMenuOpen(contextElementOnChar);
        } else {
            contextMenuOpen(contextElement);
        }
        
    });

    function contextMenuOpen (menu) {
        if (window.innerWidth - event.clientX < menu.offsetWidth){
            menu.style.left = event.clientX - menu.offsetWidth + 'px';
        } else {
            menu.style.left = event.clientX + 'px';
        }
        if (window.innerHeight - event.clientY < menu.offsetHeight){
            menu.style.top = event.clientY - menu.offsetHeight + 'px';
        } else {
            menu.style.top = event.clientY + 'px';
        }
        menu.classList.add("active");
    }

    function removeClassesFromMenu(str) {
        contextElement.classList.remove(str);
        contextElementOnChar.classList.remove(str);
    }
    
    window.addEventListener("click", function(event){
        if (!isBlockInWindow()) {
            return;
        }
        if(event.target === contextJump) {
            if(finishJump){ if(hero.clientHeight != playerHeight * 0.6 ){jump(); finishJump = false; setTimeout(function(){finishJump = true;},1000)};
            }
        }
        if(event.target === contextMoveLeft) {
            hero.style.transition = '.5s';
            hero.style.left = hero.offsetLeft - step * 5 + 'px'; hero.style.transform = 'rotateY(180deg)';
            setTimeout(function(){hero.style.transition = '';},500);
        }
        if(event.target === contextMoveRight) {
            hero.style.transition = '.5s';
            hero.style.left = hero.offsetLeft + step * 5 + 'px'; hero.style.transform = '';
            setTimeout(function(){hero.style.transition = '';},500);
        }
        if(event.target === changeImage) {
            counter++;
            if (counter === imgNum) {
                counter = 0;
            }
            hero.src = imgSources[counter];
        }
        if(event.target === resetPosition) {
            hero.style.top = '50%';
            hero.style.left = '50%';
        }
        if(event.target === addRemove) {
            hero.classList.toggle('removed');
            if (hero.classList.contains('removed')) {
                addRemove.innerText = 'Add Charachter';
            } else {
                addRemove.innerText = 'Remove Char';
            }
        }
        removeClassesFromMenu('active');
    });
});