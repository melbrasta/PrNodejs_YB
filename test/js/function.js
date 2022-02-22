
function show1()      // Zeige alle Produkte der Kategorie 1
{
  	let query= db.each('SELECT * FROM (Kategorien) WHERE ID = 1', (err,row)=> {
  		console.log( row);

  	});

}


/*
function show2()    // Zeige alle Produkte der Kategorie 2
{
  //let db = new sqlite3.Database('../Test/Kassensystem.db');
  let db = new sqlite3.Database('../test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
  	let query= db.each('SELECT * FROM (Kategorien) WHERE ID = 2', (err,row)=> {
  		console.log( row);

  	});
  }
  );

}




function show3()    // Zeige alle Produkte der Kategorie 3
{
  //let db = new sqlite3.Database('../Test/Kassensystem.db');
  let db = new sqlite3.Database('../test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
  	let query= db.each('SELECT * FROM (Kategorien) WHERE ID = 3', (err,row)=> {
  		console.log( row);

  	});
  }
  );

}



function show4()    // Zeige alle Produkte der Kategorie 4
{
  //let db = new sqlite3.Database('../Test/Kassensystem.db');
  let db = new sqlite3.Database('../test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
  	let query= db.each('SELECT * FROM (Kategorien) WHERE ID = 4', (err,row)=> {
  		console.log( row);

  	});
  }
  );

}



function show5()    // Zeige alle Produkte der Kategorie 5
{
  //let db = new sqlite3.Database('../Test/Kassensystem.db');
  let db = new sqlite3.Database('../test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
  	let query= db.each('SELECT * FROM (Kategorien) WHERE ID = 5', (err,row)=> {
  		console.log( row);

  	});
  }
  );

}
*/
