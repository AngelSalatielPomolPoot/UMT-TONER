import React,{Component} from 'react';
import {Button,Table,Form,Col} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf'


export default class TablaGeneral extends Component {
	
	state={
		validated: false,
		solicitudes: [],
		PDF:[],
		historiales: [],
		TipoPedidoOrdenar:[],
		NombreTipoPedido:'Seleccionar...'
	}

	componentDidMount(){
		this.getTipoPedidoOrdenar();
		this.getSolicitudes();
		this.getSolicitudesPDF();
		
	}

	/*------Obtener Datos------*/
	getSolicitudes=_=>{
		const {NombreTipoPedido}=this.state
		fetch(`/solicitudes/condiciones?TipoBusqueda=1&TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({solicitudes: response.data}))
		.catch(err=>console.error(err))
	}

	getTipoPedidoOrdenar=_=>{

		fetch('/solicitudes/TipoPedidos')
		.then(response=>response.json())
		.then(response=>this.setState({TipoPedidoOrdenar: response.data}))
		.catch(err=>console.error(err))

	}

	getSolicitudesPDF=_=>{
		const {NombreTipoPedido}=this.state
		fetch(`/solicitudes/PDFgeneral?TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({PDF: response.data}))
		.catch(err=>console.error(err))
	}
	
	addSolicitudHistorial=(IdPedido)=>{
		const {solicitudes} =this.state;
        var pedido=solicitudes[0],posicion=0;

        for (var i = 0;i<solicitudes.length ; i++) {
        	pedido=solicitudes[i];
        	if(pedido.IdPedido===IdPedido){

				fetch(`/historiales/add?IdPedido=${pedido.IdPedido}&IdUsuario=${pedido.IdUsuario}&NombreUsuario=${pedido.NombreUsuario}&MarcaImpresora=${pedido.MarcaImpresora}&ModeloImpresora=${pedido.ModeloImpresora}&Codigo=${pedido.Codigo}&SerieTinta=${pedido.SerieTinta}&Color=${pedido.Color}&Cantidad=${pedido.Cantidad}&TipoPedido=${pedido.TipoPedido}`)
				.then(response3=>response3.json())
				.then(response3=>response3.data)
				.catch(err=>console.error(err))

				fetch(`/solicitudes/delete?IdPedido=${pedido.IdPedido}`)
				.then(response4=>response4.json())
				.then(response4=>response4.data)
				.catch(err=>console.error(err))

				alert("Se añadió al historial exitosamente")

				this.getSolicitudes();
        	}
        }   

		this.getTipoPedidoOrdenar()
	}

	deleteSolicitud=(IdPedido)=>{
		const {solicitudes} =this.state;

		fetch(`/solicitudes/delete?IdPedido=${IdPedido}`)
		.then(response4=>response4.json())
		.then(response4=>response4.data)
		.catch(err=>console.error(err))

		alert("Se eliminó exitosamente")
		this.getSolicitudes();
		this.getTipoPedidoOrdenar()

    }

	setTipoPedido=(value)=>{
		this.setState({NombreTipoPedido:value});
	}

        
	
	//jspdf fuuncion generador
	jsPDFGenerator=()=>{
		const {PDF}=this.state;
		var doc = new jsPDF()

		doc.setFontSize(18)
		doc.text('Solicitud De Tintas', 76, 22)
		doc.setFontSize(11)
		doc.setTextColor(100)

		// jsPDF 1.4+ uses getWidth, <1.4 uses .width
		var pageSize = doc.internal.pageSize
		var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
		var paragraph="Se presenta una lista de las solicitudes de los usuarios que han solicitado hasta el momento.";
		var text = doc.splitTextToSize(paragraph, pageWidth - 35, {})
		doc.text(text, 14, 30)

		doc.setTextColor(0)
		doc.setFontSize(16)
		doc.text('Lista Por Usuarios', 14, 45)

		doc.autoTable({
			head: this.headRows(),
			body: PDF,
			startY: 50,
			showHead: 'firstPage',
		})


		doc.setFontSize(12)
		var d = new Date();
		var fechaImpresion="Fechas de impresion: "+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
		doc.text(fechaImpresion, 14,doc.lastAutoTable.finalY + 10)
		doc.save('Solicitudes De Tintas (General).pdf')


	}

	headRows=()=>{
		return [
		  { NombreUsuario: 'Usuario', MarcaImpresora: 'Marca Impresora', ModeloImpresora: 'Modelo Impresora',Codigo: 'Codigo UADY', SerieTinta: 'Toner',Color:'Color', Cantidad:'Cantidad'},
		]
	}

    

       
    renderSolicitudes=({IdPedido,NombreUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad})=>(
					    <tr key={IdPedido}>
					      	<td>{NombreUsuario}</td>
							<td>{MarcaImpresora}</td>
					      	<td>{ModeloImpresora}</td>
							<td>{Codigo}</td>
					      	<td>{SerieTinta}</td>
					      	<td>{Color}</td>
					      	<td>{Cantidad}</td>
					      	<td><span className="table-remove"><Button id={IdPedido} type="submit"
			                  variant="success" className="" onClick={e =>this.addSolicitudHistorial(IdPedido)}>Entregado</Button></span></td>
					    	<td><span className="table-remove"><Button id={IdPedido} type="submit"
			                  variant="danger" className="" onClick={e =>this.deleteSolicitud(IdPedido)}>Eliminar</Button></span></td>
						</tr>
					)

	renderTipoPedido=({TipoPedido})=>(
		<option key={TipoPedido}>{TipoPedido}</option>
	)

	render(){

		const {solicitudes,TipoPedidoOrdenar,NombreTipoPedido}=this.state;

		return(
			<div>
				<div>
					<ReactHTMLTableToExcel
						id="botonExportarExcel"
						className="btn btn-success"
						table="tablaGeneral"
						filename="Lista General"
						sheet="General"
						buttonText="Exportar a Excel"/>

					<Button variant="danger" className="botonPDF" onClick={this.jsPDFGenerator}>Generar PDF</Button>
					

					<Form>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridState">
								<Form.Label>Filtra Por Pedido </Form.Label>
								<Form.Control as="select"
									value={NombreTipoPedido}
									onClick={()=>{this.getSolicitudes();this.getSolicitudesPDF()}}
									onChange={e =>{this.setTipoPedido(e.target.value)}}
									>
									<option>Seleccionar...</option>
					        		{TipoPedidoOrdenar.map(this.renderTipoPedido)}
								</Form.Control>
							</Form.Group>
						</Form.Row>
					</Form>
				</div>

				<h3 className='tablaTitulo'>Tabla General</h3>

				<Table id="tablaGeneral" responsive="xl" striped bordered hover className="TablaCaracteristicas">
						  
				  	<thead>
				   		<tr>
					      	<th>Usuario</th>
							<th>Marca Impresora</th>
					      	<th>Modelo Impresora</th>
							<th>Codigo UADY</th>
					      	<th>Toner</th>
					      	<th>Color</th>
					      	<th>Cantidad</th>
					      	<th>Entregar</th>
							<th>Eliminar</th>
					    </tr>
					</thead>

					<tbody>
						{solicitudes.map(this.renderSolicitudes)}
					</tbody>
				</Table>
			</div>
		);		

	}
	

}

