import http from "../http-common";

let root = "/ingredienti.php";

const getIngredienti = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getIngredienti"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getIngrediente = (token: any, idIngrediente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getIngrediente"], ["idIngrediente", idIngrediente]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciIngrediente = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciIngrediente"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaIngrediente = (token: any, jsonBody: any, idIngrediente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaIngrediente"], ["idIngrediente", idIngrediente]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaIngrediente = (token: any, idIngrediente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaIngrediente"], ["idIngrediente", idIngrediente]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const associaIngredientePietanza = (token: any, idPietanza: any, idIngrediente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "associaIngredientePietanza"], ["idPietanza", idPietanza], ["idIngrediente", idIngrediente]]);
    const headers = {
        token: token,
    }

    return http.put(root, null, { params, headers });
}

const dissociaIngredientePietanza = (token: any, idPietanza: any, idIngrediente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "dissociaIngredientePietanza"], ["idPietanza", idPietanza], ["idIngrediente", idIngrediente]]);
    const headers = {
        token: token,
    }

    return http.put(root, null, { params, headers });
}

const getIngredientiByPietanza = (token: any, idPietanza: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getIngredientiByPietanza"], ["idPietanza", idPietanza]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const ingredientiService = {
    getIngredienti,
    getIngrediente,
    inserisciIngrediente,
    modificaIngrediente,
    eliminaIngrediente,
    associaIngredientePietanza,
    dissociaIngredientePietanza,
    getIngredientiByPietanza
};
export default ingredientiService;