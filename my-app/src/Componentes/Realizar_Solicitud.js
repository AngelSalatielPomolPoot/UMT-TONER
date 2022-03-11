import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {Button,Form,Col,Table} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'
  
const indice=0;
export default class RealizarSolicitud extends Component{

	state={
		validated: false,
		palabra:"",
		usuarios: [],
		impresoras:[],
		tonners:[],
		tonnersLike:[],
		solicitudes:[],
		indice:indice,
		solicitudInsertar:{
			TipoPedido:1,
			IdUsuario:0,
			NombreCompletoUsuario:'Seleccionar...',
			Impresora:'Seleccionar...',
			SerieTonner:'',
			Unidades:1,
			Codigo:''
		},
		
		aniadirTabla:{
			Id:0,
			SerieTinta:'',
			ColorTinta:'',
			Unidades:1,
			Codigo:''
		},

		data:[]	
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

	/*Base de datos*/
	componentDidMount(){
		this.getImpresoras();
		this.getImpresoras();
		this.getTonners();
		this.getTonnersLike();
		this.getUsuarios();
		this.getSolicitudes();
	}

	/*------Obtener Datos Tonner------*/
	getTonners=_=>{
			fetch('/tonners')
		.then(response=>response.json())
		.then(response=>this.setState({tonners: response.data}))
		.catch(err=>console.error(err))
	}

	/*----Obtener Datos Solicitudes---*/
	getSolicitudes=_=>{
			fetch('/solicitudes')
		.then(response=>response.json())
		.then(response=>this.setState({solicitudes: response.data}))
		.catch(err=>console.error(err))
	}

	addSolicitudes=_=>{

		const {solicitudInsertar,data}=this.state;

		if(data.length>0){
			var bandera=false;
			data.map((registro)=>{
				
				if(solicitudInsertar.NombreCompletoUsuario!==''&&solicitudInsertar.NombreCompletoUsuario!=='Seleccionar...'&&solicitudInsertar.SerieTonner!==''&&solicitudInsertar.Impresora!==''&&solicitudInsertar.Impresora!=='Seleccionar...'){
					if(solicitudInsertar.TipoPedido!==''& solicitudInsertar.TipoPedido>=1){
						var d = new Date();
						var formatoFecha= d.getFullYear()+'-'+(d.getMonth()+1);
						
						var separador = " "; // un espacio en blanco
						
						var concatenarTipoPedido=solicitudInsertar.TipoPedido+"-"+formatoFecha;
						var arregloImpresora=solicitudInsertar.Impresora.split(separador,2);
						fetch(`/solicitudes/add?IdUsuario=${solicitudInsertar.IdUsuario}&NombreCompletoUsuario=${solicitudInsertar.NombreCompletoUsuario}&MarcaImpresora=${arregloImpresora[0]}&ModeloImpresora=${arregloImpresora[1]}&Codigo=${registro.Codigo}&SerieTinta=${registro.SerieTinta}&Color=${registro.ColorTinta}&Cantidad=${registro.Unidades}&TipoPedido=${concatenarTipoPedido}`)
						.then(response3=>response3.json())
						.then(response3=>this.getSolicitudes)
						.catch(err=>console.error(err))

						bandera=true;
					}			
				}
			});

			if(bandera){
				alert("Se guardó exitosamente")
				window.location.reload(true);
			}
			else{
				alert("Error al momento de guardar. Favor de verificar sus datos o que el numero de pedido sea mayor a 0");
			}
		}else{
			alert("Deben haber tintas agregadas en la tabla");
				
		}
		
	}

	/*------Obtener Datos Tonner------*/
	getTonnersLike=(e,id)=>{
		const {data}=this.state
		var tamanioData=data.length;
		data.splice(0,tamanioData);
		
		
		var palabra=e+"",
			separador = " ", // un espacio en blanco
		    limite    = 3,
		    arregloDeSubCadenas = palabra.split(separador, limite);
		if(arregloDeSubCadenas[0]!=='Seleccionar...' && arregloDeSubCadenas[0]!=='undefined'){
			fetch(`/tonners/like?MarcaImpresora=${arregloDeSubCadenas[0]}&ModeloImpresora=${arregloDeSubCadenas[1]}`)
			.then(response=>response.json())
			.then(response=>this.setState({tonnersLike: response.data}))
			.catch(err=>console.error(err))
		}
		else{
			fetch(`/tonners/like?MarcaImpresora=%&ModeloImpresora=%`)
			.then(response=>response.json())
			.then(response=>this.setState({tonnersLike: response.data}))
			.catch(err=>console.error(err))
		}

		
		this.setState((state) => {
			// Importante: lee `state` en vez de `this.state` al actualizar.
			return {solicitudInsertar:{...state.solicitudInsertar,IdUsuario:id}}
		});

	}

	/*-------Obtener Datos impresora---*/
	getImpresoras=(usuario)=>{

		const {data}=this.state
		var tamanioData=data.length;
		data.splice(0,tamanioData)
		
		fetch(`/impresorasUsuarioOrderSerie?usuario=${usuario}`)
		.then(response=>response.json())
		.then(response=>this.setState({impresoras: response.data}))
		.catch(err=>console.error(err))
		this.getTonnersLike('');
	}

	/*------Obtener Datos Usuarios------*/
	getUsuarios=_=>{
		fetch('/usuariosSolicitud')
		.then(response=>response.json())
		.then(response=>this.setState({usuarios: response.data}))
		.catch(err=>console.error(err))

	}

	insertarTabla=()=>{
		const {solicitudInsertar,aniadirTabla,data,indice}=this.state
		var separador = " ", // un espacio en blanco
		    limite    = 2,
		    arregloDeSubCadenas = solicitudInsertar.SerieTonner.split(separador, limite);

		if(arregloDeSubCadenas.length===2){
			
			if(solicitudInsertar.Unidades>=1){
				if(solicitudInsertar.Codigo!=''){
					aniadirTabla.SerieTinta=arregloDeSubCadenas[0];
					aniadirTabla.ColorTinta=arregloDeSubCadenas[1];
					aniadirTabla.Id=indice;
					aniadirTabla.Unidades=solicitudInsertar.Unidades;
					aniadirTabla.Codigo=solicitudInsertar.Codigo;
					this.setState({ aniadirTabla:{...aniadirTabla,SerieTinta:arregloDeSubCadenas[0]}});
					this.setState({ aniadirTabla:{...aniadirTabla,ColorTinta:arregloDeSubCadenas[1]}});
					this.setState({ indice:indice+1});
					
					data.push(aniadirTabla)
				}else{
					alert("Verifique se hay colocado Código UADY");
				}

			}else{
				alert("Las unidades deben ser mayor a 0");
			}
			
		}
		else{
			alert("Verifique que se haya seleccionado la tinta de la impresora");
		}
		
	}

	eliminarTabla=(Id)=>{
		const {data}=this.state
		
		var contador=0;
		data.map((registro)=>{
		
			if(Id==registro.Id){
				data.splice(contador,1);
			}
			contador ++;
		})

		this.setState({data:data});	

	}

	renderUsuarios=({Nombre,PrimerApellido,SegundoApellido})=><option value={Nombre+' '+PrimerApellido+' '+SegundoApellido} key={Nombre+PrimerApellido+SegundoApellido}>{Nombre} {PrimerApellido} {SegundoApellido} </option>
	renderImpresoras=({Id,MarcaImpresora,ModeloImpresora})=><option key={Id} id={Id}>{MarcaImpresora} {ModeloImpresora}</option>
	renderTonnersLike=({NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora})=><option key={NumeroSerie} id={NumeroSerie}>{NumeroSerie} {Color} </option>
	/*--------------------------*/
	renderTintas=({Id,SerieTinta,ColorTinta,Unidades,Codigo})=>
		<tr key={Id}>
			<td>{SerieTinta}</td>
			<td>{ColorTinta}</td>
			<td>{Unidades}</td>
			<td>{Codigo}</td>
			<td><Button id={Id}
			    className="btn btn-danger btn-rounded btn-sm my-0" onClick={e =>this.eliminarTabla(Id)}>Eliminar</Button></td>
		</tr>

	render(){

		const {validated,impresoras,usuarios,solicitudInsertar,tonnersLike,data}=this.state;

		return (
			<Container className="containerRegistrarSolicitudes">

				<h1>Registrar Solicitud</h1>
				<Form noValidate validated={validated} onSubmit={e=>this.handleSubmit(e)}>
			      	
			      	<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState">
					      	<Form.Label>Usuario solicitante</Form.Label>
					      	<Form.Control as="select" required
          						onChange={e => {this.setState({ solicitudInsertar:{...solicitudInsertar,NombreCompletoUsuario:e.target.value} });this.getImpresoras(e.target.value)}}>
					        	<option value="" id=''>Seleccionar...</option>
					        	{usuarios.map(this.renderUsuarios)}
					      	</Form.Control>
					    </Form.Group>
			      	</Form.Row>

		
					<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState2">
					      	<Form.Label>Impresora</Form.Label>
					      	<Form.Control as="select" required
					      		value={solicitudInsertar.Impresora}
          						onChange={e =>{ this.setState({ solicitudInsertar:{...solicitudInsertar,Impresora:e.target.value} });this.getTonnersLike(e.target.value,e.target.options[e.target.options.selectedIndex].getAttribute('id'))}}>
					        	<option value="">Seleccionar...</option>
					        	{impresoras.map(this.renderImpresoras)}
					      	</Form.Control>
					    </Form.Group>

			      	</Form.Row>

			      	<Form.Row>
			      		<Form.Group as={Col} xs={6} controlId="formGridState3">
					      	<Form.Label>Modelo Tonner</Form.Label>
					      	<Form.Control as="select" 
          						onChange={e => this.setState({ solicitudInsertar:{...solicitudInsertar,SerieTonner:e.target.value} })}>
					        	<option value="">Seleccionar...</option>
					        	{tonnersLike.map(this.renderTonnersLike)}
					      	</Form.Control>
					    </Form.Group>

						<Form.Group as={Col} controlId="validationCustom05">
				          	<Form.Label>Unidades</Form.Label>
				          	<Form.Control
				            		type="number"
				            		placeholder="1"
				            		value={solicitudInsertar.Unidades}
          							onChange={e => this.setState({ solicitudInsertar:{...solicitudInsertar,Unidades:e.target.value} })}
				          	/>
				        </Form.Group>

						<Form.Group as={Col} controlId="validationCustom05">
				          	<Form.Label>Código</Form.Label>
				          	<Form.Control
				            		type="text"
				            		placeholder="Código"
				            		value={solicitudInsertar.Codigo}
          							onChange={e => this.setState({ solicitudInsertar:{...solicitudInsertar,Codigo:e.target.value} })}
				          	/>
				        </Form.Group>
						
					</Form.Row>	

					
					<Button onClick={this.insertarTabla} className="botonTinta">Insertar Tinta</Button>	

					<Form.Row>
						<Form.Group as={Col} className="formGroupEdit">
							<Form.Label>Tabla De Tintas</Form.Label>
						</Form.Group>
					</Form.Row>

					<Table responsive="xl" striped bordered hover className="TablaCaracteristicas">
					  
					  	<thead>
					    	<tr>
							    <th>Serie</th>
							    <th>Color</th>
								<th>Unidades</th>
								<th>Codigo</th>
								<th>Eliminar</th>
					  	  	</tr>
					  	</thead>

					  	<tbody>
					  		{data.map(this.renderTintas)}
					  	</tbody>
					</Table>


			      	<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState3">
					      	<Form.Label>Tipo de pedido</Form.Label>
					      	<Form.Control required
								type="number"  
								value={solicitudInsertar.TipoPedido}
          						onChange={e => this.setState({ solicitudInsertar:{...solicitudInsertar,TipoPedido:e.target.value} })}>
					      	</Form.Control>
							<Form.Control.Feedback>Excelente</Form.Control.Feedback>
			          		<Form.Control.Feedback type="invalid">
			            		Campo Vacio
			          		</Form.Control.Feedback>
					    </Form.Group>

			      	</Form.Row>
					
			      	
			      	<Button type="submit" onClick={this.addSolicitudes}>Guardar Solicitud</Button>
			    </Form>


			</Container>
		);

	}
}