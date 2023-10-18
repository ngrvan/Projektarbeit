// Das Modul "Auftrag" wird eingefügt, um auf die Auftragsdatenbank zuzugreifen.

const Auftrag = require("../models/auftragSchema");
// Eine Funktion zum Rendern der Suchseite wird definiert.
const suche_auftrag_get = (req, res) => {
  res.render("suche", { mytite: "Suche" });
};
// Eine Funktion zum Abrufen von Auftragsinformationen im JSON-Format wird definiert.
const auftrag_json_info_get = (req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zum Abrufen aller Aufträge im JSON-Format wird definiert.
const alle_auftraege_json_get = (req, res) => {
  Auftrag.find()
    .then((result) => {
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zum Abrufen von Auftragsinformationen und Rendern der Informationsseite wird definiert.
const auftrag_id_information_get = (req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
      res.render("information", {
        mytite: "Auftrag-Inrformation",
        objekt_Auftrag: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zum Löschen eines Auftrags wird definiert.
const delete_auftrag_id_delete = (req, res) => {
  Auftrag.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ Link: "/alle" });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zum Abrufen von Auftragsinformationen für die Aktualisierung wird definiert.
const update_auftrag_id_get = (req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
      res.render("update", { mytite: "Update", obAuftrag: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zum Abrufen von Auftragsinformationen im JSON-Format für die Aktualisierung wird definiert.
const auftrag_update_jsonId_get = (req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zur Aktualisierung eines Auftrags wird definiert.
const update_auftrag_id_put = (req, res) => {
  console.log(req.body);
  let neuAuftrag = req.body;
  let kundeId = neuAuftrag.kundeId;
  let auftragId = neuAuftrag.auftragsId;
  let LieferdatumUpdate = neuAuftrag.LieferdatumUpdate;
  let anzahlUpdate = neuAuftrag.AnzahlUpdate;
  let ankommenDatumupdate = neuAuftrag.ankommendeDatumUpdate;
  let logistikIDupdate = neuAuftrag.logistikIDupdate;
  let serviceDiskIDupdate = neuAuftrag.serviceDiskIDupdate;
  let systemKonfigirationIDupdate = neuAuftrag.systemKonfigirationIDupdate;
  let profisionalServiceIDupdate = neuAuftrag.profisionalServiceIDupdate;
  const id = req.params.id;

  let updatePromises = [];

  updatePromises.push(
    Auftrag.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          Auftrag_id: auftragId,
          Kunde_ID: kundeId,
          Lieferdatum: LieferdatumUpdate,
          Anzahl: anzahlUpdate,
          ankommendeDatum: ankommenDatumupdate,
          logistikID: logistikIDupdate,
          serviceDiskID: serviceDiskIDupdate,
          systemKonfigirationID: systemKonfigirationIDupdate,
          profisionalServiceID: profisionalServiceIDupdate,
        },
      }
    )
  );

  Promise.all(updatePromises)
    .then((results) => {
      res.json({ Link: "/alle" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Fehler beim Aktualisieren des Auftrags" });
    });
};
// Eine Funktion zum Rendern von Auftragsdaten basierend auf Kunden-JSON-Daten wird definiert.
const kundeid_auftraege_get = (req, res) => {
  var auftragsDaten = JSON.parse(req.params.json);
  res.render("alle", { mytite: "Suchergebnis", arrAuftrag: auftragsDaten });
};
// Eine Funktion zum Abrufen und Rendern aller Aufträge wird definiert.
const alle_auftraege_get = (req, res) => {
  Auftrag.find()
    .then((result) => {
      res.render("alle", { mytite: "Alle-Aufträge", arrAuftrag: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Eine Funktion zum Hinzufügen eines neuen Auftrags wird definiert.
const add_auftrag_post = (req, res) => {
  const auftrag = new Auftrag(req.body);
  console.log(req.body);
  auftrag
    .save()
    .then((result) => {
      res.redirect("/alle");
    })
    .catch((err) => {
      console.log(err);
    });
};
// Exportieren Sie alle definierten Funktionen als Modul.
module.exports = {
  auftrag_json_info_get,
  alle_auftraege_json_get,
  auftrag_id_information_get,
  delete_auftrag_id_delete,
  update_auftrag_id_get,
  auftrag_update_jsonId_get,
  update_auftrag_id_put,
  alle_auftraege_get,
  add_auftrag_post,
  suche_auftrag_get,
  kundeid_auftraege_get,
};
