import React,{Component} from 'react';

import {Container} from 'react-bootstrap';
import {Jumbotron} from 'react-bootstrap';
import {Carousel} from 'react-bootstrap';
import slide1 from './media/impresora1.jpg'
import slide2 from './media/impresora2.jpg'
import slide3 from './media/impresora3.jpg'
import 'bootstrap//dist/css/bootstrap.min.css'

export default class Home extends Component {

	state={
		index: 0,	
	}

	/*Carousel movimineto class*/
	setIndex = (selectedIndex) => {
    	this.setState({index: selectedIndex})
    }  


    handleSelect = (selectedIndex, e) => {
	    this.setIndex(selectedIndex);   
    }
    /*----------------------------*/

	render(){

		const {index}=this.state;
	  	return (
			
	    	<div className="containerHome">
		    	
				<div>
					<Carousel  activeIndex={index} onSelect={this.handleSelect}>
						<Carousel.Item interval={3000} className="fondoCarrousel">
							<img
								className="imagenCarrucel"
								src={slide1}
								alt="First slide"
							/>
							<Carousel.Caption>
								<Container className="containerSlide">
									<h1 className="h1Bienvenidos">Bienvenidos</h1>
									<h2>Sistema de toners UMT</h2>
									<p>
										Sistema de prestamos de toners para docentes de diversas áreas y facultades de la UMT
									</p>
								</Container>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={3000} className="fondoCarrousel">
							<img
								className="imagenCarrucel"
								src={slide2}
								alt="Second slide"
							/>

							<Carousel.Caption>
								<Container className="containerSlide">
									<h1 className="h1Bienvenidos">Bienvenidos</h1>
									<h2>Sistema de toners UMT</h2>
									<p>
										Sistema de prestamos de toners para docentes de diversas áreas y facultades de la UMT
									</p>
								</Container>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={3000} className="fondoCarrousel">
							<img
							className="imagenCarrucel"
							src={slide3}
							alt="Third slide"
							/>

							<Carousel.Caption>
								<Container className="containerSlide">
									<h1 className="h1Bienvenidos">Bienvenidos</h1>
									<h2>Sistema de toners UMT</h2>
									<p>
										Sistema de prestamos de toners para docentes de diversas áreas y facultades de la UMT
									</p>
								</Container>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>

			</div>
		  );
	}
}
