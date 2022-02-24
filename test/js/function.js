function showSpeisen() {
    fetch('/getSpeisen')
        .then(function (resp) {
            // Mache aus der Serverantwort Buttons
            resp.json().then((speisen) => {
                let categories = document.getElementById("categories");
                clearDiv(categories)
                speisen.forEach((speise) => {
                    categories.innerHTML += createSpeiseButton(speise.ID, speise.Name)
                })
            })
        })
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

// function fuegeWarenKorbHinzu(kategorieId, produktId, produktName) {
//     warenkorb.push({
//         kategorieId: kategorieId,
//         produktId: produktId,
//         produktName: produktName,
//     });
//     // Wir holen uns ein div (ueber die ID) und schreiben in sein "innerHTML"
//     // (alles was im <div> ... </div> drin steht) neue Eintraege
//     let warenkorbDiv = document.getElementById("warenkorb");
//     clearDiv(warenkorbDiv);
//     warenkorb.forEach((produkt) => {
//         // Erstelle eine Liste mit Warenkorbeintraegen
//         warenkorbDiv.innerHTML += `<li>${produkt.produktName}</li>`
//     })
// }


function createSpeiseButton(id, name) {
    return `<button >${name}</button><br/>`
}

function clearDiv(div) {
    div.innerHTML = ""
}


function bestellen() {
    const options = {
        method: 'POST',
        body: JSON.stringify(warenkorb)
    };
    fetch('/doBestellung', options);
}
