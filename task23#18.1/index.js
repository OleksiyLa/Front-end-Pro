class Block {
    constructor(name, id, background, clearBtn){
        this.name = name;
        this.id = id;
        this.count = Block.Storage[this.id] ? Block.Storage[this.id].count : 0;
        this.background = background;
        this.blocksContainer = document.querySelector('#blocks');
        this.clearBtn = clearBtn;
        this.renderAll();
    }
    static Storage = JSON.parse(localStorage.getItem('blocks')) || {};

    static randColor() {
        let rgb = []
        for(let i = 0; i < 3; i++){
            rgb.push(Math.floor(Math.random() * 256));
        };
        return `rgb(${rgb.join(', ')})`;
    }

    renderAll(){
        const divInBlocks = document.createElement('div');
        divInBlocks.setAttribute("data-id", this.id);
        divInBlocks.setAttribute('class', 'block');
        divInBlocks.innerHTML = `
            ${this.name}<span class="count" data-id="${this.id}">${this.count}</span>
            <button class="block-button" data-id="${this.id}">Click</button>
            </div> 
        `;
        this.blocksContainer.append(divInBlocks);
        const button = divInBlocks.querySelector('.block-button');
        divInBlocks.style.background = Block.Storage[this.id] ? Block.Storage[this.id].background : this.background;
        button.addEventListener('click', ()=>{
            this.countAdd(divInBlocks)
        }
        );
        this.clearBtn.addEventListener('click', ()=>{
            this.clearAllBtn(divInBlocks);
        });
    }

    renderCount = () => {
        const renderCount = document.querySelector(`.count[data-id="${this.id}"]`);
        renderCount.innerHTML = this.count;
    }

    countAdd = (divInBlocks) => {
        this.count++;
        this.renderCount();
        if(this.count < 50) {
            let randColorStorage = Block.randColor();
            divInBlocks.style.background = randColorStorage;
            if(!Block.Storage[this.id]){
                Block.Storage[this.id] = {};
            }
            Block.Storage[this.id].background = randColorStorage;
        } else {
            divInBlocks.style.background = this.background;
            Block.Storage[this.id].background = this.background;
        }
        Block.Storage[this.id].count = this.count;
        localStorage.setItem('blocks', JSON.stringify(Block.Storage));
    }
    clearAllBtn = (divInBlocks) => {
        localStorage.clear();
        Block.Storage = {};
        this.count = 0;
        divInBlocks.style.background = this.background;
        this.renderCount();
    }
}


window.addEventListener('load', () => {
    const clearAll = document.querySelector('#btn-clear_all');
    const setCounter = document.querySelector('#set-counter-by-id');
    const blocksArray = [
        new Block('Counter 1: ', 'id-1', "aquamarine", clearAll),
        new Block('Counter 2: ', 'id-2', "aquamarine", clearAll)
    ];

    setCounter.addEventListener('click', setCounterById);

    function setCounterById(){
        let id = prompt('Type id');
        let randColorStorage = Block.randColor();
        let block = document.querySelector(`.block[data-id="${id}"]`);
        let obj = blocksArray.find(item => item.id == id);
        let count;
        if(obj) {
            count = +prompt('Set Counter');
        } else {
            alert('Not correct id');
            return
        }
        if(!(Number.isInteger(count))) {
            alert('Not an integer');
            return
        }
        if(!(count < 0)) {
            obj.count = count
            obj.renderCount();
        } else {
            alert('Number cannot be negative');
            return
        }
        if(!Block.Storage[id]){
            Block.Storage[id] = {};
        }
        if(obj.count >= 50) {
            block.style.background = obj.background;
            Block.Storage[id].background = obj.background;
        } else if(obj.count == 0) {
            block.style.background = obj.background;
            delete Block.Storage[id];
        } else {
            block.style.background = randColorStorage;
            Block.Storage[id].background = randColorStorage;
        }
        if(Block.Storage[id]){
            Block.Storage[id].count = obj.count;
        }
        if(Object.keys(Block.Storage).length === 0){
            localStorage.clear();
        } else {
            localStorage.setItem('blocks', JSON.stringify(Block.Storage))
        }
    }
});