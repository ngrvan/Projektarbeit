const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Ein Schema wird definiert, um die Struktur des Artikels festzulegen.
const auftragSchema = new Schema({
  Auftrag_id: Number,
  Kunde_ID: Number,
  Lieferdatum: String,
  Anzahl: Number,
  ankommendeDatum: String,
  logistikID: String,
  serviceDiskID: String,
  profisionalServiceID: String,
  systemKonfigirationID: String,
});

// Das Modell "Auftrag" wird erstellt, das auf dem auftragSchema basiert.
const Auftrag = mongoose.model('Auftrag', auftragSchema);
module.exports = Auftrag;
