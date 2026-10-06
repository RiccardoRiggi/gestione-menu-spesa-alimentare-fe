export default function SchedaCategoriaValidator(contoCorrente: any) {
    let errors: any = {};

    if (contoCorrente === undefined || contoCorrente.nomeCategoria === null || contoCorrente.nomeCategoria === "") {
        errors.nomeCategoria = "Il nome è richiesto";
    }

    if (contoCorrente === undefined || contoCorrente.descrizioneCategoria === null || contoCorrente.descrizioneCategoria === "") {
        errors.descrizioneCategoria = "La descrizione è richiesta";
    }

    if (contoCorrente === undefined || contoCorrente.coloreCategoria === null || contoCorrente.coloreCategoria === "") {
        errors.coloreCategoria = "Il colore è richiesto";
    }

    if (contoCorrente === undefined || contoCorrente.iconaCategoria === null || contoCorrente.iconaCategoria === "") {
        errors.iconaCategoria = "L'icona è richiesta";
    }

    if (contoCorrente === undefined || contoCorrente.isEsclusaDalTotale === null || contoCorrente.isEsclusaDalTotale === "") {
        errors.isEsclusaDalTotale = "Dato richiesto";
    }


    return errors;
} 