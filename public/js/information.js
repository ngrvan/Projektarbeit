
    // Ein Element mit der Klasse "Delete" wird gesucht, und die Auftrags-ID wird aus dem Attribut "data-linkid" geholt.
const btn = document.querySelector(".Delete");
const auftragID = btn.getAttribute("data-linkid");

// Ein Event Listener wird zum Löschen-Button hinzugefügt.
btn.addEventListener("click", (e) => {
  if (confirm("Möchte der Benutzer den Auftrag wirklich löschen?")) {
    // Eine DELETE-Anfrage wird an den Server gesendet, um den Auftrag zu löschen.
    fetch(`/auftrag-informationen/${auftragID}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.Link)) // Nach dem Löschen erfolgt eine Weiterleitung.
      .catch((err) => {
        console.log(err);
      });
  }
});

// Weitere Elemente und Formularfelder werden geholt.
const anzahl = document.getElementById("anzahl");
const ankommenDatum = document.getElementById("ankommenDatum");
const systemConfSelect = document.getElementById("SystemConfSelect");
const profisionalSelect = document.getElementById("profisionalSelect");
const logistikSelect = document.getElementById("logistikSelect");
const serviceSelect = document.getElementById("serviceSelect");

// Eine Anfrage wird gesendet, um Auftragsinformationen abzurufen.
fetch(`/auftragInfo/${auftragID}`).then((result) => {
  return result.json();
}).then((data) => {
  // Die erhaltenen Auftragsinformationen werden in den entsprechenden Formularfeldern angezeigt.
  anzahl.innerHTML = data.Anzahl;
  ankommenDatum.innerHTML = data.ankommendeDatum;

  // Optionen werden zu den Dropdown-Listen hinzugefügt.
  const optionLogistik = document.createElement("option");
  optionLogistik.text = data.logistikID;
  logistikSelect.add(optionLogistik);

  const optionSystem = document.createElement("option");
  optionSystem.text = data.systemKonfigirationID;
  systemConfSelect.add(optionSystem);

  const optionService = document.createElement("option");
  optionService.text = data.serviceDiskID;
  serviceSelect.add(optionService);

  const optionProfisional = document.createElement("option");
  optionProfisional.text = data.profisionalServiceID;
  profisionalSelect.add(optionProfisional);
});
