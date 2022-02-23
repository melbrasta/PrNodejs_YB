const http = require('http');
const url = require('url');
const querystring = require('querystring');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const server = http.createServer( ( req, res ) => {

	console.log( req.url );


	function readFromDatabase()
	{
	  let objProd = [
	    //  {isselected: false}, {isselected: false},				//hier muss die Ausgabe der Datenbankanfrage rein
			showSpeisen(),
			showGetraenke(),
			showNachspeisen(),
			showCocktails(),
			showToGo()
	  ];
		return objProd;
	}




	function showSpeisen()      // Zeige alle Produkte der Kategorie 1 (Speisen)
	{
	  	let db = new sqlite3.Database('Kassensystem.db');
	  	let query= db.each('SELECT * FROM (Produkte) WHERE Kategorie_ID = 1', (err,row)=> {
//	  		console.log( row);
//				Speisen= row;
//				console.log(Speisen);
	  	});

	}

	function showGetraenke()      // Zeige alle Produkte der Kategorie 2 (getränke)
	{
	  	let db = new sqlite3.Database('Kassensystem.db');
	  	let query= db.each('SELECT * FROM (Produkte) WHERE Kategorie_ID = 2', (err,row)=> {
	  		console.log( row);

	  	});

	}

	function showNachspeisen()      // Zeige alle Produkte der Kategorie 3 (Nachspeisen)
	{
			let db = new sqlite3.Database('Kassensystem.db');
			let query= db.each('SELECT * FROM (Produkte) WHERE Kategorie_ID = 3', (err,row)=> {
				console.log( row);

			});

	}

	function showCocktails()      // Zeige alle Produkte der Kategorie 4 (Cocktails)
	{
			let db = new sqlite3.Database('Kassensystem.db');
			let query= db.each('SELECT * FROM (Produkte) WHERE Kategorie_ID = 4', (err,row)=> {
				console.log( row);

			});

	}

	function showToGo()      // Zeige alle Produkte der Kategorie 5 (ToGo)
	{
			let db = new sqlite3.Database('Kassensystem.db');
			let query= db.each('SELECT * FROM (Produkte) WHERE Kategorie_ID = 5', (err,row)=> {
				console.log( row);

			});

	}


	filename = req.url.substring(1);
			//Ohne Substring wird hier die Html Datei gegeben
	if (filename.length == 0)
	{
		filename = 'index.html';
	}

/*
	fs.readFile( req.url.substring(1), (err,content)=>{
		if (err) throw err;
	//console.log(content);
				res.write( content.toString() );

				res.end();
			});

*/


if(req.url == '/getData')
{
	let objProd = readFromDatabase();
	let str ='let data = ' + JSON.stringify( objProd );
	res.write(str);
	res.end();
}
else {
	fs.readFile( filename , (err,content)=>{
		if (err) throw err;
				res.write( content.toString() );
				res.end();
			});
}



/*

	let db = new sqlite3.Database('Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
	let query1 = 'SELECT * FROM (Kategorien) WHERE ID = 1';



	stmt = db.prepare( query1 ) ;

	stmt.all( 1, (err, rows ) => {
		if (err) {
			console.error(err.message);
		}

			res.write( 'hallo' );
		res.end();
	} );

});
*/


})
server.listen( 8000 );
