import http from "../http-common";

let root = "/menuAlimentare.php";

const getMenuAlimentari = (token: any, dataInizio: any, dataFine: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMenuAlimentari"], ["dataInizio", dataInizio], ["dataFine", dataFine]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getMenuAlimentare = (token: any, idMenuAlimentare: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMenuAlimentare"], ["idMenuAlimentare", idMenuAlimentare]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciMenuAlimentare = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciMenuAlimentare"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaMenuAlimentare = (token: any, jsonBody: any, idMenuAlimentare: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaMenuAlimentare"], ["idMenuAlimentare", idMenuAlimentare]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaMenuAlimentare = (token: any, idMenuAlimentare: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaMenuAlimentare"], ["idMenuAlimentare", idMenuAlimentare]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}


const menuAlimentareService = {
    getMenuAlimentari,
    getMenuAlimentare,
    inserisciMenuAlimentare,
    modificaMenuAlimentare,
    eliminaMenuAlimentare
};
export default menuAlimentareService;