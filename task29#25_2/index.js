window.addEventListener('load',()=>{
    const statusCheck = document.querySelector('#status-check');
    const dataGet = document.querySelector('#data-get');
    getData(statusCheck, '/data/status-check')
    getData(dataGet, '/data/get')
})

function getData(elem, get){
    fetch(get)
        .then(data=> data.json())
        .then(data=> {
            elem.innerHTML = JSON.stringify(data, null, '\t')
        })
        .catch('OOPS')
}