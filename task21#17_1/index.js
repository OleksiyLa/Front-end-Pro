class MenuItem {
    constructor(title, action){
        this.title = title;
        this.action = action;
    }

    getItemTemplate(){
    return `<div class="menu-item" data-action="${this.action}">
                <span class="menu-item__icon fas fa-${this.icon}"></span> 
                <span class="menu-item__title">${this.title}</span>
            </div>`
    }
}

const KEY_LEFT = 'action__left';
const KEY_RIGHT = 'action__right';
const KEY_JUMP = 'action__jump';
const KEY_ADD = 'action__add';
const KEY_REMOVE = 'action__remove';
const KEY_CHANGE = 'action__change';
const KEY_RESET_POSITION = 'action__reset_position';

const ACTIONS = {
    [KEY_LEFT]: KEY_LEFT,
    [KEY_RIGHT]: KEY_RIGHT,
    [KEY_JUMP]: KEY_JUMP,
    [KEY_ADD]: KEY_ADD,
    [KEY_REMOVE]: KEY_REMOVE,
    [KEY_CHANGE]: KEY_CHANGE,
    [KEY_RESET_POSITION]: KEY_RESET_POSITION,
}

const contextMenu = [
    new MenuItem('Left', ACTIONS[KEY_LEFT]),
    new MenuItem('Right', ACTIONS[KEY_RIGHT]),
    new MenuItem('Jump', ACTIONS[KEY_JUMP]),
    new MenuItem('Add', ACTIONS[KEY_ADD]),
    new MenuItem('Remove', ACTIONS[KEY_REMOVE]),

];

const contextMenuOnChar = [
    new MenuItem('Change', ACTIONS[KEY_CHANGE]),
    new MenuItem('Reset', ACTIONS[KEY_RESET_POSITION]),
];

const imgSources = ["https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/05a9c560-a732-4444-b060-9bbd764a396c/d7t0gft-af4a53bc-108e-453b-a910-6df2f1b34019.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDVhOWM1NjAtYTczMi00NDQ0LWIwNjAtOWJiZDc2NGEzOTZjXC9kN3QwZ2Z0LWFmNGE1M2JjLTEwOGUtNDUzYi1hOTEwLTZkZjJmMWIzNDAxOS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LCbyfavaIMpW54BxIaI0hhIDqV6yU592BYEbMLYtj-g",
    "https://i.pinimg.com/originals/d8/55/9f/d8559f57d2cfcc8db35f032b424f1fe8.gif",
    "https://camo.githubusercontent.com/a0d58634789b846466557b4c210c1638560a4bd4457161899e026ce7345bb288/687474703a2f2f32352e6d656469612e74756d626c722e636f6d2f63393961353739646233616530666331363462663463636131343838383564332f74756d626c725f6d6a6776386b45754d67317338376e37396f315f3430302e676966",
    "https://i.gifer.com/WME8.gif"];

