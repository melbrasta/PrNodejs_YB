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
