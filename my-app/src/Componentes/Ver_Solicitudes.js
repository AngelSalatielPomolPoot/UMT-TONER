import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Form,Col} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'
import TablaToner from './Ver_Solicitudes_ListaToner'
import TablaGeneral from './Ver_Solicitudes_General'
import TablaFacultad from './Ver_Solicitudes_Facultad'
import autoTable from 'jspdf-autotable'

export default class Mostrar extends Component {
	
	state={
		valor:'',
		tablaVisible:'tonner',
		nombreBusqueda:'Tipo Pedido',
		TipoBusqueda: '1',
		validated: false,
		solicitudes: [],
		historiales: []
	}


    renderTabla(){
    	const {TipoBusqueda}=this.state;

    	if (TipoBusqueda==='1') {
    		return (<TablaGeneral/>)
		}
		else{
    		if(TipoBusqueda==='2'){
    			return(<TablaToner/>)
			}
			else{
    			if(TipoBusqueda==='3'){
    				return(<TablaFacultad/>)
    			}
    		}
    	}
    }

	render(){


		return(

			<Container className="containerCaracteristicas">
				<h2>Ver solicitudes</h2>

				<Form>
					<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState">
					      	<Form.Label>Mostrar Por: </Form.Label>
					      	<Form.Control as="select"
          						onChange={e =>{this.setState({TipoBusqueda:e.target.value})}}>
					        	<option value='1'>General</option>
					        	<option value='2'>Listado Por Toner</option>
					        	<option value='3'>Facultad</option>
					      	</Form.Control>
					    </Form.Group>
			      	</Form.Row>
			    </Form>

				{this.renderTabla()}

			</Container>
			

		);		

	}
	

}

