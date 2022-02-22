const http = require('http');
const url = require('url');
const querystring = require('querystring');
const sqlite3 = require('sqlite3');

const server = http.createServer( ( req, res ) => {
	let u = url.parse( req.url );
	let q = querystring.parse( u.query ) ;
	console.log( q.id );



	filename = req.url.substring(1);
	if (filename.length == 0)
	{
		filename = 'index.html';
	}

/*	fs.readFile( filename, (err,content)=>{
		if (err) throw err;
	//console.log(content);
				res.write( content.toString() );

				res.end();
			});
*/


	let db = new sqlite3.Database('../test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
	let query1 = 'SELECT * FROM (Kategorien) WHERE ID = 1';



	stmt = db.prepare( query1 ) ;

	stmt.all( 1, (err, rows ) => {

			res.write( rows[0].Nachspeisen );
		res.end();
	} );

});

server.listen( 8000 );
})
