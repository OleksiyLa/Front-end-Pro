// Создать форму по отправке имени и возраста. 
// Сделать валидацию данных (в имени не может быть чисел, в возрасте - букв). 
// При успешной валидации сформировать отправку данных с формы на url `/registration`. Использовать метод POST.
// В результате ничего в ответе мы не должны получить (кроме ошибки 404).
// Суть задания - отправка данных с валидацией.

function request(xhrConfig = {}){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4 && xhrConfig.success){
            xhrConfig.success(xhr.responseText);
        }
    })
    xhr.open(xhrConfig.method, xhrConfig.url);
    xhr.send(JSON.stringify(xhrConfig.body));
}

window.addEventListener('load',()=>{
    const submitBtn = document.querySelector('#submit-btn');
    const nameInput = document.querySelector('#name')
    const ageInput = document.querySelector('#age')

    function login(body){
        request({
        method: 'POST',
        resource: `/registration`,
        success: data => {},
        body,
        })
    }
    const num = ["0","1","2","3","4","5","6","7","8","9"];
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const age = +ageInput.value;
        if (isNaN(age) || age == '' || age < 0 || !isNaN(name) || checkSymbols(name, num) != '') {
            console.log("Input is not valid");
        } else {
            const body = {name, age}
            login(body);
        }
    })

})

function checkSymbols(str, arrOfSymbols) {
    str = str.split('');
    let result = str.filter(char => arrOfSymbols.includes(char));
    return result.join('');
}