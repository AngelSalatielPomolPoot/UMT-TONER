import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap//dist/css/bootstrap.min.css'
  
export default class Registrar extends Component{

	state={
		startDate: new Date(), /*DATE PICKER*/
		validated: false,
		usuarios: [],
		impresoras: [],
		usuarioInsertar: {
			Nombre:'',
			PrimerApellido:'',
			SegundoApellido: '',
			Facultad:'',
			Correo: '',
			ImpresoraUsuario:''
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

	/*-------------base de datos Impresora---------------*/

	componentDidMount(){
		this.getUsuarios();
		this.getImpresoras();
	}

	/*------Obtener Datos------*/
	getUsuarios=_=>{
		fetch('/usuarios')
		.then(response=>response.json())
		.then(response=>this.setState({usuarios: response.data}))
		.catch(err=>console.error(err))
	}

	/*------Añadir------*/
	addUsuario=_=>{
		const {usuarioInsertar}=this.state;

		if(usuarioInsertar.Nombre!=='' && usuarioInsertar.PrimerApellido!==''  && usuarioInsertar.SegundoApellido!==''  && usuarioInsertar.Facultad!==''&& usuarioInsertar.Facultad!=='Seleccionar...' && usuarioInsertar.Correo!=='' && usuarioInsertar.ImpresoraUsuario!=='' && usuarioInsertar.ImpresoraUsuario!=='Seleccionar...'){


			var separador = " ", // un espacio en blanco
		    limite    = 2,
		    arregloDeSubCadenas = usuarioInsertar.ImpresoraUsuario.split(separador, limite);

			fetch(`/usuarios/add?Nombre=${usuarioInsertar.Nombre}&PrimerApellido=${usuarioInsertar.PrimerApellido}&SegundoApellido=${usuarioInsertar.SegundoApellido}&Facultad=${usuarioInsertar.Facultad}&Correo=${usuarioInsertar.Correo}&MarcaImpresora=${arregloDeSubCadenas[0]}&ModeloImpresora=${arregloDeSubCadenas[1]}`)
			.then(response=>response.json())
			.then(response=>this.getUsuarios)
			.catch(err=>console.error(err))

			alert("Se guardó Exitosamente")
			window.location.reload(true);
		}else{
			alert("Error al momento de guardar. Favor de verificar sus datos")
		}
		
	}

	getImpresoras=_=>{
		fetch('/impresoras')
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
	}

	renderUsuarios=({Id,Nombre,PrimerApellido,SegundoApellido})=><div key={Id}><p>Nombre:{Nombre} <br/> Apellido: {PrimerApellido} {SegundoApellido}</p></div>

	renderImpresoras=({Id,Marca,Modelo,TipoImpresora})=><option key={Id}>{Marca} {Modelo}</option>

	render(){

		const {validated,usuarioInsertar,impresoras}=this.state;

		return (
			<Container className="container">

				<h1>Registrar Usuario</h1>
				<Form noValidate validated={validated} onSubmit={e=>this.handleSubmit(e)}>
			      	<Form.Row>
			        	<Form.Group as={Col} controlId="validationCustom01">
			          		<Form.Label>Nombre</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Nombre"
			            		value={usuarioInsertar.Nombre}
          						onChange={e => this.setState({ usuarioInsertar:{...usuarioInsertar,Nombre:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>

			       	 	
		        
			      	</Form.Row>

			      	<Form.Row>
			        	<Form.Group as={Col}  controlId="validationCustom02">
			          		<Form.Label>Primer Apellido</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Primer Apellido"
			            		value={usuarioInsertar.PrimerApellido}
          						onChange={e => this.setState({ usuarioInsertar:{...usuarioInsertar,PrimerApellido:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>

			        	<Form.Group as={Col}  controlId="validationCustom03">
			          		<Form.Label>Segundo Apellido</Form.Label>
			          		<Form.Control
			            		required
			            		type="text"
			            		placeholder="Segundo Apellido"
			            		value={usuarioInsertar.SegundoApellido}
          						onChange={e => this.setState({ usuarioInsertar:{...usuarioInsertar,SegundoApellido:e.target.value} })}
			          		/>
			          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
			        	</Form.Group>
			      	</Form.Row>

			      	<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState">
					      	<Form.Label>Facultad</Form.Label>
					      	<Form.Control as="select" required
          						onChange={e => this.setState({ usuarioInsertar:{...usuarioInsertar,Facultad:e.target.value} })}>
					        	<option value="">Seleccionar...</option>
					        	<option>Facultad De Contaduría</option>
					        	<option>Facultad De Educación</option>
					        	<option>Facultad De Enfermería</option>
					        	<option>Facultad De Matemáticas</option>
								<option>UMT</option>
					      	</Form.Control>
					    </Form.Group>
			      	</Form.Row>

			      	<Form.Row>
			        	<Form.Group as={Col} controlId="validationCustom05">
				          	<Form.Label>Correo</Form.Label>
				          	<Form.Control
				            		required
				            		type="text"
				            		placeholder="Correo"
				            		value={usuarioInsertar.Correo}
          							onChange={e => this.setState({ usuarioInsertar:{...usuarioInsertar,Correo:e.target.value} })}
				          	/>
				          	<Form.Control.Feedback>Excelente</Form.Control.Feedback>
				          	<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
				        </Form.Group>
			      	</Form.Row>

			      	<Form.Group>
			        	
			      	<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState">
					      	<Form.Label>Impresora Adquirida</Form.Label>
					      	<Form.Control as="select" required
          						onChange={e => this.setState({ usuarioInsertar:{...usuarioInsertar,ImpresoraUsuario:e.target.value} })}>
					      		<option value="">Seleccionar...</option>
					        	{impresoras.map(this.renderImpresoras)}
					      	</Form.Control>
					    </Form.Group>
			      	</Form.Row>


			      	</Form.Group>
			      	<Button type="submit" onClick={this.addUsuario} >Guardar Datos</Button>
			    </Form>
	
			</Container>
		);
	}
	
}