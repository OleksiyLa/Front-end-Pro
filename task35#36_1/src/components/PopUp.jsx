import { useDispatch, useSelector } from 'react-redux';

const PopUp  = ({style, selectedKey, setStyle}) => {
    const elements = useSelector(state => state.elements);
    const dispatch = useDispatch();
    const topLeft = {top: style.top, left: style.left}
    const click = (event) => {
        event.stopPropagation();
    }
    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            const myArray =  [...elements];
            if(e.target.dataset.select === 'height' && e.target.value > 0){
                console.log(typeof e.target.value)
                myArray[selectedKey] = {
                    ...myArray[selectedKey],
                    height: e.target.value + 'px'
                };
            } else if (e.target.dataset.select === 'width' && e.target.value > 0){
                myArray[selectedKey] = {
                    ...myArray[selectedKey],
                    width: e.target.value + 'px'
                };
            } else if (e.target.dataset.select === 'color'){
                myArray[selectedKey] = {
                    ...myArray[selectedKey],
                    background: e.target.value
                };
            }
            e.target.value = '';
            dispatch({
            type: 'view_elem',
            elements: myArray
            })
            setStyle(null)
        }
    }

    return (
            <div style={topLeft} className={'pop-up'} onClick={click}>
                <div className={'pop-up_line'}> Height: {style.height}</div>
                <input data-select='height' type='number' placeholder='edit height' onKeyDown={keyDownHandler}></input>
                <div className={'pop-up_line'}> Width: {style.width}</div>
                <input data-select='width' type='number' placeholder='edit width' onKeyDown={keyDownHandler}></input>
                <div className={'pop-up_line'}> Color: {style.background}</div>
                <input data-select='color' placeholder='edit color' onKeyDown={keyDownHandler}></input>
            </div>
    )
}

export default PopUp;