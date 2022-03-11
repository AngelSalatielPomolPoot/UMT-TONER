import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col,Table,Modal} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'

export default class Mostrar extends Component {
	state={
		validated: false,
		tonners:[],
		impresoras:[],
		usuariosLike:[],
		tonnersUpdate: {
			IdBusqueda:'',
			NumeroSerie:'',
			Marca:'',
			Color:'',
			ImpresoraCompatible: '',			
		},
		show:false,
		setShow:false
	}

	setShow = (enable) => {
    	this.setState({show: enable})
    }  

	handleClose = () => this.setShow(false);
  	handleShow = (NumeroSerie) =>{ 
  		const {tonnersUpdate,tonners}=this.state;
  		tonnersUpdate.IdBusqueda=NumeroSerie;
  		this.setShow(true)
  		var tonner=tonners[0];

  		for (var i = 0; i<tonners.length;i++) {
  			tonner=tonners[i];
  			if(tonnersUpdate.IdBusqueda===tonner.NumeroSerie){
  				tonnersUpdate.NumeroSerie=tonner.NumeroSerie;
  				tonnersUpdate.Marca=tonner.Marca;
  				tonnersUpdate.Color=tonner.Color;
  				tonnersUpdate.ImpresoraCompatible=tonner.MarcaImpresora+' '+tonner.ModeloImpresora;	
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
		this.getImpresoras();
		this.getTonners();
	}

	getTonners=_=>{
		fetch('/tonners')
		.then(response=>response.json())
		.then(response=>this.setState({tonners: response.data}))
		.catch(err=>console.error(err))
	}

	getImpresoras=_=>{
		fetch('/impresoras')
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
	}

	updateTonners=_=>{
		const {tonnersUpdate}=this.state;
		
		if(tonnersUpdate.NumeroSerie!==''&&tonnersUpdate.NumeroInventario!==''&&tonnersUpdate.Marca!==''&&tonnersUpdate.ImpresoraCompatible!==''&&tonnersUpdate.ImpresoraCompatible!=='Seleccionar...'){
			var separador = " ", // un espacio en blanco
		    limite    = 2,
		    arregloDeSubCadenas = tonnersUpdate.ImpresoraCompatible.split(separador, limite);

			fetch(`/tonners/update?IdBusqueda=${tonnersUpdate.IdBusqueda}&NumeroSerie=${tonnersUpdate.NumeroSerie}&Marca=${tonnersUpdate.Marca}&Color=${tonnersUpdate.Color}&MarcaImpresora=${arregloDeSubCadenas[0]}&ModeloImpresora=${arregloDeSubCadenas[1]}`)
			.then(response2=>response2.json())
			.then(response2=>this.getTonners)
			.catch(err=>console.error(err))

			alert("Se guardó exitosamente")
			this.handleClose();
			this.getTonners();
		}else{

			alert("Error al momento de guardar. Favor de verificar sus datos")
		}	
	}

	deleteTonner=(NumeroSerie)=>{      
		fetch(`/tonners/delete?NumeroSerie=${NumeroSerie}`)
		.then(response4=>response4.json())
		.then(response4=>response4.data)
		.catch(err=>console.error(err))

		alert("Se eliminó exitosamente")
		this.getTonners();
    }

    renderImpresoras=({Id,Marca,Modelo})=><option key={Id}>{Marca} {Modelo}</option>

	renderTonners=({NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora})=>
					    <tr key={NumeroSerie}>
					    	<td>{NumeroSerie}</td>
					      	<td>{Marca}</td>
					      	<td>{Color}</td>
					      	<td>{MarcaImpresora}</td>
					      	<td>{ModeloImpresora}</td>
					      	<td><span className="table-remove"><Button className="btn btn-rounded btn-sm my-0 boton2" type="submit" 
					      	onClick={e=>this.handleShow(NumeroSerie)}>Editar</Button><Button id={NumeroSerie} type="submit"
			                  className="btn btn-danger btn-rounded btn-sm my-0" onClick={e =>this.deleteTonner(NumeroSerie)}>Eliminar</Button></span></td>
			            </tr>
						
	render(){
		const {validated,tonners,tonnersUpdate,impresoras,show}=this.state;

		return(
			<Container className="containerCaracteristicas">
				<h2>Ver Toner</h2>				
					<Table responsive="xl" striped bordered hover className="TablaCaracteristicas">
					  
					  	<thead>
						    <tr>
						      	<th>Numero de Serie</th>
						      	<th>Marca</th>
						      	<th>Color</th>
						      	<th>Marca de Impresora</th>
						      	<th>Modelo de Impresora</th>
						      	<th>Opciones</th>
						    </tr>
					  	</thead>
						<tbody>
							{tonners.map(this.renderTonners)}
						</tbody>
					</Table>

					<Modal show={show} onHide={this.handleClose}>
				        <Modal.Header closeButton>
				          	<Modal.Title><h1>Modificar Tonner</h1></Modal.Title>
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
						            		value={tonnersUpdate.Marca}
			          						onChange={e => this.setState({ tonnersUpdate:{...tonnersUpdate,Marca:e.target.value} })}
						          		/>
						          		<Form.Control.Feedback>Excelente</Form.Control.Feedback>
						          		<Form.Control.Feedback type="invalid">
						            		Campo Vacio
						          		</Form.Control.Feedback>
						        	</Form.Group>
				        
						      	</Form.Row>

						      	<Form.Row>
						        	<Form.Group as={Col}  controlId="validationCustom02">
						          		<Form.Label>Serie Del Tonner</Form.Label>
						          		<Form.Control
						            		required
						            		type="text"
						            		placeholder="Serie Del Tonner"
						            		value={tonnersUpdate.NumeroSerie}
			          						onChange={e => this.setState({ tonnersUpdate:{...tonnersUpdate,NumeroSerie:e.target.value} })}
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
						            		value={tonnersUpdate.Color}
			          						onChange={e => this.setState({ tonnersUpdate:{...tonnersUpdate,Color:e.target.value} })}
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
								      		value={tonnersUpdate.ImpresoraCompatible}
			          						onChange={e => this.setState({ tonnersUpdate:{...tonnersUpdate,ImpresoraCompatible:e.target.value} })}>
								      		<option value="">Seleccionar...</option>
								        	{impresoras.map(this.renderImpresoras)}
								      	</Form.Control>
								    </Form.Group>
						      	</Form.Row>						      	
						    </Form>
				        </Modal.Body>
				        <Modal.Footer>
				          	<Button variant="secondary" onClick={this.handleClose}>
				            	Cerrar
				          	</Button>
				          	<Button variant="primary" onClick={this.updateTonners}>
				            	Guardar Cambios
				          	</Button>
				        </Modal.Footer>
				    </Modal>
			</Container>
		);		
	}
}

