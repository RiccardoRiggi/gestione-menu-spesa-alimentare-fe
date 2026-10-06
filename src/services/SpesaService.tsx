import http from "../http-common";

let root = "/spesa.php";

const getListaSpese = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getListaSpese"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getListaSpesa = (token: any, dataSpesa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getListaSpesa"], ["dataSpesa", dataSpesa]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciSpesa = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciSpesa"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaSpesa = (token: any, jsonBody: any, idSpesa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaSpesa"], ["idSpesa", idSpesa]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaSpesa = (token: any, idSpesa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaSpesa"], ["idSpesa", idSpesa]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const getIngredientiDaComprare = (token: any, dataInizio: any, dataFine: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getIngredientiDaComprare"], ["dataInizio", dataInizio], ["dataFine", dataFine]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getDataUltimoAcquisto = (token: any, idIngrediente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getDataUltimoAcquisto"], ["idIngrediente", idIngrediente]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const spesaService = {
    getListaSpese,
    getListaSpesa,
    inserisciSpesa,
    modificaSpesa,
    eliminaSpesa,
    getIngredientiDaComprare,
    getDataUltimoAcquisto
};
export default spesaService;