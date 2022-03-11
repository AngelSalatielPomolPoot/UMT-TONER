/*Bueno para modificar */
var express = require('express');
const cors =require('cors')
var mysql = require('mysql');
var app = express();

const SELECT_ALL_USUARIOS='SELECT * FROM usuarios order by Nombre,PrimerApellido,SegundoApellido';
const SELECT_ALL_IMPRESORAS='SELECT * FROM impresoras order by Marca asc,Modelo asc';
const SELECT_ALL_TONNERS='SELECT * FROM tonners order by NumeroSerie';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'sistematoner'
});

app.use(cors());



connection.connect(err=>{
	if(err){
		return err;
	}
}); 
 
app.get('/', (req, res)=> {
	 res.send('vamos a /usuarios para ver usuarios')
});

/*-------------------------------------------------------------------
						Usuarios
---------------------------------------------------------------------*/
app.get('/usuarios',(req,res)=>{

	connection.query(SELECT_ALL_USUARIOS, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

/*Usuarios sin repetir*/
app.get('/usuariosSolicitud',(req,res)=>{
	const SELECT_ALL_USUARIOS_NOREPETICION=`SELECT DISTINCT Nombre,PrimerApellido,SegundoApellido FROM usuarios order by Nombre,PrimerApellido,SegundoApellido`;
	connection.query(SELECT_ALL_USUARIOS_NOREPETICION, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

app.get('/usuarios/delete',(req,res)=>{
	const{Id}=req.query;

	const USUARIOS_DELETE=`DELETE FROM usuarios WHERE (Id='${Id}')`;
	connection.query(USUARIOS_DELETE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});


app.get('/usuarios/where',(req,res)=>{
	const{IdBusqueda}=req.query;
	console.log(IdBusqueda);

	const SELECT_ALL_USUARIOS_WHERE=`SELECT * FROM usuarios where usuarios.Id='${IdBusqueda}'`;
	connection.query(SELECT_ALL_USUARIOS_WHERE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});


app.get('/usuarios/add',(req,res)=>{
	const {Nombre,PrimerApellido,SegundoApellido,Facultad,Correo,MarcaImpresora,ModeloImpresora} =req.query;
	console.log(Nombre,PrimerApellido,SegundoApellido,Facultad,Correo,MarcaImpresora,ModeloImpresora);

	const INSERT_USUARIOS_QUERY=`INSERT INTO usuarios (Nombre,PrimerApellido,SegundoApellido,Facultad,Correo,MarcaImpresora,ModeloImpresora) VALUES ('${Nombre}','${PrimerApellido}','${SegundoApellido}','${Facultad}','${Correo}','${MarcaImpresora}','${ModeloImpresora}')`;
	

	connection.query(INSERT_USUARIOS_QUERY,(error,resultado)=>{
		if(error){
			return res.send(error)
		}
		else{
			return res.send('se añadio al usuario exitosamente')
			console.log('se añadio al usuario exitosamente')
		}
	})

});

app.get('/usuarios/update',(req,res)=>{
	const {IdBusqueda,Nombre,PrimerApellido,SegundoApellido,Facultad,Correo,MarcaImpresora,ModeloImpresora} =req.query;
	console.log(IdBusqueda,Nombre,PrimerApellido,SegundoApellido,Facultad,Correo,MarcaImpresora,ModeloImpresora);
	const UPDATE_USUARIOS_QUERY=`UPDATE usuarios SET Nombre='${Nombre}',PrimerApellido='${PrimerApellido}',SegundoApellido='${SegundoApellido}',Facultad='${Facultad}',Correo='${Correo}',MarcaImpresora='${MarcaImpresora}',ModeloImpresora='${ModeloImpresora}' WHERE Id=${IdBusqueda}`;

	connection.query(UPDATE_USUARIOS_QUERY,(error,resultado)=>{
		if(error){
			console.log('error al actualizar')
			return res.send(error)
		}
		else{
			console.log('se añadio al usuario exitosamente')
			return res.send('se añadio al usuario exitosamente')
			
		}
	})

});

/*-------------------------------------------------------------------
						Impresora de los Usuarios
---------------------------------------------------------------------*/

app.get('/impresorasUsuarioOrderSerie',(req,res)=>{
	const {usuario} =req.query;

	const SELECT_ALL_IMPRESORAS__USUARIOS_ORDER_SERIE=`SELECT Id,MarcaImpresora,ModeloImpresora FROM sistematoner.usuarios where concat(Nombre,' ',PrimerApellido,' ',SegundoApellido)='${usuario}' order by MarcaImpresora,ModeloImpresora`
	connection.query(SELECT_ALL_IMPRESORAS__USUARIOS_ORDER_SERIE, (error, resultado, fields)=>{   
	 	if(error){
	 		console.log(error)
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

/*-------------------------------------------------------------------
						Impresoras
---------------------------------------------------------------------*/

app.get('/impresoras',(req,res)=>{
	connection.query(SELECT_ALL_IMPRESORAS, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});


app.get('/impresoras/update',(req,res)=>{
	const {IdBusqueda,Id,Marca,Modelo,TipoImpresora} =req.query;
	console.log(IdBusqueda,Id,Marca,Modelo,TipoImpresora);
					
	const UPDATE_IMPRESORAS_QUERY=`UPDATE impresoras SET Id='${Id}',Marca='${Marca}',Modelo='${Modelo}',TipoImpresora='${TipoImpresora}' WHERE Id='${IdBusqueda}'`;

	connection.query(UPDATE_IMPRESORAS_QUERY,(error,resultado)=>{
		if(error){
			console.log('error al actualizar_'+error)
			return res.send(error)
		}
		else{
			console.log('se modificar al usuario exitosamente')
			return res.send('se modificar al tonners exitosamente')
			
		}
	})

});
 
app.get('/impresorasOrderSerie',(req,res)=>{ /*XXXXXXXXXXXXXXXXXXX Sin uso - posible eliminacion--------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
	const SELECT_ALL_IMPRESORAS_ORDER_SERIE='SELECT * FROM impresoras order by NumeroSerie';
	connection.query(SELECT_ALL_IMPRESORAS_ORDER_SERIE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

app.get('/impresoras/delete',(req,res)=>{

	const{Id}=req.query;
	const IMPRESORAS_DELETE=`DELETE FROM impresoras WHERE (Id='${Id}')`;
	
	connection.query(IMPRESORAS_DELETE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});

app.get('/impresoras/add',(req,res)=>{
	const {Id,Marca,Modelo,TipoImpresora} =req.query;
	console.log(Id,Marca,Modelo,TipoImpresora);

	const INSERT_IMPRESORA_QUERY=`INSERT INTO impresoras (Marca,Modelo,TipoImpresora) VALUES ('${Marca}','${Modelo}','${TipoImpresora}')`;

	connection.query(INSERT_IMPRESORA_QUERY,(error,resultado)=>{
		if(error){
			return res.send(error)
		}
		else{
			return res.send('se añadio al usuario exitosamente')
			console.log('se añadio al usuario exitosamente')
		}
	})

});


/*-------------------------------------------------------------------
						Toners
---------------------------------------------------------------------*/

app.get('/tonners',(req,res)=>{
	connection.query(SELECT_ALL_TONNERS, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});



app.get('/tonners/update',(req,res)=>{
	const {IdBusqueda,NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora} =req.query;
	console.log(NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora);
	
	const UPDATE_TONNERS_QUERY=`UPDATE tonners SET NumeroSerie='${NumeroSerie}',Marca='${Marca}',Color='${Color}',MarcaImpresora='${MarcaImpresora}',ModeloImpresora='${ModeloImpresora}' WHERE NumeroSerie='${IdBusqueda}'`;

	connection.query(UPDATE_TONNERS_QUERY,(error,resultado)=>{
		if(error){
			console.log('error al actualizar_'+error)
			return res.send(error)
		}
		else{
			console.log('se modificar al usuario exitosamente')
			return res.send('se modificar al tonners exitosamente')
			
		}
	})

});

app.get('/tonners/like',(req,res)=>{
	const{MarcaImpresora,ModeloImpresora}=req.query;

	console.log(MarcaImpresora,ModeloImpresora)
	const SELECT_ALL_TONNERS_LIKE=`SELECT * FROM tonners where  MarcaImpresora like '%${MarcaImpresora}%' and ModeloImpresora like '%${ModeloImpresora}%' order by NumeroSerie`;
	connection.query(SELECT_ALL_TONNERS_LIKE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

app.get('/tonners/add',(req,res)=>{
	const {NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora} =req.query;
	console.log(NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora);

	const INSERT_IMPRESORA_QUERY=`INSERT INTO tonners (NumeroSerie,Marca,Color,MarcaImpresora,ModeloImpresora) VALUES ('${NumeroSerie}','${Marca}','${Color}','${MarcaImpresora}','${ModeloImpresora}')`;

	connection.query(INSERT_IMPRESORA_QUERY,(error,resultado)=>{
		if(error){
			return res.send(error)
		}
		else{
			return res.send('se añadio al usuario exitosamente')
			console.log('se añadio al usuario exitosamente')
		}
	})

});

app.get('/tonners/delete',(req,res)=>{

	const{NumeroSerie}=req.query;
	const TONNERS_DELETE=`DELETE FROM tonners WHERE (NumeroSerie='${NumeroSerie}')`;
	
	connection.query(TONNERS_DELETE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});

/*-------------------------------------------------------------------
						Solicitudes
---------------------------------------------------------------------*/

app.get('/solicitudes',(req,res)=>{

	const SELECT_ALL_SOLICITUDES=`SELECT * FROM solicitudes`;
	connection.query(SELECT_ALL_SOLICITUDES, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});

app.get('/solicitudes/fechas',(req,res)=>{
	const {FechaInicial,FechaFinal}=req.query;

	const SELECT_ALL_SOLICITUDES_FECHAS=`SELECT * FROM solicitudes WHERE Fecha BETWEEN '${FechaInicial}' AND '${FechaFinal}';`;
	connection.query(SELECT_ALL_SOLICITUDES_FECHAS, (error, resultado, fields)=>{   
	 	if(error){
	 		console.log('Error')
	 		return res.send(error)
	 	}else{
	 		console.log('Exito')
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});


app.get('/solicitudes/delete',(req,res)=>{

	const{IdPedido}=req.query;
	const SOLICITUDES_DELETE=`DELETE FROM solicitudes WHERE (IdPedido = '${IdPedido}')`;
	
	connection.query(SOLICITUDES_DELETE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});

app.get('/solicitudes/like',(req,res)=>{
	const{SerieTinta,Color}=req.query;

	console.log(SerieTinta,Color)
	const SELECT_ALL_SOLICITUDES_LIKE=`SELECT * FROM solicitudes where  Facultad like '%${SerieTinta}%' and ModeloImpresora like '%${Color}%'`;
	connection.query(SELECT_ALL_SOLICITUDES_LIKE, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

app.get('/solicitudes/PDFgeneral',(req,res)=>{
	const {TipoPedido} =req.query;

	const SELECT_ALL_SOLICITUDES_PDF=`SELECT NombreUsuario,MarcaImpresora, ModeloImpresora,Codigo, SerieTinta, Color, Cantidad FROM solicitudes WHERE TipoPedido='${TipoPedido}' `;
	console.log('GeneralPDF')

	connection.query(SELECT_ALL_SOLICITUDES_PDF, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});

app.get('/solicitudes/TipoPedidos',(req,res)=>{
	
	const SELECT_ALL_TIPO_PEDIDOS=`SELECT DISTINCT TipoPedido FROM solicitudes order by IdPedido`;
	console.log('Tipo Pedidos')

	connection.query(SELECT_ALL_TIPO_PEDIDOS, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});


app.get('/solicitudes/PDFfacultad',(req,res)=>{
	
	const {TipoBusqueda,TipoPedido} =req.query;

	var SELECT_ALL_SOLICITUDES_CONDICION_PDF='';
	
	if(TipoBusqueda==1){
		SELECT_ALL_SOLICITUDES_CONDICION_PDF=`SELECT concat_ws(' ',Nombre,PrimerApellido, SegundoApellido) as NombreCompleto, Codigo,SerieTinta,Color,Cantidad FROM solicitudes 
		INNER JOIN usuarios where solicitudes.IdUsuario=usuarios.Id and usuarios.Facultad='Facultad De Contaduría' and TipoPedido='${TipoPedido}'`;
		console.log('Facultad Contaduria')

	}else{
		if(TipoBusqueda==2){
			SELECT_ALL_SOLICITUDES_CONDICION_PDF=`SELECT concat_ws(' ',Nombre,PrimerApellido, SegundoApellido) as NombreCompleto, Codigo,SerieTinta,Color,Cantidad FROM solicitudes 
			INNER JOIN usuarios where solicitudes.IdUsuario=usuarios.Id and usuarios.Facultad='Facultad De Educación' and TipoPedido='${TipoPedido}'`;
			console.log('Facultad Educacion')
		}else{

			if(TipoBusqueda==3){
				SELECT_ALL_SOLICITUDES_CONDICION_PDF=`SELECT concat_ws(' ',Nombre,PrimerApellido, SegundoApellido) as NombreCompleto, Codigo,SerieTinta,Color,Cantidad FROM solicitudes 
				INNER JOIN usuarios where solicitudes.IdUsuario=usuarios.Id and usuarios.Facultad='Facultad De Enfermería' and TipoPedido='${TipoPedido}'`;
				console.log('Facultad Enfermería')
			}else{
				if(TipoBusqueda==4){
					SELECT_ALL_SOLICITUDES_CONDICION_PDF=`SELECT concat_ws(' ',Nombre,PrimerApellido, SegundoApellido) as NombreCompleto, Codigo,SerieTinta,Color,Cantidad FROM solicitudes 
					INNER JOIN usuarios where solicitudes.IdUsuario=usuarios.Id and usuarios.Facultad='Facultad De Matemáticas' and TipoPedido='${TipoPedido}'`;
					console.log('Facultad Matematicas')
				}else{	
					if(TipoBusqueda==5){
						SELECT_ALL_SOLICITUDES_CONDICION_PDF=`SELECT concat_ws(' ',Nombre,PrimerApellido, SegundoApellido) as NombreCompleto, Codigo,SerieTinta,Color,Cantidad FROM solicitudes 
						INNER JOIN usuarios where solicitudes.IdUsuario=usuarios.Id and usuarios.Facultad='UMT' and TipoPedido='${TipoPedido}'`;
						console.log('UMT')
					}
				}
			}

		}
	}

	connection.query(SELECT_ALL_SOLICITUDES_CONDICION_PDF, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado
	 		})
	 	}
	});
});


app.get('/solicitudes/condiciones',(req,res)=>{
	const {TipoBusqueda,valor,TipoPedido} =req.query;
	console.log(TipoBusqueda,valor,TipoPedido)
	
	
	var SELECT_ALL_SOLICITUDES_CONDICION='';
	if(TipoBusqueda==1){
		SELECT_ALL_SOLICITUDES_CONDICION=`SELECT IdPedido,IdUsuario,NombreUsuario,MarcaImpresora, ModeloImpresora,Codigo, SerieTinta, Color, Cantidad,TipoPedido FROM solicitudes where TipoPedido='${TipoPedido}'`;
		console.log('General')

	}else{
		if(TipoBusqueda==2){
			SELECT_ALL_SOLICITUDES_CONDICION=`SELECT Codigo,SerieTinta,Color,MarcaImpresora,ModeloImpresora, sum(Cantidad) AS Cantidad FROM solicitudes where TipoPedido='${TipoPedido}'
			GROUP BY SerieTinta`;
			console.log('Lista Por Tonners')
		}else{
			if(TipoBusqueda==3){														/*NombreCompletoUsuario*/
				SELECT_ALL_SOLICITUDES_CONDICION=`SELECT  IdPedido, concat_ws(' ',Nombre,PrimerApellido, SegundoApellido) as NombreCompleto, Codigo,SerieTinta,Color,Cantidad FROM solicitudes 
				INNER JOIN usuarios WHERE solicitudes.IdUsuario=usuarios.Id and usuarios.Facultad='${valor}' and TipoPedido='${TipoPedido}'`;
				console.log('Facultad condicion correcto')
			}
		}
		
	}

	connection.query(SELECT_ALL_SOLICITUDES_CONDICION, (error, resultado, fields)=>{   
	 	if(error){
	 		console.log('error base')
	 		return res.send(error)
	 	}else{console.log('correcto')
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});

app.get('/solicitudes/add',(req,res)=>{
	const {IdUsuario,NombreCompletoUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido} =req.query;
	console.log(IdUsuario,NombreCompletoUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido);

	const INSERT_SOLICITUDES_QUERY=`INSERT INTO solicitudes (IdUsuario,NombreUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido) VALUES (${IdUsuario},'${NombreCompletoUsuario}','${MarcaImpresora}','${ModeloImpresora}','${Codigo}','${SerieTinta}','${Color}',${Cantidad},'${TipoPedido}')`;

	connection.query(INSERT_SOLICITUDES_QUERY,(error,resultado)=>{
		if(error){
			console.log(error)
			return res.send(error)

		}
		else{
			console.log('se añadio al usuario exitosamente')
			return res.send('se añadio al usuario exitosamente')
			
		}
	})

});

/*-------------------------------------------------------------------
						Historial
---------------------------------------------------------------------*/

app.get('/historiales',(req,res)=>{

	const SELECT_ALL_HISTORIAL='SELECT * FROM historial';

	connection.query(SELECT_ALL_HISTORIAL, (error, resultado, fields)=>{   
	 	if(error){
	 		return res.send(error)
	 	}else{
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});


app.get('/historiales/like',(req,res)=>{
	const {TipoBusqueda,valor} =req.query;
	console.log(TipoBusqueda,valor)

	var SELECT_ALL_HISTORIAL_LIKE='';
	if(TipoBusqueda==1){
		SELECT_ALL_HISTORIAL_LIKE=`SELECT * FROM historial WHERE TipoPedido like '${valor}'`;
	}else{
		console.log('no entro')
	}

	connection.query(SELECT_ALL_HISTORIAL_LIKE, (error, resultado, fields)=>{   
	 	if(error){
	 		console.log('error')
	 		return res.send(error)
	 	}else{console.log('correcto')
	 		return res.json({
	 			data:resultado 
	 		})
	 	}
	});
});

app.get('/historiales/add',(req,res)=>{
	const {IdPedido,IdUsuario,NombreUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido} =req.query;
	console.log(IdPedido,IdUsuario,NombreUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido);
	
	const INSERT_HISTORIAL_QUERY=`INSERT INTO historial (IdPedido,IdUsuario,NombreUsuario,MarcaImpresora,ModeloImpresora,Codigo,SerieTinta,Color,Cantidad,TipoPedido) VALUES (${IdPedido},${IdUsuario},'${NombreUsuario}','${MarcaImpresora}','${ModeloImpresora}','${Codigo}','${SerieTinta}','${Color}',${Cantidad},'${TipoPedido}')`;

	connection.query(INSERT_HISTORIAL_QUERY,(error,resultado)=>{
		if(error){
			return res.send(error)
		}
		else{
			console.log('se añadio al usuario exitosamente')
			return res.send('se añadio al usuario exitosamente')
		}
	})

});


/*-------------------------------------------------------------------
						Otros
---------------------------------------------------------------------*/
 
app.listen(process.env.PORT || '3001', function () {
    console.log('Sistema armado en el puerto 3001!');
});



