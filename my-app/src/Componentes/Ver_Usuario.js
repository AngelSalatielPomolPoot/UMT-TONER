import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col,Table,Modal} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'


export default class Mostrar extends Component  {
	
	state={
		startDate: new Date(), /*DATE PICKER*/
		validated: false,
		usuarios: [],
		impresoras:[],
		usuariosLike:[],
		usuarioUpdate: {
			Id:'',
			Nombre:'',
			PrimerApellido:'',
			SegundoApellido: '',
			Facultad:'',
			Correo: '',
			Impresora:'',
			
		},
		show:false,
		setShow:false
	}

	setShow = (enable) => {
    	this.setState({show: enable})
    }  

    handleClose = () => this.setShow(false);
  	
  	handleShow = (Id) =>{ 
  		const {usuarioUpdate,usuarios}=this.state;
  		this.setShow(true)

  		var usuario=usuarios[0];

  		for (var i = 0; i<usuarios.length;i++) {
  			usuario=usuarios[i];
  			if(Id===usuario.Id){

  				usuarioUpdate.Id=usuario.Id;
  				usuarioUpdate.Nombre=usuario.Nombre;
  				usuarioUpdate.PrimerApellido=usuario.PrimerApellido;
  				usuarioUpdate.SegundoApellido=usuario.SegundoApellido;
  				usuarioUpdate.Facultad=usuario.Facultad;
  				usuarioUpdate.Correo=usuario.Correo;
  				usuarioUpdate.Impresora=usuario.MarcaImpresora +' '+usuario.ModeloImpresora;
  				
  			}
  		}
  	};

  	handleSubmit(event) {
		event.preventDefault();
	    event.stopPropagation();
	    
	    const form = event.currentTarget;
	    if (form.checkValidity() === false) {
	    	console.log("Failed");
	    }

	    this.setState({validated: true }) 
	}

	componentDidMount(){
		this.getUsuarios();
		this.getImpresoras();
	}

	getUsuarios=_=>{
		fetch('/usuarios')
		.then(response=>response.json())
		.then(response=>this.setState({usuarios: response.data}))
		.catch(err=>console.error(err))
	}

	getImpresoras=_=>{
		fetch('/impresoras')
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
	}

	deleteUsuario=(Id)=>{     

		fetch(`/usuarios/delete?Id=${Id}`)
		.then(response4=>response4.json())
		.then(response4=>response4.data)
		.catch(err=>console.error(err))

		alert("Se eliminó exitosamente")

		this.getUsuarios();

    }

    uptateUsuario=_=>{
		const {usuarioUpdate}=this.state;

		if(usuarioUpdate.Nombre!=='' && usuarioUpdate.PrimerApellido!==''  && usuarioUpdate.SegundoApellido!==''  && usuarioUpdate.Facultad!==''&& usuarioUpdate.Facultad!=='Seleccionar...' && usuarioUpdate.Correo!=='' && usuarioUpdate.ImpresoraUsuario!=='' && usuarioUpdate.ImpresoraUsuario!=='Seleccionar...'){


			var separador= " ", // un espacio en blanco
		    limite= 2,
		    arregloDeSubCadenas = usuarioUpdate.Impresora.split(separador, limite);

			fetch(`/usuarios/update?IdBusqueda=${usuarioUpdate.Id}&Nombre=${usuarioUpdate.Nombre}&PrimerApellido=${usuarioUpdate.PrimerApellido}&SegundoApellido=${usuarioUpdate.SegundoApellido}&Facultad=${usuarioUpdate.Facultad}&Correo=${usuarioUpdate.Correo}&MarcaImpresora=${arregloDeSubCadenas[0]}&ModeloImpresora=${arregloDeSubCadenas[1]}`)
			.then(response2=>response2.json())
			.then(response2=>this.getUsuarios)
			.catch(err=>console.error(err))

			alert("Se guardó Exitosamente")
			this.handleClose();
			this.getUsuarios();
		}else{
			alert("Error al momento de guardar. Favor de verificar sus datos")
		}
		
	}

