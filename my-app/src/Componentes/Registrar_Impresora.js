import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col } from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'


export default class Registrar extends Component {
	
	state={
		validated: false,
		impresoras: [],
		impresoraInsertar: {
			Id:'',
			Marca:'',
			Modelo:'',
			TipoImpresora:''
		}
	}

	handleSubmit(event) {
    	event.preventDefault();
    	event.stopPropagation();

    	const form = event.currentTarget;
      	if (form.checkValidity() === false) {
        	console.log("Failed");
      	}
        
        this.setState({validated: true})
  	}

  	/*-------------base de datos Impresora---------------*/
  	componentDidMount(){
		this.getImpresoras();
	}
	/*------Obtener Datos------*/
	getImpresoras=_=>{
		fetch('/impresoras')
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
	}
	
	/*------Añadir------*/
	addImpresora=_=>{
		const {impresoraInsertar}=this.state;
		if(impresoraInsertar.TipoImpresora!==''&&impresoraInsertar.Marca!==''&&impresoraInsertar.Modelo!==''){
			fetch(`/impresoras/add?Id=${impresoraInsertar.Id}&Marca=${impresoraInsertar.Marca}&Modelo=${impresoraInsertar.Modelo}&TipoImpresora=${impresoraInsertar.TipoImpresora}`)
			.then(response=>response.json())
			.then(response=>this.getImpresoras)
			.catch(err=>console.error(err))

			alert("Se guardó exitosamente");
			window.location.reload(true);
		}else{
			alert("Error al momento de guardar. Favor de verificar sus datos")
		}	
		
	}

	/*---------------------------------------------------------------------*/

	render(){

		const {validated,impresoraInsertar}=this.state;

		return (
			<Container className="container">

				<h1>Registrar Impresora</h1>
				<Form noValidate validated={validated} onSubmit={e=>this.handleSubmit(e)}>
			      	<Form.Row>
			        	<Form.Group as={Col} controlId="validationCustom01">
			          		<Form.Label>Marca</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Marca"
			            		value={impresoraInsertar.Marca}
          						onChange={e => this.setState({ impresoraInsertar:{...impresoraInsertar,Marca:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>
			      	</Form.Row>

			      	<Form.Row>
			        	<Form.Group as={Col}  controlId="validationCustom02">
			          		<Form.Label>Modelo</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Modelo"
			            		value={impresoraInsertar.Modelo}
          						onChange={e => this.setState({ impresoraInsertar:{...impresoraInsertar,Modelo:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>
			      	</Form.Row>

			      	<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState3">
					      	<Form.Label>Tipo de Impresora</Form.Label>
							  <Form.Control 
								as="select" 
								required
					      		value={impresoraInsertar.TipoImpresora}
          						onChange={e => this.setState({ impresoraInsertar:{...impresoraInsertar,TipoImpresora:e.target.value} })}>
					        	<option value="">Seleccionar...</option>
					        	<option>Laser Negro</option>
					        	<option>Laser Color</option>
								<option>Inyección</option>
					      	</Form.Control>
							<Form.Control.Feedback type="invalid">
			            		Seleccione Una Opción
			          		</Form.Control.Feedback>
					    </Form.Group>
			      	</Form.Row>

			      	<Button className="boton2" type="submit"  onClick={this.addImpresora}  >Guardar Datos</Button>
			      	<Button className="boton" href="/Registrar_Tonner" type="submit">Registrar Toner</Button>
			    </Form>


			</Container>
		);
	}

}

