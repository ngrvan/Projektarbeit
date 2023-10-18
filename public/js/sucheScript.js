/* 
let inputId = document.getElementById("Auftrag_ID");
let inputKunde= document.getElementById("Kunde_ID");
var meinFormular = document.getElementById("meinFormular");

var ergebnis = document.getElementById("ergebnis");
var suchButton = document.getElementById("suchButton");
var kundeIdInputValue="";
var eingegebenerText = "";

suchButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Eingegebener Text:", eingegebenerText);

  kundeIdInputValue = document.getElementById("Kunde_ID").value;
  eingegebenerText = document.getElementById("Auftrag_ID").value;
  console.log("TEXT: " + eingegebenerText);

  var AuftragIDGefunden = false;
  fetch(`/auftragArry`)
    .then((result) => {
      return result.json();
    })
    .then((data) => {

      var objekteFuerKunde = [];
     
      data.forEach((element) => {
      
        if ((parseInt(eingegebenerText)=== element.Auftrag_id) ) {
      
          console.log("fall gefunden");
          AuftragIDGefunden = true;
          meineURL = `/auftrag-informationen/${element._id}`;
          window.location.href = meineURL;
        }
        if(((parseInt(kundeIdInputValue)=== element.Kunde_ID))){
          objekteFuerKunde.push(element);               
        }
     });

     if(AuftragIDGefunden == false){           
        var toJson = JSON.stringify(objekteFuerKunde);
        meineURL = `/suche/${toJson}`;
        window.location.href = meineURL; 
    }   
     
    



    });
  });
    */
   // Initialisieren von Eingabefeldern und anderen relevanten HTML-Elementen.
let inputId = document.getElementById("Auftrag_ID");
let inputKunde = document.getElementById("Kunde_ID");
var meinFormular = document.getElementById("meinFormular");
var ergebnis = document.getElementById("ergebnis");
var suchButton = document.getElementById("suchButton");

// Variablen zur Speicherung von Benutzereingaben.
var kundeIdInputValue = "";
var eingegebenerText = "";

// EventListener zum Such-Button hinzufügen.
suchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Verhindern des Standardverhaltens des Formulars.

  // Erfassen der eingegebenen Werte aus den Eingabefeldern.
  kundeIdInputValue = document.getElementById("Kunde_ID").value;
  eingegebenerText = document.getElementById("Auftrag_ID").value;

  // Variable zur Überprüfung, ob eine Auftrags-ID gefunden wurde.
  var AuftragIDGefunden = false;

  // Senden einer Anfrage an den Server, um Auftragsdaten abzurufen.
  fetch(`/auftragArry`)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      // Array zur Speicherung von Objekten, die dem Kunden entsprechen.
      var objekteFuerKunde = [];

      data.forEach((element) => {
        // Überprüfen, ob die eingegebene Auftrags-ID im Array vorhanden ist.
        if (parseInt(eingegebenerText) === element.Auftrag_id) {
          AuftragIDGefunden = true;
          meineURL = `/auftrag-informationen/${element._id}`;
          window.location.href = meineURL; // Weiterleitung zu den Auftragsinformationen.
        }

        // Überprüfen, ob die eingegebene Kunde-ID im Array vorhanden ist.
        if (parseInt(kundeIdInputValue) === element.Kunde_ID) {
          objekteFuerKunde.push(element);
        }
      });

      if (AuftragIDGefunden === false) {
        // Wenn die Auftrags-ID nicht gefunden wurde,  leiten zu den Suchergebnissen für den Kunden weiter.
        var toJson = JSON.stringify(objekteFuerKunde);
        meineURL = `/suche/${toJson}`;
        window.location.href = meineURL;
      }
    });
});
