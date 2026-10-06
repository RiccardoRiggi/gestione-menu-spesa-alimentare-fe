import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import ingredienteService from '../../services/IngredientiService';
import SchedaIngredienteValidator from '../../validators/SchedaIngredienteValidator';
import ingredientiService from '../../services/IngredientiService';

export default function SchedaIngredientePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [nome, setNome] = React.useState<any>("");
    const [prezzoRiferimento, setPrezzoRiferimento] = React.useState<any>("");

    const navigate = useNavigate();

    const getIngrediente = async () => {
        dispatch(fetchIsLoadingAction(true));
        await ingredienteService.getIngrediente(utenteLoggato.token, params.idIngrediente).then(response => {
            setNome(response.data.nome);
            setPrezzoRiferimento(response.data.prezzoRiferimento);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            dispatch(fetchIsLoadingAction(false));
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.prezzoRiferimento, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------
        });
    }

    const submitForm = async () => {

        let jsonBody = {
            nome: nome,
            prezzoRiferimento: prezzoRiferimento
        }

        let formsErrorTmp = SchedaIngredienteValidator(jsonBody);
        setFormErrors(formsErrorTmp);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idIngrediente === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await ingredienteService.inserisciIngrediente(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Ingrediente inserito con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/lista-ingredienti");
                }).catch(e => {
                    dispatch(fetchIsLoadingAction(false));
                    //---------------------------------------------
                    try {
                        console.error(e);
                        toast.error(e.response.data.prezzoRiferimento, {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    } catch (e: any) {
                        toast.error("Errore imprevisto", {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    }
                    if (e.response.status === 401) {
                        navigate("/logout");
                    }
                    //---------------------------------------------
                });
            } else {
                dispatch(fetchIsLoadingAction(true));
                await ingredienteService.modificaIngrediente(utenteLoggato.token, jsonBody, params.idIngrediente).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Ingrediente aggiornato con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/lista-ingredienti");
                }).catch(e => {
                    dispatch(fetchIsLoadingAction(false));
                    //---------------------------------------------
                    try {
                        console.error(e);
                        toast.error(e.response.data.prezzoRiferimento, {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    } catch (e: any) {
                        toast.error("Errore imprevisto", {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    }
                    if (e.response.status === 401) {
                        navigate("/logout");
                    }
                    //---------------------------------------------
                });
            }

        }
    }

    const [listaIngredientiPerPietanza, setListaIngredientiPerPietanza] = React.useState([]);
    const [listaIngredientiPerPietanzaFiltrata, setListaIngredientiPerPietanzaFiltrata] = React.useState([]);


    const getIngredientiPerPietanza = async () => {


        await ingredientiService.getIngredientiByPietanza(utenteLoggato.token, 0).then(response => {

            if (response.data.length !== 0) {
                setListaIngredientiPerPietanza(response.data);
            } else if (response.data.length === 0) {
                setListaIngredientiPerPietanza(response.data);
                toast.warning("Non sono stati trovati ingredienti", {
                    position: "top-center",
                    autoClose: 5000,
                });


            }
        }).catch((e: any) => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------
        });
    }

    const filtraListaIngredienti = (input: any) => {
        let listaFiltrataTmp: any = [];
        for (let index = 0; index < listaIngredientiPerPietanza.length; index++) {
            const ingrediente: any = listaIngredientiPerPietanza[index];
            if (ingrediente?.nome.toUpperCase().includes(input.toUpperCase())) {
                listaFiltrataTmp.push(ingrediente);
            }
        }
        setListaIngredientiPerPietanzaFiltrata(listaFiltrataTmp);
    }


    useEffect(() => {
        if (!ricercaEseguita) {
            if (params.idIngrediente !== undefined) {
                getIngrediente();
            }
            getIngredientiPerPietanza()
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                            {params.idIngrediente === undefined ? "Aggiungi" : "Modifica"} ingrediente
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idIngrediente === undefined ? "Inserisci ingrediente" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nome' type={"text"} onChange={(e: any) => { setNome(e.currentTarget.value); filtraListaIngredienti(e.currentTarget.value) }} className={formErrors?.nome != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome del metodo"} value={nome} />

                            <small className='text-danger'>{formErrors?.nome}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Prezzo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='prezzoRiferimento' type={"number"} step={0.1} onChange={(e: any) => setPrezzoRiferimento(e.currentTarget.value)} className={formErrors?.prezzoRiferimento != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il prezzo..."} value={prezzoRiferimento} />

                            <small className='text-danger'>{formErrors?.prezzoRiferimento}</small>
                        </div>

                        {nome.length > 1 && <><div className='col-12 pt-3'>
                            <h6>Ingredienti simili trovati: {listaIngredientiPerPietanzaFiltrata.length}</h6>
                        </div>
                            <div className='col-12 pt-3'>
                                <ul>
                                    {
                                        Array.isArray(listaIngredientiPerPietanzaFiltrata) && listaIngredientiPerPietanzaFiltrata.map((ingrediente: any, index: number) =>
                                            <li>{ingrediente.nome} - {ingrediente.prezzoRiferimento}€</li>
                                        )}
                                </ul>
                            </div></>}

                    </div>
                </div>
            </div>
        </Layout >
    );

}