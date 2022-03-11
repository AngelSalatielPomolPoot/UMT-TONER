import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from "react-router-dom";
import logo2 from './logoF.jpg';
import perfil from './media/perfil.jpeg';

import 'bootstrap//dist/css/bootstrap.min.css'


import {Navbar,NavDropdown,Nav,Image } from 'react-bootstrap'

import Home from './Componentes/Home'
import RegistrarUsuario from './Componentes/Registrar_Usuario'
import RegistrarImpresora from './Componentes/Registrar_Impresora'
import RegistrarTonner from './Componentes/Registrar_Tonner'
import ModificarTonner from './Componentes/Modificar_Tonner'
import ModificarImpresora from './Componentes/Modificar_Impresora'
import ModificarUsuario from './Componentes/Modificar_Usuario'

import './Estilos.css';


class App extends Component {

	state = {
		usuarios: []
	}
	
	componentDidMount(){
		this.getUsuarios();
	}

	getUsuarios=_=>{
		fetch('http://localhost:3001/usuarios')
		.then(response=>response.json())
		.then(response=>this.setState({usuarios: response.data}))
		.catch(err=>console.error(err))
	}

	renderUsuarios=({Id,Nombre,PrimerApellido,SegundoApellido})=><div key={Id}><p>Nombre:{Nombre} <br/> Apellido: {PrimerApellido} {SegundoApellido}</p></div>

	render(){
		const {usuarios}=this.state;

		return (

			<div className="Users">
				{usuarios.map(this.renderUsuarios)}
	        </div>	
				
		);
	}

		
	
}

export default App;

