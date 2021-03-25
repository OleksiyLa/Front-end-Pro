window.addEventListener('load',()=>{
    const statusCheck = document.querySelector('#status-check');
    getData(statusCheck, '/data/status-check')
})

function getData(elem, get){
    fetch(get)
        .then(data=> data.json())
        .then(data=> {
            elem.innerHTML = JSON.stringify(data, null, '\t')
        })
        .catch('OOPS')
}