export default function SchedaContoCorrenteValidator(contoCorrente: any) {
    let errors: any = {};

    if (contoCorrente === undefined || contoCorrente.nomeContoCorrente === null || contoCorrente.nomeContoCorrente === "") {
        errors.nomeContoCorrente = "Il nome è richiesto";
    }

    if (contoCorrente === undefined || contoCorrente.descrizioneContoCorrente === null || contoCorrente.descrizioneContoCorrente === "") {
        errors.descrizioneContoCorrente = "La descrizione è richiesta";
    }

    if (contoCorrente === undefined || contoCorrente.dataInizio === null || contoCorrente.dataInizio === "") {
        errors.dataInizio = "La data inizio validità è richiesta";
    }

    if (contoCorrente === undefined || contoCorrente.dataFine === null || contoCorrente.dataFine === "") {
        errors.dataFine = "La data fine validità è richiesta";
    }


    return errors;
} 