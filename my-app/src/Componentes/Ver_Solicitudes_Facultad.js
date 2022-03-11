import React,{Component} from 'react';
import {Button,Form,Col,Table} from 'react-bootstrap';
import 'bootstrap//dist/css/bootstrap.min.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf'


export default class TablaFacultad extends Component {
	
	state={
		validated: false,
		tipoFacultad:'Facultad De Contaduría',
		solicitudes: [],
		historiales: [],
		PDFmatematicas:[],
		PDFcontaduria:[],
		PDFenfermeria:[],
		PDFeducacion:[],
		PDFumt:[],
		TipoPedidoOrdenar:[],
		NombreTipoPedido:'Seleccionar...'
	}

	componentDidMount(){
		this.getTipoPedidoOrdenar();
		this.getSolicitudes();
		this.getSolicitudesPDFfacultad();
	}

	/*------Obtener Datos------*/
	getSolicitudes=_=>{
		const {tipoFacultad,NombreTipoPedido}=this.state;
		fetch(`/solicitudes/condiciones?TipoBusqueda=3&valor=${tipoFacultad}&TipoPedido=${NombreTipoPedido}`)
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


	getSolicitudesPDFfacultad=_=>{
		const {NombreTipoPedido}=this.state
		fetch(`/solicitudes/PDFfacultad?TipoBusqueda=1&TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({PDFcontaduria: response.data}))
		.catch(err=>console.error(err))
		
		fetch(`/solicitudes/PDFfacultad?TipoBusqueda=2&TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({PDFeducacion: response.data}))
		.catch(err=>console.error(err))

		fetch(`/solicitudes/PDFfacultad?TipoBusqueda=3&TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({PDFenfermeria: response.data}))
		.catch(err=>console.error(err))
		
		fetch(`/solicitudes/PDFfacultad?TipoBusqueda=4&TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({PDFmatematicas: response.data}))
		.catch(err=>console.error(err))

		fetch(`/solicitudes/PDFfacultad?TipoBusqueda=5&TipoPedido=${NombreTipoPedido}`)
		.then(response=>response.json())
		.then(response=>this.setState({PDFumt: response.data}))
		.catch(err=>console.error(err))

	}

	setTipoFacultad=(value)=>{
		this.setState({tipoFacultad:value});
		
	}

	setTipoPedido=(value)=>{
		this.setState({NombreTipoPedido:value});
	}

        

	//jspdf fuuncion generador
	jsPDFGenerator=()=>{
		const {PDFcontaduria,PDFeducacion,PDFenfermeria,PDFmatematicas,PDFumt}=this.state;
		var doc = new jsPDF()


		doc.setFontSize(18)
		doc.text('Solicitud De Tintas', 78, 22)
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
		doc.text('Listas mostradas Por Facultad', 68, 45)

		doc.setFontSize(14)
		doc.text('Facultad De Contaduría', 14, 55)
		
		doc.autoTable({
			head: this.headRows(),
			body: PDFcontaduria,
			startY: 58,
			showHead: 'firstPage',
		})
		
		doc.setFontSize(14)
		doc.text('Facultad De Educación', 14, doc.lastAutoTable.finalY+11)

		doc.autoTable({
			head: this.headRows(),
			body: PDFeducacion,
			startY: doc.lastAutoTable.finalY + 14,
			pageBreak: 'avoid',
		})

		doc.setFontSize(14)
		doc.text('Facultad De Enfermería', 14, doc.lastAutoTable.finalY+11)

		doc.autoTable({
			head: this.headRows(),
			body: PDFenfermeria,
			startY: doc.lastAutoTable.finalY + 14,
			pageBreak: 'avoid',
		})

		doc.setFontSize(14)
		doc.text('Facultad De Matemáticas', 14, doc.lastAutoTable.finalY+11)

		doc.autoTable({
			head: this.headRows(),
			body: PDFmatematicas,
			startY: doc.lastAutoTable.finalY + 14,
			pageBreak: 'avoid',
		})

		doc.setFontSize(14)
		doc.text('UMT', 14, doc.lastAutoTable.finalY+11)

		doc.autoTable({
			head: this.headRows(),
			body: PDFumt,
			startY: doc.lastAutoTable.finalY + 14,
			pageBreak: 'avoid',
		})

		doc.setFontSize(12)
		var d = new Date();
		var fechaImpresion="Fechas de impresion: "+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
		doc.text(fechaImpresion, 14,doc.lastAutoTable.finalY + 10)
		doc.save('Solicitudes De Tintas (Por Facultad).pdf')


	}

	headRows=()=>{
		return [
		  { NombreCompleto: 'Usuario', Codigo: 'Código UADY', SerieTinta: 'Toner',Color: 'Color', Cantidad: 'Cantidad'},
		]
	}

	


    renderDatos(){
        const {solicitudes}=this.state;
        return (solicitudes.map(this.renderSolicitudes))
        
	}
	
	renderTipoPedido=({TipoPedido})=>(
		<option key={TipoPedido}>{TipoPedido}</option>
	)
       
    renderSolicitudes=({IdPedido,NombreCompleto,Codigo,SerieTinta,Color,Cantidad})=>(
					    <tr key={IdPedido}>
					      	<td>{NombreCompleto}</td>
					      	<td>{Codigo}</td>
					      	<td>{SerieTinta}</td>
					      	<td>{Color}</td>
					      	<td>{Cantidad}</td>
					    </tr>
					)

	render(){

		const {tipoFacultad,TipoPedidoOrdenar,NombreTipoPedido}=this.state;

		return(
			<div>

				<div>
					<ReactHTMLTableToExcel
						id="botonExportarExcel"
						className="btn btn-success"
						table="tablaFacultad"
						filename="Lista Por Facultad"
						sheet="Por Facultad"
						buttonText="Exportar a Excel"/>

					<Button variant="danger" className="botonPDF" onClick={this.jsPDFGenerator}>Generar PDF</Button>

					<Form>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridState">
								<Form.Label>Filtra Por Pedido </Form.Label>
								<Form.Control as="select"
									value={NombreTipoPedido}
									onClick={()=>{this.getSolicitudes();this.getSolicitudesPDFfacultad()}}
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

				<Form>
					<Form.Row>
			      		<Form.Group as={Col} controlId="formGridState">
					      	<Form.Label>Filtra por Facultad: </Form.Label>
					      	<Form.Control as="select"
					      		value={tipoFacultad}
          						onChange={e =>{this.setTipoFacultad(e.target.value);this.renderDatos()}} onClick={()=>this.getSolicitudes()}>
					        	<option>Facultad De Contaduría</option>
					        	<option>Facultad De Educación</option>
					        	<option>Facultad De Enfermería</option>
					        	<option>Facultad De Matemáticas</option>
								<option>UMT</option>
					      	</Form.Control>
					    </Form.Group>
			      	</Form.Row>
			    </Form>

				<Table id="tablaFacultad" responsive="xl" striped bordered hover className="TablaCaracteristicas">
						  
				  	<thead>
				   		<tr>
					      	<th>Usuario</th>
					      	<th>Código UADY</th>
					      	<th>Toner</th>
					      	<th>Color</th>
					      	<th>Cantidad</th>
					    </tr>
					</thead>

					<tbody>
						{this.renderDatos()}
					</tbody>
				</Table>
			</div>
		);		

	}
	

}