	renderImpresoras=({Id,Marca,Modelo})=><option key={Id}>{Marca} {Modelo}</option>
	renderUsuarios=({Id,Nombre,PrimerApellido,SegundoApellido,Facultad,Correo,MarcaImpresora,ModeloImpresora})=>
						<tr key={Id}>
					    	<td>{Id}</td>
					      	<td>{Nombre}</td>
					      	<td>{PrimerApellido}</td>
					      	<td>{SegundoApellido}</td>
					      	<td>{Facultad}</td>
					      	<td>{Correo}</td>
					      	<td>{MarcaImpresora}</td>
					      	<td>{ModeloImpresora}</td>
					      	<td><span className="table-remove"><Button className="btn btn-rounded btn-sm my-0 boton2" type="submit" 
					      	onClick={e=>this.handleShow(Id)}>Editar</Button><Button id={Id} type="submit"
			                  className="btn btn-danger btn-rounded btn-sm my-0" onClick={e =>this.deleteUsuario(Id)}>Eliminar</Button></span></td>
			            </tr>

	render(){

		const {validated,usuarios,usuarioUpdate,impresoras,show}=this.state;

		return(
			<Container className="containerCaracteristicas">
				<h2>Ver Usuario</h2>
				

					<Table responsive="xl" striped bordered hover className="TablaCaracteristicas">
					  
					  	<thead>
						    <tr>
						      	<th>Id</th>
						      	<th>Nombre</th>
						      	<th>Primer Apellido</th>
						      	<th>Segundo Apellido</th>
						      	<th>Facultad</th>
						      	<th>Correo</th>
						      	<th>Marca de Impresora</th>
						      	<th>Modelo de Impresora</th>
						      	<th>Opciones</th>
						    </tr>
					  	</thead>

					  	<tbody>
					  		{usuarios.map(this.renderUsuarios)}
					  	</tbody>
					</Table>

					<Modal show={show} onHide={this.handleClose}>
				        <Modal.Header closeButton>
				          	<Modal.Title><h1>Modificar Usuario</h1></Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				        	
				        	
							<Form noValidate validated={validated} onSubmit={e=>this.handleSubmit(e)}>


						      	<Form.Row>
						        	<Form.Group as={Col} controlId="validationCustom01">
						          		<Form.Label>Nombre</Form.Label>
						          		<Form.Control
						            		required
						            		type="text"
						            		placeholder="Nombre"
						            		value={usuarioUpdate.Nombre}
			          						onChange={e => this.setState({ usuarioUpdate:{...usuarioUpdate,Nombre:e.target.value} })}
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
						            		value={usuarioUpdate.PrimerApellido}
			          						onChange={e => this.setState({ usuarioUpdate:{...usuarioUpdate,PrimerApellido:e.target.value} })}
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
						            		value={usuarioUpdate.SegundoApellido}
			          						onChange={e => this.setState({ usuarioUpdate:{...usuarioUpdate,SegundoApellido:e.target.value} })}
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
								      		value={usuarioUpdate.Facultad}
			          						onChange={e => this.setState({ usuarioUpdate:{...usuarioUpdate,Facultad:e.target.value} })}>
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
							            		value={usuarioUpdate.Correo}
			          							onChange={e => this.setState({ usuarioUpdate:{...usuarioUpdate,Correo:e.target.value} })}
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
								      	<Form.Control as="select" required value={usuarioUpdate.Impresora}
			          						onChange={e => this.setState({ usuarioUpdate:{...usuarioUpdate,Impresora:e.target.value} })}>
								      		<option value="">Seleccionar...</option>
								        	{impresoras.map(this.renderImpresoras)}
								      	</Form.Control>
								    </Form.Group>
						      	</Form.Row>

						      	</Form.Group>
						  
						    </Form>


				        </Modal.Body>
				        <Modal.Footer>
				          	<Button variant="secondary" onClick={this.handleClose}>
				            	Cerrar
				          	</Button>
				          	<Button variant="primary" onClick={this.uptateUsuario}>
				            	Guardar Cambios
				          	</Button>
				        </Modal.Footer>
				    </Modal>

			</Container>
		);		
	}

	

}

