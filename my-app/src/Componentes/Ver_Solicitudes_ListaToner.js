import React,{Component} from 'react';
import {Button,Table,Form,Col} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf'

export default class TablaToner extends Component {
	
	state={
		valor:'',
		nombreBusqueda:'Tipo Pedido',
		validated: false,
		solicitudes: [],
		historiales: [],
		TipoPedidoOrdenar:[],
		NombreTipoPedido:'Seleccionar...'
	}

	componentDidMount(){
		this.getTipoPedidoOrdenar();
		this.getSolicitudes();
	}

	/*------Obtener Datos------*/
	getSolicitudes=_=>{
		const {NombreTipoPedido}=this.state
		fetch(`/solicitudes/condiciones?TipoBusqueda=2&TipoPedido=${NombreTipoPedido}`)
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

	setTipoPedido=(value)=>{
		this.setState({NombreTipoPedido:value});
	}
	   
	//jspdf fuuncion generador
	jsPDFGenerator=()=>{
		const {solicitudes}=this.state;
		var doc = new jsPDF()

		doc.setFontSize(18)
		doc.text('Solicitud De Tintas', 76, 22)
		doc.setFontSize(11)
		doc.setTextColor(100)

		// jsPDF 1.4+ uses getWidth, <1.4 uses .width
		var pageSize = doc.internal.pageSize
		var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
		var paragraph="Se presenta una lista de las solicitudes de las tintas solicitadas hasta el momento.";
		var text = doc.splitTextToSize(paragraph, pageWidth - 35, {})
		doc.text(text, 14, 30)

		doc.setTextColor(0)
		doc.setFontSize(16)
		doc.text('Lista Por Tonners', 14, 45)

		doc.autoTable({
			head: this.headRows(),
			body: solicitudes,
			startY: 50,
			showHead: 'firstPage',
		})

		doc.setFontSize(12)
		var d = new Date();
		var fechaImpresion="Fechas de impresion: "+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
		doc.text(fechaImpresion, 14,doc.lastAutoTable.finalY + 10)
		doc.save('Solicitudes De Tintas (Por Tintas).pdf')


	}

	headRows=()=>{
		return [
		  { Codigo: 'Codigo UADY',SerieTinta: 'Toner', Color: 'Color', MarcaImpresora: 'Marca Impresora', ModeloImpresora: 'Modelo Impresora', Cantidad: 'Cantidad' },
		]
	}

	renderTipoPedido=({TipoPedido})=>(
		<option key={TipoPedido}>{TipoPedido}</option>
	)
    

	renderSolicitudes=({Codigo,SerieTinta,Color,MarcaImpresora,ModeloImpresora,Cantidad})=>(
					    <tr key={SerieTinta}>
							<td>{Codigo}</td>
							<td>{SerieTinta}</td>
					      	<td>{Color}</td>
					      	<td>{MarcaImpresora}</td>
					      	<td>{ModeloImpresora}</td>
					      	<td>{Cantidad}</td>
					    </tr>
					)

	render(){

		const {solicitudes,TipoPedidoOrdenar,NombreTipoPedido}=this.state;

		return(
			
			<div>

				<div>
					<ReactHTMLTableToExcel
						id="botonExportarExcel"
						className="btn btn-success"
						table="tablaTintas"
						filename="Lista Por Tintas"
						sheet="Tintas"
						buttonText="Exportar a Excel"/>
					
					<Button variant="danger" className="botonPDF" onClick={this.jsPDFGenerator}>Generar PDF</Button>

					<Form>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridState">
								<Form.Label>Filtra Por Pedido </Form.Label>
								<Form.Control as="select"
									value={NombreTipoPedido}
									onClick={()=>{this.getSolicitudes()}}
									onChange={e =>{this.setTipoPedido(e.target.value)}}
									>
									<option>Seleccionar...</option>
					        		{TipoPedidoOrdenar.map(this.renderTipoPedido)}
								</Form.Control>
							</Form.Group>
						</Form.Row>
					</Form>
				</div>
							

				<h3 className='tablaTitulo'>Tabla Listado Por Toner</h3>

				<Table id='tablaTintas' responsive="xl" striped bordered hover className="TablaCaracteristicas">
					  
				  	<thead>
				   		<tr>
						   	<th>Código UADY</th>
				      		<th>Toner</th>
							<th>Color Tinta</th>
					      	<th>Marca Impresora</th>
					      	<th>Modelo Impresora</th>
					      	<th>Cantidad</th>
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

