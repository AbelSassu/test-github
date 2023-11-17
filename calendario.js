creaGiorni(quantiGiorniNelMese)
stampaMeseNelTitolo() //si mette alla fine perché la vogliamo caricata a prescindere
const now = new Date();
//console.log(`Adesso sono le ${now}`);

const appuntamenti = [];
const elencoMesi = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const stampaMeseNelTitolo = function () {
  const titolo = document.querySelector("h1");
  const indiceMese = now.getMonth();
  const attualeMese = elencoMesi[indiceMese];
  titolo.innerText = attualeMese;
};

const quantiGiorniNelMese = function () { //per prendere l'ultimo giorno di un mese basta prendere il mese dopo e mettergli giorno 0, il browser quindi andrà a prendere il giorno prima dato che 0 non esiste
  const prendiAnno = now.getFullYear();
  const prendiMese = now.getMonth();
  const ultimoGiornoDelMese = new Date(prendiAnno, prendiMese + 1, 0);
  const numeroDelGiorno = ultimoGiornoDelMese.getDate();

  return numeroDelGiorno;
};

const deselezionaGiorni = function () { //funzione per selezionare una cella e deselezionarla
  const selezionato = document.querySelector(".selected");
  if (selezionato) selezionato.classList.remove("selected");
};

const modificaCasellaMeeting = function (indiceGiorno) { //assegnare la casella selezionata all'input meeting day
  const boxGiorno = document.querySelector("#nuovoMeetingGiorno");
  boxGiorno.classList.add("haUnGiorno"); //sta classe la gestiamo con css
  boxGiorno.innerText = indiceGiorno + 1; //indicegiorno è un argomento da mettere nella funzione, con +1 va a mostrare il primo giorno del mese
};

const creaGiorni = function (numeroDiGiorni) { //creiamo ora un ciclo per generare caselle in base ai giorni massimi del mese, quindi usando la funzione quantiGiorniNelMese
    //deve fare 3 cose questo click, deselezionare la vecchia casella, selezionare quella nuova (grazie alla classe creata prima che ora gli assegnamo) e cambiare l'input meetingfunction(e)
  const calendarioContenitore = document.querySelector("#calendario");

  for (let i = 0; i < numeroDiGiorni; i++) {
    const giornoContenitore = document.createElement("div");
    giornoContenitore.addEventListener("click", function (e) {
      e.preventDefault();
      deselezionaGiorni();
      giornoContenitore.classList.add("selected");
      modificaCasellaMeeting(i);

      if (appuntamenti[i].length > 0) {
        //mostraAppuntamenti
      } else {
        const appuntamentiContenitore = document.querySelector("#appuntamenti"); //nasconde tutto
        appuntamentiContenitore.style.display = "none"; // non sta andando
      }
    });

    const cellaTitolo = document.createElement("h3");
    cellaTitolo.innerText = i + 1;

    giornoContenitore.appendChild(cellaTitolo);
    calendarioContenitore.appendChild(giornoContenitore);
    appuntamenti.push([]);
  }
};

creaGiorni(quantiGiorniNelMese());
stampaMeseNelTitolo();