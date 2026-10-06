
export default function SchedaPietanzaValidator(pietanza: any) {
    let errors: any = {};

    if (pietanza === undefined || pietanza.nome === null || pietanza.nome === "") {
        errors.nome = "Il nome è richiesto";
    }   

    return errors;
} 