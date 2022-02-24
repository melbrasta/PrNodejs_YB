function showSpeisen()
{
    fetch('/getSpeisen')
        .then(function (resp) {
            // Mache aus der Serverantwort Buttons
            resp.json().then((speisen) => {
                let categories = document.getElementById("categories");
                clearDiv(categories)
                speisen.forEach((speise) => {
                    categories.innerHTML += createSpeiseButton(speise.Name, speise.Preis)
                })
            })
        })
}

function createSpeiseButton(name, preis)
{
    return `<button >${name}, ${preis} €</button><br/>`
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
                categories.innerHTML += createGetraenkeButton( getraenk.Name, getraenk.Preis)
            })
        })
    })
}

function createGetraenkeButton(name, preis)
{
    return `<button >${name}, ${preis} €</button><br/>`
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
                  categories.innerHTML += createNachspeisenButton( nachspeise.Name, nachspeise.Preis)
              })
          })
      })
  }

  function createNachspeisenButton(name, preis)
  {
      return `<button >${name}, ${preis} €</button><br/>`
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
                  categories.innerHTML += createCocktailsButton( cocktail.Name, cocktail.Preis)
              })
          })
      })
  }

function createCocktailsButton(name, preis)
  {
      return `<button >${name}, ${preis} €</button><br/>`
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
                  categories.innerHTML += createCocktailsButton( Togo.Name, Togo.Preis)
              })
          })
      })
  }

  function createToGoButton(name, preis)
    {
        return `<button >${name}, ${preis} €</button><br/>`
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



function clearDiv(div)
{
    div.innerHTML = ""
}


function bestellen()
 {
    const options = {
        method: 'POST',
        body: JSON.stringify(warenkorb)
    };
    fetch('/doBestellung', options);
}
