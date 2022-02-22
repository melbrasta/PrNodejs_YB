const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const server = http.createServer( ( req, res ) => {
	console.log( req.url );

//	let valid_files = ['index.html'];
//	if( valid_files.includes(req.url) ) {
filename = req.url.substring(1);
if (filename.length == 0)
{
	filename = 'index.html';
}

fs.readFile( filename, (err,content)=>{
	if (err) throw err;
//console.log(content);
			res.write( content.toString() );

			res.end();
		});


/*	else {
		res.statusCode = 404;
		res.end();

	}
	*/

});

server.listen( 8000 );
