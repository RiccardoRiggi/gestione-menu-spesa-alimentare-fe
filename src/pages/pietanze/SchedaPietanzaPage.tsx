import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import ruoliService from '../../services/RuoliService';
import SchedaRuoloValidator from '../../validators/SchedaRuoloValidator';
import pietanzeService from '../../services/PietanzeService';
import SchedaPietanzaValidator from '../../validators/SchedaPietanzaValidator';
import ingredientiService from '../../services/IngredientiService';

export default function SchedaPietanzaPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [nome, setNome] = React.useState<any>("");
    const [note, setNote] = React.useState<any>("");


    const navigate = useNavigate();


    const getPietanza = async () => {
        dispatch(fetchIsLoadingAction(true));
        await pietanzeService.getPietanza(utenteLoggato.token, params.idPietanza).then(response => {
            setNome(response.data.nome);
            setNote(response.data.note);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            dispatch(fetchIsLoadingAction(false));
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

    const submitForm = async () => {

        let jsonBody = {
            nome: nome,
            note: note
        }

        let formsErrorTmp = SchedaPietanzaValidator(jsonBody);

        setFormErrors(formsErrorTmp);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idPietanza === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await pietanzeService.inserisciPietanza(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Pietanza inserita con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/scheda-pietanza/" + response.data);
                    getIngredientiPerPietanza(paginaIngredientiPerPietanza);
                }).catch(e => {
                    dispatch(fetchIsLoadingAction(false));
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
            } else {
                dispatch(fetchIsLoadingAction(true));
                await pietanzeService.modificaPietanza(utenteLoggato.token, jsonBody, params.idPietanza).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Pietanza aggiornata con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    getIngredientiPerPietanza(paginaIngredientiPerPietanza);
                }).catch(e => {
                    dispatch(fetchIsLoadingAction(false));
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

        }
    }

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idPietanza !== undefined) {
                getPietanza();
                getIngredientiPerPietanza(paginaIngredientiPerPietanza);

            }
            setRicercaEseguita(true);
        }
    });

    const [listaIngredientiPerPietanza, setListaIngredientiPerPietanza] = React.useState([]);
    const [paginaIngredientiPerPietanza, setPaginaIngredientiPerPietanza] = React.useState(1);


    const getIngredientiPerPietanza = async (pagina: any) => {

        if (pagina !== 0) {

            await ingredientiService.getIngredientiByPietanza(utenteLoggato.token, params.idPietanza).then(response => {

                if (response.data.length !== 0) {
                    setListaIngredientiPerPietanza(response.data);
                    setPaginaIngredientiPerPietanza(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaIngredientiPerPietanza(response.data);
                    toast.warning("Non sono stati trovati ingredienti", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }


            }).catch(e => {
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
    }

    const cambiaAbilitazioneIngrediente = async (usatoNellaPietanza: any, idIngrediente: any) => {
        if (usatoNellaPietanza === "N") {
            await ingredientiService.associaIngredientePietanza(utenteLoggato.token, params.idPietanza, idIngrediente).then(response => {
                getIngredientiPerPietanza(paginaIngredientiPerPietanza);
                toast.success("Ingrediente aggiunto con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }).catch(e => {
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
        } else {
            await ingredientiService.dissociaIngredientePietanza(utenteLoggato.token, params.idPietanza, idIngrediente).then(response => {
                getIngredientiPerPietanza(paginaIngredientiPerPietanza);
                toast.success("Ingrediente rimosso con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }).catch(e => {
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
    }



    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-hotdog text-primary fa-1x pe-2 "></i>
                            {params.idPietanza === undefined ? "Aggiungi" : "Modifica"} pietanza
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idPietanza === undefined ? "Inserisci pietanza" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nome' type={"text"} onChange={(e: any) => setNome(e.currentTarget.value)} className={formErrors?.nome != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome..."} value={nome} />

                            <small className='text-danger'>{formErrors?.nome}</small>
                        </div>




                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Note</label>

                            </div>
                            <input name='note' type={"text"} onChange={(e: any) => setNote(e.currentTarget.value)} className={formErrors?.note != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci delle note..."} value={note} />

                            <small className='text-danger'>{formErrors?.note}</small>
                        </div>

                    </div>
                </div>
            </div>

            {params.idPietanza !== undefined &&
                <div className="card shadow-lg mx-1 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-carrot text-primary fa-1x pe-2 "></i>
                                Lista ingredienti
                            </h3>

                        </div>
                    </div>
                    <div className="card-body p-3">
                        <div className="row gx-4">

                            <div className='col-12 '>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead >
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Prezzo riferimento</th>
                                                <th scope="col">Abilitato</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaIngredientiPerPietanza) && listaIngredientiPerPietanza.map((ingrediente: any, index: number) =>
                                                    <tr key={index}>
                                                        <th className='text-center' scope="row">{ingrediente.idIngrediente}</th>
                                                        <td>{ingrediente.nome}</td>
                                                        <td>{ingrediente.prezzoRiferimento}</td>

                                                        <td className='text-center'><div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={ingrediente.usatoNellaPietanza !== "N"} onClick={(e) => { cambiaAbilitazioneIngrediente(ingrediente.usatoNellaPietanza, ingrediente.idIngrediente) }} />
                                                        </div></td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                           
                        </div>
                    </div>

                </div>
            }


        </Layout >
    );

}