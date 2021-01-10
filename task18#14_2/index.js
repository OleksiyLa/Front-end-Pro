window.addEventListener('load', function() {
    const greenBlock = document.querySelector('#green-block');
    const redBlock = document.querySelector('#red-block');
    const sumBlock = document.querySelector('#sum-block');
    const range = document.querySelector('#range');
    const num = document.querySelector('#number');
    const bar = document.querySelector('.bar');
    const changeNumIput = changeIput(num, range);
    const changeRangeIput = changeIput(range, num);

    function changeIput (val1, val2) {
            return function () {
            val1.value = val2.value;
            bar.style.height = range.value + 'px';
            redBarPercent ();
            rangeForTypingANum ();
            NumsOnScreen ();
            }
    }
    function rangeForTypingANum () {
        if (num.value > 100) {
        num.value = 100;
        } else if (num.value < 0) {
        num.value = 0;
        }
    }
    function NumsOnScreen () {
        greenBlock.innerHTML = range.value;
        redBlock.innerHTML = parseFloat(bar.style.borderTopWidth);
        sumBlock.innerHTML = +range.value + parseFloat(bar.style.borderTopWidth);
    }
    
    function redBarPercent () {
        if (range.value < 20 ) {
            bar.style.borderTopWidth = (range.value * 0.02) + 'px';
        } else if (range.value < 50) {
            bar.style.borderTopWidth = (range.value * 0.04) + 'px';
        } else if (range.value < 75) {
            bar.style.borderTopWidth = (range.value * 0.06) + 'px';
        } else if (range.value <= 100) {
            bar.style.borderTopWidth = (range.value * 0.08) + 'px';
        }
    }

    range.addEventListener('input', changeNumIput);
    num.addEventListener('input', changeRangeIput);
    
});