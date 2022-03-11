import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col,Table,Modal} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'


export default class Mostrar extends Component {
	
	state={
		validated: false,
		impresoras:[],
		impresorasUpdate: {
			IdBusqueda:'',
			Id:'',
			Marca:'',
			Modelo: '',	
			TipoImpresora:''		
		},
		show:false,
		setShow:false
	}

	componentDidMount(){
		this.getImpresoras();
	}

	setShow = (enable) => {
    	this.setState({show: enable})
    }  

    handleClose = () => this.setShow(false);
  	handleShow = (Id) =>{ 
  		const {impresorasUpdate,impresoras}=this.state;
  		impresorasUpdate.IdBusqueda=Id;
  		this.setShow(true)

  		var impresora=impresoras[0];

  		for (var i = 0; i<impresoras.length;i++) {
  			impresora=impresoras[i];
  			if(impresorasUpdate.IdBusqueda===impresora.Id){

  				impresorasUpdate.Id=Id;
  				impresorasUpdate.Marca=impresora.Marca;
  				impresorasUpdate.Modelo=impresora.Modelo;
				impresorasUpdate.TipoImpresora=impresora.TipoImpresora;
  				
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

	getImpresoras=_=>{
		fetch('/impresoras')
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
	}

	deleteImpresora=(Id)=>{      

		fetch(`/impresoras/delete?Id=${Id}`)
		.then(response4=>response4.json())
		.then(response4=>response4.data)
		.catch(err=>console.error(err))

		alert("Se Eliminó Exitosamente")
		this.getImpresoras();

    }

    /*------update------*/
	updateImpresoras=_=>{
		const {impresorasUpdate}=this.state;
		if(impresorasUpdate.Id!==''&&impresorasUpdate.Marca!==''&&impresorasUpdate.Modelo!==''&&impresorasUpdate.TipoImpresora!==''){

			fetch(`/impresoras/update?IdBusqueda=${impresorasUpdate.IdBusqueda}&Id=${impresorasUpdate.Id}&Marca=${impresorasUpdate.Marca}&Modelo=${impresorasUpdate.Modelo}&TipoImpresora=${impresorasUpdate.TipoImpresora}`)
			.then(response2=>response2.json())
			.then(response2=>this.getImpresoras)
			.catch(err=>console.error(err))

			alert("Se guardó Exitosamente")
			this.handleClose();
			this.getImpresoras();
		}else{
			alert("Error al momento de guardar. Favor de verificar sus datos")
		}
		
	}


	renderImpresoras=({Id,Marca,Modelo,TipoImpresora})=>
					    <tr key={Id}>
					      	<td>{Marca}</td>
					      	<td>{Modelo}</td>
							<td>{TipoImpresora}</td>
					      	<td><span className="table-remove"><Button className="btn btn-rounded btn-sm my-0 boton2" type="submit" 
					      	onClick={e=>this.handleShow(Id)}>Editar</Button><Button id={Id} type="submit"
			                  className="btn btn-danger btn-rounded btn-sm my-0" onClick={e =>this.deleteImpresora(Id)}>Eliminar</Button></span></td>
			            </tr>



	render(){

		const {validated,impresorasUpdate,impresoras,show}=this.state;

		return(
			<Container className="containerCaracteristicas">
				<h2>Ver Impresoras</h2>
			

					<Table responsive="xl" striped bordered hover className="TablaCaracteristicas">
					  
					  	<thead>
					    	<tr>
							    <th>Marca</th>
							    <th>Modelo de Impresora</th>
								<th>Tipo de Impresoras</th>
							    <th>Opciones</th>
					  	  	</tr>
					  	</thead>

					  	<tbody>
					  		{impresoras.map(this.renderImpresoras)}

					  	</tbody>
					</Table>


					<Modal show={show} onHide={this.handleClose}>
				        <Modal.Header closeButton>
				          	<Modal.Title><h1>Modificar Impresoras</h1></Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				        	
				        	
							<Form noValidate validated={validated} onSubmit={e=>this.handleSubmit(e)}>
						      	<Form.Row>
						        	<Form.Group as={Col} controlId="validationCustom01">
						          		<Form.Label>Marca</Form.Label>
						          		<Form.Control
						            		required
						            		type="text"
						            		placeholder="Marca"
						            		value={impresorasUpdate.Marca}
			          						onChange={e => this.setState({ impresorasUpdate:{...impresorasUpdate,Marca:e.target.value} })}
						          		/>
						          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
						          		<Form.Control.Feedback type="invalid">
						            		Campo Vacio
						          		</Form.Control.Feedback>
						        	</Form.Group>
						      	</Form.Row>
							</Form>

							<Form>
						      	<Form.Row>
						        	<Form.Group as={Col}  controlId="validationCustom02">
						          		<Form.Label>Modelo</Form.Label>
						          		<Form.Control
						            		required
						            		type="text"
						            		placeholder="Modelo"
						            		value={impresorasUpdate.Modelo}
			          						onChange={e => this.setState({ impresorasUpdate:{...impresorasUpdate,Modelo:e.target.value} })}
						          		/>
						          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
						          		<Form.Control.Feedback type="invalid">
						            		Campo Vacio
						          		</Form.Control.Feedback>
						        	</Form.Group>
						      	</Form.Row>
						   	</Form>

							<Form.Row>
								<Form.Group as={Col} controlId="formGridState3">
									<Form.Label>Tipo de Impresora</Form.Label>
									<Form.Control 
										as="select" 
										required
										value={impresorasUpdate.TipoImpresora}
										onChange={e => this.setState({ impresorasUpdate:{...impresorasUpdate,TipoImpresora:e.target.value} })}>
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


				        </Modal.Body>
				        <Modal.Footer>
				          	<Button variant="secondary" onClick={this.handleClose}>
				            	Cerrar
				          	</Button>
				          	<Button variant="primary" onClick={this.updateImpresoras}>
				            	Guardar Cambios
				          	</Button>
				        </Modal.Footer>
				    </Modal>
			   
			</Container>
		);		

	
	}
}

