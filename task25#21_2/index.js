// Написать промис, который будет запрашивать ввод с клавиатуры чисел (использовать тэг input, с очисткой после каждого ввода), которые сохранит в массив.
// Закончить запрос чисел необходимо тогда, когда закончится время. Время - 10 сек.
// После этого - выполнить операцию, которая выведет массив в консоль.
// * После нажатия на энтер - инпут очищается и дизейблится на 1 сек.

let boolToDisable = false;
const arr = [];
function arrayNumbers(arr, numberInput, delay){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            boolToDisable = true;
            numberInput.value = '';
            numberInput.disabled = true;
            arr.length > 0 ? resolve(arr) : reject('Array is empty. You are too late !!!');}, delay)
    })
}

function inputNumbers(numberInput, delay){
    return new Promise((resolve, reject) => {
            let inputNum = numberInput.value;
            numberInput.value = '';
            numberInput.disabled = true;
            setTimeout(()=>{boolToDisable ? numberInput.disabled = true : numberInput.disabled = false}, delay);
            if(!isNaN(inputNum) && !inputNum == '') {
                resolve(inputNum);
            } else {
                reject('Not a number');
            }
    })
}

window.addEventListener('load', ()=>{
    const numberInput = document.querySelector('#number');
    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 13 && !numberInput.disabled) {
            inputNumbers(numberInput, 1000)
            .then(data => parseInt(data))
            .then(data => {if(Number.isInteger(data)){
                return data
                } else {
                    throw new Error('Not a number');
                }
            })
            .then(data => arr.push(data))
            .catch(err => console.log(err))
        }
    });

    arrayNumbers(arr, numberInput, 10000)
    .then((data)=>{
        console.log(data);
    })
    .catch(err => console.log(err));
});