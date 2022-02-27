function showSpeisen()
{
    fetch('/getSpeisen')
        .then(function (resp) {
            // Mache aus der Serverantwort Buttons
            resp.json().then((speisen) => {
                let categories = document.getElementById("categories");
                clearDiv(categories)
                speisen.forEach((speise) => {
                    categories.innerHTML += createSpeiseButton(speise.Name, speise.Preis, speise.MwSt)
                })
            })
        })
}


function createSpeiseButton( name, preis, MwSt)
{
  return `<button onclick="fuegeWarenKorbHinzu(1, '${name}',${preis},${MwSt})">${name},${preis} € </button><br/>`
}


function showGetraenke()   // Zeige alle Produkte der Kategorie 2 (getränke)
{
fetch('/getGetraenke')
    .then(function (resp) {
        // Mache aus der Serverantwort Buttons
        resp.json().then((getraenke) => {
            let categories = document.getElementById("categories");
            clearDiv(categories)
            getraenke.forEach((getraenk) => {
                categories.innerHTML += createGetraenkeButton( getraenk.Name, getraenk.Preis, getraenk.MwSt)
            })
        })
    })
}

function createGetraenkeButton( name, preis, MwSt)
{
    return `<button onclick="fuegeWarenKorbHinzu(1, '${name}',${preis},${MwSt})">${name},${preis} € </button><br/>`
  }


function showNachspeisen()      // Zeige alle Produkte der Kategorie 3 (Nachspeisen)
{
  fetch('/getNachspeisen')
      .then(function (resp) {
          // Mache aus der Serverantwort Buttons
          resp.json().then((nachspeisen) => {
              let categories = document.getElementById("categories");
              clearDiv(categories)
              nachspeisen.forEach((nachspeise) => {
                  categories.innerHTML += createNachspeisenButton( nachspeise.Name, nachspeise.Preis, nachspeise.MwSt)
              })
          })
      })
  }

  function createNachspeisenButton( name, preis, MwSt)
{
      return `<button onclick="fuegeWarenKorbHinzu(1, '${name}',${preis},${MwSt})">${name},${preis} € </button><br/>`
    }

function showCocktails()      // Zeige alle Produkte der Kategorie 4 (Cocktails)
{
  fetch('/getCocktails')
      .then(function (resp) {
          // Mache aus der Serverantwort Buttons
          resp.json().then((cocktails) => {
              let categories = document.getElementById("categories");
              clearDiv(categories)
              cocktails.forEach((cocktail) => {
                  categories.innerHTML += createCocktailsButton( cocktail.Name, cocktail.Preis, cocktail.MwSt)
              })
          })
      })
  }

function createCocktailsButton( name, preis, MwSt)
{
      return `<button onclick="fuegeWarenKorbHinzu(1, '${name}',${preis},${MwSt})">${name},${preis} € </button><br/>`
    }

function showToGo()      // Zeige alle Produkte der Kategorie 5 (ToGo)
{
  fetch('/getToGo')
      .then(function (resp) {
          // Mache aus der Serverantwort Buttons
          resp.json().then((togo) => {
              let categories = document.getElementById("categories");
              clearDiv(categories)
              togo.forEach((Togo) => {
                  categories.innerHTML += createCocktailsButton( Togo.Name, Togo.Preis, Togo.MwSt)
              })
          })
      })
  }

function createToGoButton( name, preis, MwSt)
{
        return `<button onclick="fuegeWarenKorbHinzu(1, '${name}',${preis},${MwSt})">${name},${preis} € </button><br/>`
      }



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





var warenkorb = [];

function fuegeWarenKorbHinzu(anzahl, produktName, preis, MwSt)
{

    warenkorb.push({
        anzahl : anzahl,
        produktName: produktName,
        preis : preis,
        MwSt : MwSt,

    });
    // Wir holen uns ein div (ueber die ID) und schreiben in sein "innerHTML"
    // (alles was im <div> ... </div> drin steht) neue Eintraege
    let warenkorbDiv = document.getElementById("test");
    clearDiv(warenkorbDiv);
    warenkorb.forEach((Warenkorb) => {
        // Erstelle eine Liste mit Warenkorbeintraegen
        console.log(Warenkorb);
        warenkorbDiv.innerHTML += `<ul><li>${Warenkorb.anzahl}x ${Warenkorb.produktName} ------ ${Warenkorb.preis} € (inkl ${Warenkorb.MwSt}% MwSt)<hr></li></ul>`

    })
    let sum=0;
warenkorb.forEach(A => sum += A.preis)
warenkorbDiv.innerHTML += `<strong>${sum.toFixed(2)}€ Gesamt</strong>`;
// return sum;
}

function clearWarenkorb()
{
warenkorb = [];
clearDiv(test)
}


function schreibeRechnung()
{
aktuellerechnung = [];
  clearDiv(rechnung);
let aktuelleRechnungDiv = document.getElementById("test");
      console.log(warenkorb);
      clearDiv(test)
      aktuelleRechnungDiv.innerHTML += '<h2>Unbezahlte Rechnung:</h2><br>'
      warenkorb.forEach((Rech) => {
        aktuellerechnung.push(Rech);
          // Erstelle eine Liste mit Warenkorbeintraegen
          console.log(aktuellerechnung);
          aktuelleRechnungDiv.innerHTML += `<ul><li>${Rech.anzahl}x ${Rech.produktName} ------ ${Rech.preis} € (inkl ${Rech.MwSt}% MwSt)<hr/></li></ul>`
      })
      let sum=0
  warenkorb.forEach(A => sum += A.preis)
  aktuelleRechnungDiv.innerHTML += `${sum.toFixed(2)}€ Gesamt`;

}

function rechnungZiehen()
{
  clearDiv(test);
  warenkorb = [];
}
// Einen Warenkorb an den Server senden (mit einem POST-Request)

function bestellen()
{
    const options = {
        method: 'POST',
        body: JSON.stringify(warenkorb)
    };
    fetch('/doBestellung', options);
    schreibeRechnung();
    console.log(warenkorb);

}

function rueckgeld ()
{
  return eingabe-sum;
}

function clearDiv(div)
{
    div.innerHTML = ""
}
