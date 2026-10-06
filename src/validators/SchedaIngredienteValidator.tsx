export default function SchedaIngredienteValidator(ingrediente: any) {
    let errors: any = {};

    if (ingrediente === undefined || ingrediente.nome === null || ingrediente.nome === "") {
        errors.nome = "Il nome è richiesta";
    }
    
    if (ingrediente === undefined || ingrediente.prezzoRiferimento === null || ingrediente.prezzoRiferimento === "") {
        errors.prezzoRiferimento = "Il prezzo è richiesto";
    }

    return errors;
} 