let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let bookmarks = require('./model');
let app = express();

let server;

/* Tu código va aquí */
app.put('/api/bookmarks/:id', jsonParser, (req, res) => {
    let id = req.params.id;
    let id2 = req.body.id;
    let titulo = req.body.titulo;
    let descripcion = req.body.descripcion;
    let obj = {};
    let url = req.body.url;
    if (id2 && id2 !== '') {
        if (id !== id2) {
            res.statusMessage("id de body y param diferentes")
            return res.status(409).send();
        }
        else {
            if ((titulo && titulo !== '') || (descripcion && descripcion !== '') || (url && url !== '')) {
                console.log('modificar');
                if (titulo !== '')
                    obj.titulo = titulo;  
                if (descripcion !== '')
                    obj.descripcion = descripcion;
                if (url !== '')
                    obj.url = url;
                bookmarks.update(id, obj)
                    .then(resp => {
                        return res.status(202).json(resp);
                    })
                    .catch (err => {
                        res.statusMessage(err);
                        return res.status(400).send();
                    })
            }
            else {
                res.statusMessage("No contenido a modificar")
                return res.status(406).send();
            }
        }
    }
    else {
        res.statusMessage("id no de body")
        return res.status(406).send();
    }
});

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}