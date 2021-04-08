import React, {useState, useEffect} from 'react'

function Row({product, index, changeRow}) {
	const {id, price, name} = product;
	const [color, setColor] = useState(null);
	const [weight, setWeight] = useState(null);
	
	useEffect(() => {
			changeRow( id, setColor,setWeight);
	}, []);

	return (
		<tr key={`key-${index}`} style={{
			'color': color,
			'fontWeight': weight
		}}>
			<td >{id}</td>
			<td >{name}</td>
			<td >{price}$</td>
		</tr>
	)
}

export default Row;