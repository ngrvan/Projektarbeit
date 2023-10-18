
// Das Formular-Element wird abgerufen.
const form = document.getElementById("meinFormular");
// Alle Eingabefelder mit der Klasse "input" werden gesammelt.
const inputFields = document.getElementsByClassName("input");
// Das Eingabefeld "anzahl" wird abgerufen.
const anzahl = document.getElementById("anzahl");
// Die Auftrags-ID wird vorübergehend gespeichert.
var auftragId;

// Ein Event-Listener wird dem Formular hinzugefügt, um das Absenden des Formulars zu behandeln.
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Das Standardverhalten des Formulars wird verhindert.

    // Schleife durchläuft alle Eingabefelder.
    for (let i = 0; i < inputFields.length; i++) {
        const input = inputFields[i];

        // Die Eingabe wird überprüft und gegebenenfalls angepasst.
        if (input.value < 0) {
            input.value = "";
            alert("Es wurde eine negative Zahl eingegeben!");
            return; // Der Prozess wird abgebrochen, wenn eine negative Zahl gefunden wird.
        }
    }

    // Die Auftrags-ID wird aus dem Eingabefeld "Auftrag_id" abgerufen.
    auftragId = document.getElementById("Auftrag_id").value;
    console.log(auftragId);

    try {
        // Eine Anfrage wird an den Server gesendet, um Auftragsdaten abzurufen.
        const response = await fetch(`/auftragArry`);
        const data = await response.json();

        // Eine Variable, um zu überprüfen, ob die Auftrags-ID bereits existiert.
        let auftragIdExists = false;

        // Schleife durchläuft alle Auftragsdaten.
        for (let i = 0; i < data.length; i++) {
            if (data[i].Auftrag_id.toString() === auftragId.toString()) {
                console.log(data[i]);
                console.log("gefunden");
                auftragIdExists = true;
                break;
            }
        }

        // Überprüfung, ob die Auftrags-ID bereits existiert.
        if (auftragIdExists) {
            alert("Auftrags-ID existiert bereits!");
        } else {
            // Eingabe wird erneut überprüft, um sicherzustellen, dass sie gültig ist.
            if (anzahl.value < 0 || isNaN(anzahl.value)) {
                alert("Es wurde eine negative Zahl oder ein ungültiges Zeichen eingegeben!");
                return; // Der Prozess wird abgebrochen, wenn eine negative Zahl oder ein ungültiges Zeichen gefunden wird.
            }

            // Bestätigung wird angezeigt und auf Fortfahren geprüft.
            if (!confirm("Möchten Sie fortfahren?")) {
                return; // Der Prozess wird abgebrochen, wenn die Bestätigung abgelehnt wird.
            }

            // Das Formular wird abgesendet.
            form.submit();
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Auftragsdaten:", error);
        alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    }
});
