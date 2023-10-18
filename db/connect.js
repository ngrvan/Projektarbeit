// Die Konfiguration für die Verwendung von Umgebungsvariablen aus der .env-Datei wird aktiviert.
require('dotenv').config(); 

const mongoose = require("mongoose");

// Der Benutzername und das Passwort werden aus den Umgebungsvariablen gelesen.
const username = encodeURIComponent(process.env.BENUTZERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const database = "workflow";

// Eine Verbindungszeichenfolge zur MongoDB-Datenbank wird erstellt, die die zuvor erhaltenen Informationen verwendet.
const connectionString = `mongodb+srv://${username}:${password}@cluster0.p8cajgr.mongodb.net/${database}?retryWrites=true&w=majority`

// Die Funktion zum Herstellen einer Verbindung zur Datenbank wird definiert.
const connectDB = (url) => {
    // Die Verbindung zur MongoDB-Datenbank wird hergestellt, wobei die zuvor erstellte Verbindungszeichenfolge verwendet wird.
    return mongoose.connect(connectionString, {

    })
}

// Die Verbindung zur Datenbank wird exportiert, um sie in anderen Teilen der Anwendung zu verwenden.
module.exports = connectDB;
