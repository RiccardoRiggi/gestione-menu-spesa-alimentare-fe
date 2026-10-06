import http from "../http-common";

let root = "/pietanze.php";

const getPietanze = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getPietanze"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getPietanzeNoPaginate = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getPietanzeNoPaginate"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const getUltimeDateSomministrazionePietanza = (token: any, idPietanza: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getUltimeDateSomministrazionePietanza"], ["idPietanza", idPietanza]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getPietanza = (token: any, idPietanza: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getPietanza"], ["idPietanza", idPietanza]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciPietanza = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciPietanza"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaPietanza = (token: any, jsonBody: any, idPietanza: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaPietanza"], ["idPietanza", idPietanza]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaPietanza = (token: any, idPietanza: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaPietanza"], ["idPietanza", idPietanza]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}


const pietanzeService = {
    getPietanze,
    getPietanzeNoPaginate,
    getPietanza,
    inserisciPietanza,
    modificaPietanza,
    getUltimeDateSomministrazionePietanza,
    eliminaPietanza
};
export default pietanzeService;