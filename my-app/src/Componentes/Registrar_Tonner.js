import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col } from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'
  
export default class Registrar extends Component {

	/*-----------Validacion de datos-----------*/
	state={
		validated: false,
		impresoras: [],
		tonners:[],
		tonnerInsertar: {
			NumeroSerie:'',
			Marca:'',
			Color: '',
			ImpresoraCompatible:''
		}
	}

	handleSubmit(event) {
		event.preventDefault();
	    event.stopPropagation();
	    
	    const form = event.currentTarget;
	    if (form.checkValidity() === false) {
	    	console.log("Failed");
	    }
	    
	    this.setState({validated: true }) 
	}

	/*-------------base de datos Impresora y Tonner---------------*/
  	componentDidMount(){
		this.getImpresoras();
		this.getTonners();
	}

	/*------Obtener Datos Tonner------*/
	getTonners=_=>{
		fetch('/tonners')
		.then(response=>response.json())
		.then(response=>this.setState({tonners: response.data}))
		.catch(err=>console.error(err))
	}

	/*------Añadir Tonner------*/
	addTonner=_=>{
		const {tonnerInsertar}=this.state;
		if(tonnerInsertar.NumeroSerie!==''&&tonnerInsertar.NumeroInventario!==''&&tonnerInsertar.Marca!==''&&tonnerInsertar.ImpresoraCompatible!==''&&tonnerInsertar.ImpresoraCompatible!=='Seleccionar...'){
			
			var separador = " ", // un espacio en blanco
		    limite    = 2,
			arregloDeSubCadenas = tonnerInsertar.ImpresoraCompatible.split(separador, limite);
			
			fetch(`/tonners/add?NumeroSerie=${tonnerInsertar.NumeroSerie}&Marca=${tonnerInsertar.Marca}&Color=${tonnerInsertar.Color}&MarcaImpresora=${arregloDeSubCadenas[0]}&ModeloImpresora=${arregloDeSubCadenas[1]}`)
			.then(response2=>response2.json())
			.then(response2=>this.getTonners)
			.catch(err=>console.error(err))

			alert("Se guardó exitosamente")
			window.location.reload(true);
		}else{
			alert("Error al momento de guardar. Favor de verificar sus datos")
		}
	}	

	/*------Obtener Datos Impresora------*/
	getImpresoras=_=>{
		fetch('/impresoras')
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
	}
	renderImpresoras=({Id,Marca,Modelo})=><option key={Id}>{Marca} {Modelo}</option>

	render(){

		const {validated,impresoras,tonnerInsertar}=this.state;

		return (
			<Container className="container">

				<h1>Registrar Toner</h1>
				<Form noValidate validated={validated} onSubmit={e=>this.handleSubmit(e)}>
			      	<Form.Row>
			        	<Form.Group as={Col} controlId="validationCustom01">
			          		<Form.Label>Marca</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Marca"
			            		value={tonnerInsertar.Marca}
          						onChange={e => this.setState({ tonnerInsertar:{...tonnerInsertar,Marca:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>
			      	</Form.Row>

			      	<Form.Row>
			        	<Form.Group as={Col}  controlId="validationCustom02">
			          		<Form.Label>Serie Del Toner</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Serie Del Toner"
			            		value={tonnerInsertar.NumeroSerie}
          						onChange={e => this.setState({ tonnerInsertar:{...tonnerInsertar,NumeroSerie:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>
	   	
			      	</Form.Row>

			      	<Form.Row>
			      		<Form.Group as={Col}  controlId="validationCustom03">
			          		<Form.Label>Color</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Color"
			            		value={tonnerInsertar.Color}
          						onChange={e => this.setState({ tonnerInsertar:{...tonnerInsertar,Color:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>
			      	</Form.Row>

			      	<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState">
					      	<Form.Label>Impresora Compatible</Form.Label>
					      	<Form.Control as="select" required
          						onChange={e => this.setState({ tonnerInsertar:{...tonnerInsertar,ImpresoraCompatible:e.target.value} })}>
					      		<option value="">Seleccionar...</option>
					        	{impresoras.map(this.renderImpresoras)}
					      	</Form.Control>
							<Form.Control.Feedback type="invalid">
			            		Seleccione Una Opción
			          		</Form.Control.Feedback>
					    </Form.Group>
			      	</Form.Row>
	      	
			      	<Button className="boton" type="submit" onClick={this.addTonner}>Guardar Datos</Button>
			      	<Button className="boton" href="/Registrar_Impresora" type="submit">Registrar Impresora</Button>
			      	
			    </Form>
			</Container>
		);
	}
	
}