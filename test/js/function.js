function show1()
{
  //let db = new sqlite3.Database('../Test/Kassensystem.db');
  let db = new sqlite3.Database('../test/Kassensystem.db',sqlite3.OPEN_READWRITE, (err) =>{
  	if (err) {
  		console.error(err.message);
  	}
  	let query= db.each('SELECT * FROM (Kategorien) WHERE ID = 1', (err,row)=> {
  		console.log( row);

  	});
  }
  );

}
