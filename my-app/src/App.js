import React, {Component} from 'react';

import {BrowserRouter as Router, Route} from "react-router-dom";
import logo2 from './logoF.jpg';
import perfil from './media/perfil.jpg';
import 'bootstrap//dist/css/bootstrap.min.css';
import {Navbar,NavDropdown,Nav,Image } from 'react-bootstrap';

import Home from './Componentes/Home';
import RegistrarUsuario from './Componentes/Registrar_Usuario';
import RegistrarImpresora from './Componentes/Registrar_Impresora';
import RegistrarTonner from './Componentes/Registrar_Tonner';
import VerImpresora from './Componentes/Ver_Impresora';
import VerUsuario from './Componentes/Ver_Usuario';
import VerTonner from './Componentes/Ver_Tonner';
import VerSolicitud from './Componentes/Ver_Solicitudes';
import RealizarSolicitud from './Componentes/Realizar_Solicitud';
import HistorialSolicitud from './Componentes/Historial_Solicitud';
import './Estilos.css';

class App extends Component {
	
	state = {
		usuarios: []
	}

	componentDidMount(){
		this.getUsuarios();
	}

	getUsuarios=_=>{
		fetch('/usuarios')
		.then(response=>response.json())
		.then(response=>this.setState({usuarios: response.data}))
		.catch(err=>console.error(err))
	}

	renderUsuarios=({Id,Nombre,PrimerApellido,SegundoApellido})=><div key={Id}><p>Nombre:{Nombre} <br/> Apellido: {PrimerApellido} {SegundoApellido}</p></div>

	render(){
	
		var d = new Date();
		var Titulo="Sistema De Tintas"

		return (

			<div className="cuerpoDiv">
				<header>
					<Navbar collapseOnSelect className="color-nav" expand="lg" variant="dark"> {/* Top= Deja fijado la barra de navegacion */}
						<Navbar.Brand className="letras" href="/"><Image src={logo2} className="App-logo" alt="UMT-TONER" thumbnail /> UMT-TONER {/*imagen*/} </Navbar.Brand>
						
						<Nav className="ml-auto"> 
							<p className='letraP' >{'Fecha Actual: '+d.getDate()+'/'+(d.getMonth()+1)+'/'+ d.getFullYear()}</p>
						</Nav>
						
					</Navbar>  
				</header>

				<Navbar collapseOnSelect sticky="top" className="color-nav2" expand="lg" variant="dark"> {/* Top= Deja fijado la barra de navegacion */}
					<Navbar.Brand className="letrasNav2" >{Titulo}</Navbar.Brand>
					<Navbar.Toggle className="ubicacion" aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto"> {/* ml= navegacion izquierda--mr=navegacion derecha*/}
						    
						    <NavDropdown title="Solicitudes" id="basic-nav-dropdown">
							    <NavDropdown.Item href="/Realizar_Solicitud">Solicitar</NavDropdown.Item>
							    <NavDropdown.Item href="/Ver_Solicitudes">Mostrar</NavDropdown.Item>
							    <NavDropdown.Item href="/Historial_Solicitud">Historial</NavDropdown.Item>
						    </NavDropdown>

						    <NavDropdown title="Usuarios" id="basic-nav-dropdown">
							    <NavDropdown.Item href="/Registrar_Usuario">Registrar</NavDropdown.Item>
							    <NavDropdown.Item href="/Ver_Usuario">Mostrar</NavDropdown.Item>
							   
						    </NavDropdown>

						    <NavDropdown title="Impresoras" id="basic-nav-dropdown">
							    <NavDropdown.Item href="/Registrar_Impresora">Registrar</NavDropdown.Item>
							    <NavDropdown.Item href="/Ver_Impresora">Mostrar</NavDropdown.Item>
							    
						    </NavDropdown>

						    <NavDropdown title="Toners" id="basic-nav-dropdown">
							    <NavDropdown.Item href="/Registrar_Tonner">Registrar</NavDropdown.Item>
							    <NavDropdown.Item href="/Ver_Tonner">Mostrar</NavDropdown.Item>
							    
						    </NavDropdown>

						</Nav>

						<Navbar.Text className="letra-Usuario">
							Centro De Computo  <Image src={perfil} className="imagen-perfil" alt="UMT-TONER" rounded /> 
						</Navbar.Text>
					</Navbar.Collapse>
							
				</Navbar> 

				<section className="sectionPropiedades">
					<Router> 
						<Route exact path="/" component={Home}/>	
						<Route path="/Registrar_Usuario" component={RegistrarUsuario}/>
						<Route path="/Registrar_Impresora" component={RegistrarImpresora}/>
						<Route path="/Registrar_Tonner" component={RegistrarTonner}/>
						<Route path="/Ver_Impresora" component={VerImpresora}/>
						<Route path="/Ver_Usuario" component={VerUsuario}/>
						<Route path="/Ver_Tonner" component={VerTonner}/>
						<Route path="/Ver_Solicitudes" component={VerSolicitud}/>
						<Route path="/Realizar_Solicitud" component={RealizarSolicitud}/>
						
						<Route path="/Historial_Solicitud" component={HistorialSolicitud}/>
					</Router>
				</section>

				<div className="Users">
					a
		        </div>	

				<footer className="footer">

					<div> <h4 className="footerLetra">©2021 Universidad Autónoma de Yucatán</h4></div>
					Esta pagina puede ser reproducida con fines no lucrativos, siempre y cuando no se mutile,
					se cite la fuente completa y su dirección electrónica, 
					de otro forma requiere permiso previo por escrito de la institución.

				</footer>
			</div>
			
		);	
	}
	
}

export default App;

