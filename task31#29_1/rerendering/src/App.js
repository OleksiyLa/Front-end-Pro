import './App.css';
import ReactDOM from 'react-dom';
import './index.css';

const list = [ { id: 'i_20', price: 2300, name: 'Example_1' }, { id: 'i_10', price: 1100, name: 'Example_2' }, { id: 'i_120', price: 7300, name: 'Example_3' }, { id: 'i_240', price: 2340, name: 'Example_4' },{ id: 'i_202', price: 2300, name: 'Example_5' }, { id: 'i_130', price: 1100, name: 'Example_6' }, { id: 'i_1120', price: 7300, name: 'Example_7' }, { id: 'i_2240', price: 2340, name: 'Example_8' }];
const arrID = [];
for (let index = 0; index < list.length; index++) {
	arrID.push(list[index].id)
}
const arr = []

	const randomElementsFromArray = () => {
		const randEl = Math.floor(Math.random() * arrID.length);
		const result = arrID[randEl];
		arr.push(result)
		arrID.splice(randEl,1);
	}

const timeout = setInterval(() => {
	randomElementsFromArray();
	if(!arrID.length) {
		clearInterval(timeout)
	}
	tick()
}, 2000)


function App() {

	return (
		<div className="App">
			<table className="table" border={(arrID.length <= arr.length && arrID.length !== 0) ? 10 : ((!arrID.length) ? 20 : 0)}>
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
					<Row product={product} index={index} key={`key-${index}`} />
						)
					})
				}
				</tbody>
			</table>
		</div>
	);
}

function Row({product, index}) {
	const {id, price, name} = product;

	return (
		<tr key={`key-${index}`} style={{
			'color': arr.toString().includes(id) ? 'green' : '',
			'fontWeight': arr.toString().includes(id) ? '900' : ''
		}}>
			<td >{id}</td>
			<td >{name}</td>
			<td >{price}$</td>
		</tr>
	)
}

function tick(){
	ReactDOM.render(
		<App list={list}/>,
	document.getElementById('root')
	);
}


export default App;