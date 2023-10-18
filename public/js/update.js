 
        const btn = document.querySelector(".create");
        const obAuftragID = btn.getAttribute("data-linkid");
        
        let Auftrag_id = document.getElementById("Auftrag_id");
        let Kunde_ID = document.getElementById("Kunde_ID");
        let Lieferdatum = document.getElementById("Lieferdatum");
        let anzahl=document.getElementById("anzahl");
        
        let ankommenDatum=document.getElementById("ankommenDatum");
        let logistikID=document.getElementById("logistikID");
        let serviceDiskID=document.getElementById("serviceDiskID");
        let systemKonfigirationID=document.getElementById("systemKonfigirationID");
        let profisionalServiceID=document.getElementById("profisionalServiceID");


        
        fetch(`/updateJson/${obAuftragID}`)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            _id = data._id;
             console.log(_id);
            Auftrag_id.setAttribute("value", data.Auftrag_id);
            Kunde_ID.setAttribute("value", data.Kunde_ID);
            Lieferdatum.setAttribute("value", data.Lieferdatum);
            anzahl.setAttribute("value",data.Anzahl);
            ankommenDatum.setAttribute("value",data.ankommendeDatum);
            logistikID.setAttribute("value",data.logistikID);
            serviceDiskID.setAttribute("value",data.serviceDiskID);
            systemKonfigirationID.setAttribute("value",data.systemKonfigirationID);
            profisionalServiceID.setAttribute("value",data.profisionalServiceID);
          
          });
        
          const form = document.getElementById("meinFormular");
        
          form.addEventListener("submit", (event) => {
            if (anzahl.value < 0 || isNaN(anzahl.value) ||  Auftrag_id.value < 0 || Kunde_ID.value < 0) {
              event.preventDefault();
              anzahl.value = "";
              alert("Sie haben eine negative Zahl oder ein ungültiges Zeichen eingegeben!");
            } else {
             
              if (confirm("Möchten Sie den Auftrag ändern?")) {
                event.preventDefault();
                const kundeId = Kunde_ID.value;
                const auftragsId = Auftrag_id.value;
                const LieferdatumUpdate = Lieferdatum.value;
            
                var AnzahlUpdate = anzahl.value;
                var ankommendeDatumUpdate = ankommenDatum.value;
                var logistikIDupdate = logistikID.value;
                var serviceDiskIDupdate = serviceDiskID.value;
                var systemKonfigirationIDupdate = systemKonfigirationID.value;
                var profisionalServiceIDupdate = profisionalServiceID.value;
          
                const id = _id;
                console.log(id);
          
                const daten = JSON.stringify({
                  _id,
                  auftragsId,
                  kundeId,
                  LieferdatumUpdate,
                  AnzahlUpdate,
                  ankommendeDatumUpdate,
                  logistikIDupdate,
                  serviceDiskIDupdate,
                  systemKonfigirationIDupdate,
                  profisionalServiceIDupdate
                });
                
                console.log(daten);
          
                fetch(`/update/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: daten,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    window.location.href = data.Link;
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }
            }
            event.preventDefault();
          });
          