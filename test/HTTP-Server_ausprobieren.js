const http = require('http');
const url = require('url');
const qs = require('querystring');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const fun  = require('./js/function.js');


const server = http.createServer( ( req, res ) => {

	console.log( req.url );
//	Speisen = [ showSpeisen()];



/* Sicherheitskopie
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
//		console.log(objProd[0]);
}
*/





	function showSpeisen()      // Zeige alle Produkte der Kategorie 1 (Speisen)
	{
		 return new Promise( (resolve,rej)=> {

			 let db = new sqlite3.Database('Kassensystem.db');
 	  	 db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 1', (err,row)=> {
 	  		//console.log( row);
 				resolve(row);
 	  	});
			db.close();
	 	});


	}

	function showGetraenke()      // Zeige alle Produkte der Kategorie 2 (getränke)
	{
		 return new Promise( (resolve,rej)=> {

			 let db = new sqlite3.Database('Kassensystem.db');
 	  	 db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 2', (err,row)=> {
 	  		//console.log( row);
 				resolve(row);
 	  	});
			db.close();
	 	});


	}

	function showNachspeisen()      // Zeige alle Produkte der Kategorie 3 (Nachspeisen)
	{
		 return new Promise( (resolve,rej)=> {

			 let db = new sqlite3.Database('Kassensystem.db');
 	  	 db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 3', (err,row)=> {
 	  		//console.log( row);
 				resolve(row);
 	  	});
			db.close();
	 	});


	}

	function showCocktails()      // Zeige alle Produkte der Kategorie 4 (Cocktails)
	{
		 return new Promise( (resolve,rej)=> {

			 let db = new sqlite3.Database('Kassensystem.db');
 	  	 db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 4', (err,row)=> {
 	  		//console.log( row);
 				resolve(row);
 	  	});
			db.close();
	 	});


	}

	function showToGo()      // Zeige alle Produkte der Kategorie 5 (ToGo)
	{
		 return new Promise( (resolve,rej)=> {

			 let db = new sqlite3.Database('Kassensystem.db');
 	  	 db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 5', (err,row)=> {
 	  		//console.log( row);
 				resolve(row);
 	  	});
			db.close();
	 	});


	}

//fun.banane()


/*
	fs.readFile( req.url.substring(1), (err,content)=>{
		if (err) throw err;
	//console.log(content);
				res.write( content.toString() );

				res.end();
			});

*/



	function readFromDatabase()
	{

		return new Promise( (resolve,rej)=> {

			let promises = [];


			promises.push( showSpeisen() );
			promises.push( showGetraenke() );
			promises.push( showNachspeisen() );
			promises.push( showCocktails() );
			promises.push( showToGo() );

			Promise.all( promises ) .then( results => { resolve( results )})


		});

/*		let Speisen = [
			showSpeisen()
		];
*/

	//		Speisen : Speisen
//		console.log(objProd[0]);
	}

	//hier Fehlt noch was....
if (req.method == 'POST')
{
  let body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var POST = qs.parse(body);
    console.log(POST);
  });}
else if (req.method === 'GET')
{
		filename = req.url.substring(1);
				//Ohne Substring wird hier die Html Datei gegeben
		if (filename.length == 0)
		{
			filename = 'index.html';
		}



if(req.url == '/getData')
{

	readFromDatabase().then( resultsFromDatabase => {
		let str ='let data = ' + JSON.stringify( resultsFromDatabase );
//		console.log(str);							//Hier wird alles in der Serverconsole ausgegeben
		res.write(str);
		res.end();
	})

}
else if (req.url === '/getSpeisen')
{
		let speisen = new Promise((resolve, rej) => {

				let db = new sqlite3.Database('Kassensystem.db');
				db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 1', (err, row) => {
						resolve(row);
				});
				db.close();
		});
		speisen.then((rows) => {
				res.write(JSON.stringify(rows))
				res.end()
				console.log(filename);
		})

}
else if (req.url === '/getGetraenke')
{
		let getraenke = new Promise((resolve, rej) => {

				let db = new sqlite3.Database('Kassensystem.db');
				db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 2', (err, row) => {
						resolve(row);
				});
				db.close();
		});
		getraenke.then((rows) => {
				res.write(JSON.stringify(rows))
				res.end()
		})

}
else if (req.url === '/getNachspeisen')
{
		let nachspeisen = new Promise((resolve, rej) => {

				let db = new sqlite3.Database('Kassensystem.db');
				db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 3', (err, row) => {
						resolve(row);
				});
				db.close();
		});
		nachspeisen.then((rows) => {
				res.write(JSON.stringify(rows))
				res.end()
		})

}
else if (req.url === '/getCocktails')
{
		let cocktails = new Promise((resolve, rej) => {

				let db = new sqlite3.Database('Kassensystem.db');
				db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 4', (err, row) => {
						resolve(row);
				});
				db.close();
		});
		cocktails.then((rows) => {
				res.write(JSON.stringify(rows))
				res.end()
		})

}
else if (req.url === '/getToGo')
{
		let togo = new Promise((resolve, rej) => {

				let db = new sqlite3.Database('Kassensystem.db');
				db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 5', (err, row) => {
						resolve(row);
				});
				db.close();
		});
		togo.then((rows) => {
				res.write(JSON.stringify(rows))
				res.end()
		})

}
else if (req.url === '/doBestellung')
{
		let togo = new Promise((resolve, rej) => {

				let db = new sqlite3.Database('Kassensystem.db');
				db.all('SELECT * FROM (Produkte) WHERE Kategorie_ID = 5', (err, row) => {
						resolve(row);
				});
				db.close();
		});
		togo.then((rows) => {
				res.write(JSON.stringify(rows))
				res.end()
		})

}
 else
 {
		fs.readFile(filename, (err, content) => {
				if (err) throw err;
				res.write(content.toString());
				res.end();
			});
}



}
});
server.listen( 8000 );
