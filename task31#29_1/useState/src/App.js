import './App.css';
import Row from './Row'
import {useState, useEffect} from 'react'

const list = [ { id: 'i_20', price: 2300, name: 'Example_1' }, { id: 'i_10', price: 1100, name: 'Example_2' }, { id: 'i_120', price: 7300, name: 'Example_3' }, { id: 'i_240', price: 2340, name: 'Example_4' },{ id: 'i_202', price: 2300, name: 'Example_5' }, { id: 'i_130', price: 1100, name: 'Example_6' }, { id: 'i_1120', price: 7300, name: 'Example_7' }, { id: 'i_2240', price: 2340, name: 'Example_8' }];
const arrID = [];
for (let index = 0; index < list.length; index++) {
	arrID.push(list[index].id)
}
const arr = []



function App({list}) {
	const [border, setBorder] = useState(0)
	

	useEffect(()=>{
		intervalRec()
	}, [])


	const randomElementsFromArray = () => {
		const randEl = Math.floor(Math.random() * arrID.length);
		const result = arrID[randEl];
		arr.push(result)
		arrID.splice(randEl,1);
	}

	function intervalRec () {
		const timeout = setInterval(() => {
		randomElementsFromArray();
			if(!arrID.length) {
				clearInterval(timeout)
			}
		}, 2000)
	}




	const changeRow = ( id, func1, func2)=>{
		const timeout = setInterval(() => {
		if (arr.toString().includes(id)) {
			func1('green');
			func2('900');
			if(arrID.length <= arr.length && arrID.length !== 0){
				setBorder('10px')
			}
			if(!arrID.length) {
				setBorder('20px') 
				clearInterval(timeout)
			}
		}
		}, 2000);
	}

	return (
		<div className="App">
			<table className="table" border={border}>
			<thead>
				<tr>
				<th>ID</th>
				<th>Product</th>
				<th>PRICE</th>
				</tr>
			</thead>
				<tbody>
				{list.map((product, index) => {
				return (
					<Row product={product} index={index} changeRow={changeRow} key={`key-${index}`} />
						)
					})
				}
				</tbody>
			</table>
		</div>
	);
}

export default App;