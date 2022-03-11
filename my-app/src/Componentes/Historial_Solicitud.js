import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'


export default class Historial extends Component {
	

	state={
		valor:'',
		nombreBusqueda:'Tipo Pedido',
		TipoBusqueda: 1,
		validated: false,
		historiales: []
	}

	componentDidMount(){
		this.getHistoriales();
	}

	setValor = (e) => {
    	this.setState({valor: e})
    	this.getHistoriales();
    }  

	getHistoriales=_=>{
		fetch('/historiales')
		.then(response=>response.json())
		.then(response=>this.setState({historiales: response.data}))
		.catch(err=>console.error(err))
	}

	renderHistoriales=({IdPedido,NombreUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido})=>
					    <tr key={IdPedido}>
					      	<td>{NombreUsuario}</td>
							<td>{MarcaImpresora}</td>
					      	<td>{ModeloImpresora}</td>
							<td>{Codigo}</td>
					      	<td>{SerieTinta}</td>
					      	<td>{Color}</td>
					      	<td>{Cantidad}</td>
					      	<td>{TipoPedido}</td>
					    </tr>

	render(){

		const {historiales}=this.state;
		return(
			<Container className="containerCaracteristicas">
				<h2>Historial de solicitudes</h2>
					
 
					<Table responsive="xl" striped bordered hover className="TablaCaracteristicas">
					  
				  	<thead>
				   		<tr>
				      		<th>Usuario</th>
							<th>Marca Impresora</th>
					      	<th>Modelo Impresora</th>
							<th>Codigo UADY</th>
					      	<th>Toner</th>
					      	<th>Color</th>
					      	<th>Cantidad</th>
					      	<th>Tipo de Pedido</th>
					    </tr>
					</thead>

					<tbody>
						{historiales.map(this.renderHistoriales)}
					  </tbody>
					</Table>

			</Container>
		);		

	}
	

}

