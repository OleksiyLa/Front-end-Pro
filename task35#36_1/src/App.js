import './App.css';
import CustomDivElem from './components/CustomDivElem';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from './components/PopUp';
import { useState } from 'react';

function randomColor() {
let r = Math.floor(Math.random() * 256);
let g = Math.floor(Math.random() * 256);
let b = Math.floor(Math.random() * 256);
return "rgb(" + r + ", " + g + ", " + b + ")";
}

let key;

function App() {

  const elements = useSelector(state => state.elements);
  const dispatch = useDispatch();
  const [style, setStyle] = useState(null)


  const clickOnScreen = (event) => {
    setStyle(null)
    dispatch({
      type: 'create_elem',
      element: {
        top: event.clientY,
        left: event.clientX,
        width: '100px',
        height: '100px',
        background: randomColor()
      }
    });
  }

  const clickOnElement = (event) => {
    event.stopPropagation();
    key = event.target.dataset.id;
    const myArray =  [...elements];
    setStyle({...myArray[key]})
  }

  const reset = (event) => {
    setStyle(null);
    event.stopPropagation();
    dispatch({
      type: 'reset_elem',
    })
  }

  const shake = (event) => {
    setStyle(null);
    event.stopPropagation();
    let myArray =  elements.map(element => {
        return {
          ...element,
          top: Math.floor((Math.random() * window.innerHeight) + 50),
          left: Math.floor((Math.random() * window.innerWidth) -50)
        }
      })
    dispatch({
      type: 'shake_elem',
      elements: myArray
    })
  }

  return (
    <div className="App" onClick={clickOnScreen}>
      <button onClick={reset}>Reset</button>
      <button onClick={shake}>Shake</button>
      {elements && elements.map((elem, index) => <CustomDivElem key={`id-${index}`} id={index} style={elem} onClick={clickOnElement}/>)}
      {style && <PopUp setStyle={setStyle} selectedKey={key} style={style} setStyle={setStyle}/>}
    </div>
  );
}

export default App;
