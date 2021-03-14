// fetch('/users?type=first')
// .then(resp => resp.json())
// .then(data => {
//     console.log(data);
//     document.body.innerHTML += data;
// });

let search_result, searchBtn, dataBtn, logText;

window.addEventListener('load', ()=>{
    search_result = document.querySelector('#search_result');
    searchBtn = document.querySelector('#search');
    logBtn = document.querySelector('#log_data');
    logText = document.querySelector('#log_result')
    searchBtn.addEventListener('click', onSearch);
    logBtn.addEventListener('click', getLogData);
})


function onSearch(){
    const userNameElem = document.querySelector('#userName');

    if(userNameElem.value.length > 2) {
        fetch(`/users/${userNameElem.value}`)
            .then(resp => resp.json())
            .then(data => {
                if(data.length){
                    search_result.value = data
                } else {
                    search_result.value = 'Empty'
                }
                
            })
    }
    userNameElem.value = '';
}

function getLogData(){
    fetch('/get/log')
        .then(resp => resp.text())
        .then(data => {
            if(data.length){
                logText.innerHTML = data;
            } else {
                logText.innerHTML = 'Empty';
            }
        })
}