const http = require('http');
const url = require('url');
const qs = require('querystring');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const fun  = require('./js/function.js');


const server = http.createServer( ( req, res ) => {

	console.log( req.url );




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

	}

	function getStueckPreis(buchung)
	 {
			// TODO: Raus lösen, sodass man es nicht immer definieren muss
			let db = new sqlite3.Database('Kassensystem.db');
			let stueckpreis = new Promise((resolve, rej) => {
					db.all(`SELECT Preis
									FROM (Produkte)
									WHERE ID = ${buchung.produktId}`, (err, row) => {
							resolve(row);
					});
			});
			db.close();
			return stueckpreis;
	}


	function getMehrwertSteuer(buchung)
	{
			// TODO: Raus lösen, sodass man es nicht immer definieren muss
			let db = new sqlite3.Database('Kassensystem.db');
			let MwSt = new Promise((resolve, rej) => {
					db.all(`SELECT MwSt
									FROM (Produkte)
									WHERE ID = ${buchung.produktId}`, (err, row) => {
							resolve(row);
					});
			});
			db.close();
			return MwSt;
	}




	/**
	 * Macht ein insert-Statement auf der Datenbank
	 * Ist asynchron (async function), sodass man auf die Datenbank-Anfrage warten kann (await)
	 * @param sql Das statement
	 * @returns {Promise<void>}
	 */
	async function runInsertStatement(sql) {
			let db = new sqlite3.Database('Kassensystem.db');
			await db.run(sql, function (err) {
					if (err) {
							return console.log("FEHLER!!!!: " + err.message);
					} else {
							return console.log("Alles gut :) Rechnung wurde in die Datenbank geschrieben")
					}

			});
			db.close();
	}





	if (req.method === 'POST' && req.url =='/doBestellung')
	{
//		console.log(req.method);
			let body = String();
//console.log(" Das ist der Warenkorb: " + body);

			req.on('data', function (data) {
					body += data;



			});
			req.on("end", () =>
			 {
					// Baue aus dem String wieder ein Objekt

					let bestellungen = JSON.parse(body);
//					console.log(bestellungen);
//					bestellungen = summiereEinzelprodukte(bestellungen)
					// TODO: Es wird noch nicht unterschieden, was genau in einer Rechnung ist, also braucht man noch Rechnungsnummern, diese muessen auch in der Datenbank stehen (neue Spalte)
					bestellungen.forEach((bestellung) =>
					{
							let stueckPreisProm = getStueckPreis(bestellung);
							let mehrwertSteuerProm = getMehrwertSteuer(bestellung);
							stueckPreisProm.then(function (stueckPreis) {
									mehrwertSteuerProm.then(function (mehrwertSteuer) {

											// TODO: Es wird noch nicht geprueft, ob ein Produkt mehrfach vorkommt --- zusammenrechen!
											let statement = `INSERT INTO Rechnungsposition (Produkt, Anzahl, Stueckpreis, MwSt)
																			 VALUES ('${bestellung.produktName}', ${bestellung.anzahl}, ${bestellung.preis},${bestellung.MwSt})`
											runInsertStatement(statement).then(() => {
											})

									});

							})

					})
			})
		}
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
	//			console.log(filename);
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
