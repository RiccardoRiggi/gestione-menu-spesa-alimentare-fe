
import axios from "axios";
export default axios.create({
    baseURL: "http://localhost/GitHub-Repository/gestione-menu-spesa-alimentare-be/rest",
    headers: {
        "Content-type": "application/json",
    }
});

