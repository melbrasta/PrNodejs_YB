const sqlite3 = require('sqlite3');
//let db = new sqlite3.Database('../Test/Kassensystem.db');
let db = new sqlite3.Database('../Test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
	if (err) {
		console.error(err.message);
	}
	console.log('connected');
}
);


//let id = "1";
//let query= "SELECT * FROM Produkte WHERE Kategorie_ID = 1;"

//stmt = db.prepare( query );
//test=db.run(query)
//stmt.all( id,  (err, rows)=> {


	//console.log(test);
//});

//
// Das SQL-Statement wird beendet (geschlossen)
//
//stmt.finalize();

db.close();