window.addEventListener('load', function() {
    const target = document.body;
    

    target.innerHTML += `
        <div class="context-menu on-doc">
            ${contextMenu.map(item => item.getItemTemplate()).join('')}
        </div>
        <div class="context-menu on-char">
            ${contextMenuOnChar.map(item => item.getItemTemplate()).join('')}
        </div>
    `;

    document.querySelectorAll('.menu-item').forEach(item => 
        item.addEventListener('click', event => {
            const handler = struct[item.dataset.action];
            if(handler){
                handler();
            }
        })
    )

    const toAdd = document.querySelector(`[data-action="${KEY_ADD}"]`);
    const toRemove = document.querySelector(`[data-action="${KEY_REMOVE}"]`);
    toAdd.remove();

    const hero = document.querySelector('#playerImg');
    let step = 10;
    const h = 150;
    let playerWidth = hero.clientWidth;
    let playerHeight = hero.clientHeight;
    let finishJump = true;
    let counter = 0;

    document.addEventListener('contextmenu', event => {
        event.preventDefault();
        hideContextMenu ()

        const menu = document.querySelector('.context-menu.on-doc');
        menu.classList.add('show');
        menu.style.left = event.clientX + 'px';
        menu.style.top = event.clientY + 'px';
        contextMenuOpen(menu);

    });
    hero.addEventListener('contextmenu', event => {
        event.preventDefault();
        event.stopPropagation();
        hideContextMenu ()

        const menu = document.querySelector('.context-menu.on-char');
        menu.classList.add('show');
        menu.style.left = event.clientX + 'px';
        menu.style.top = event.clientY + 'px';
        contextMenuOpen(menu);
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
    }

    function hideContextMenu (){
        const menus = document.querySelectorAll('.context-menu');
        for(let i = 0; i < menus.length; i++){
            menus[i].classList.remove('show');
        }
    }
    document.addEventListener('click', hideContextMenu);

    const navigateChar = {
        left(hero) {
        hero.style.left = hero.offsetLeft - step + 'px'; hero.style.transform = 'rotateY(180deg)';
        },
        right(hero) {
            hero.style.left = hero.offsetLeft + step + 'px'; hero.style.transform = '';
        },
        top(hero) {
            hero.style.top = hero.offsetTop - step + 'px'; hero.style.transform = 'rotateZ(-90deg)'
        },
        bottom(hero) {
            hero.style.top = hero.offsetTop + step + 'px'; hero.style.transform = 'rotateZ(90deg)'
        },
        sneak(hero) {
            hero.style.width = playerWidth * 1.15 + 'px'; hero.style.height = playerHeight * 0.6 + 'px'; 
            hero.style.top = hero.offsetTop + playerHeight * 0.4 + 'px';
        },
        jump(hero) {
        hero.style.transition = '.5s';
        let offsetTop = hero.offsetTop;
        hero.style.top = offsetTop - h + 'px';
        setTimeout(function(){
            hero.style.top = offsetTop + 'px';
            setTimeout(function(){
                hero.style.transition = '';},500)
        }, 500);
        }
    }
    
    const struct = {
    [KEY_LEFT]:()=>{navigateChar.left(hero)},
    [KEY_RIGHT]:()=>{navigateChar.right(hero)},
    [KEY_JUMP]:()=>{if(finishJump){ if(hero.clientHeight != playerHeight * 0.6 ){navigateChar.jump(hero); finishJump = false; setTimeout(function(){finishJump = true;},1000)}}},
    [KEY_ADD]:()=>{
        target.appendChild(hero)
        const menu = document.querySelector('.context-menu.on-doc');
        menu.appendChild(toRemove);
        toAdd.remove();
    },
    [KEY_REMOVE]:()=>{
        hero.remove();
        const menu = document.querySelector('.context-menu.on-doc');
        menu.appendChild(toAdd);
        toRemove.remove();
    },
    [KEY_CHANGE]:()=>{
            counter++;
            if (counter === imgSources.length) {
                counter = 0;
            }
            hero.src = imgSources[counter];
    },
    [KEY_RESET_POSITION]:()=>{
        hero.style.left = '46%';
        hero.style.top = '46%';
    }
}

    function moveHero (e) {
        if (!isBlockInWindow()) {
            return
        }

        switch(e.keyCode) {
            case 37:  navigateChar.left(hero); break;
            case 39:  navigateChar.right(hero); break;
            case 38: if(hero.clientHeight != playerHeight * 0.6 ){
                navigateChar.top(hero)}; break;
            case 40: if(hero.clientHeight != playerHeight * 0.6 ){
                navigateChar.bottom(hero)
                }; break;
            case 17: navigateChar.sneak(hero); break;
            case 32: if(finishJump){ if(hero.clientHeight != playerHeight * 0.6 ){navigateChar.jump(hero); finishJump = false; setTimeout(function(){finishJump = true;},1000)}}; break;
        }
    }

    function getUp (e) {
        switch(e.keyCode) {
            case 17: hero.style.width = playerWidth + 'px'; hero.style.height = playerHeight + 'px'; 
                hero.style.top = hero.offsetTop - playerHeight * 0.4 + 'px'; break;
        }
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


