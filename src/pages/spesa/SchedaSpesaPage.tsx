import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import ruoliService from '../../services/RuoliService';
import SchedaRuoloValidator from '../../validators/SchedaRuoloValidator';
import spesaService from '../../services/SpesaService';
import ingredientiService from '../../services/IngredientiService';

export default function SchedaSpesaPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [dataSpesa, setDataSpesa] = React.useState<any>(params.dataSpesa !== undefined ? params.dataSpesa : "");
    const [dataInizio, setDataInizio] = React.useState<any>("");
    const [dataFine, setDataFine] = React.useState<any>("");

    const [listaSpesa, setListaSpesa] = React.useState([]);

    const getTotale = (listaSpesa: any) => {
        let numero = (listaSpesa.reduce((totale: any, ingrediente: any) => totale + ingrediente.prezzoRiferimento, 0));
        return Math.round(numero * 100) / 100;
    }

    const navigate = useNavigate();


    const getListaSpesa = async () => {
        await spesaService.getListaSpesa(utenteLoggato.token, params.dataSpesa).then(response => {
            setListaSpesa(response.data);
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

    const getIngredientiDaComprare = async () => {
        if (dataInizio === "" || dataFine === "") {
            toast.warning("Inserisci le date inizio e fine per procedere", {
                position: "top-center",
                autoClose: 5000,
            });
        } else {
            dispatch(fetchIsLoadingAction(true));
            await spesaService.getIngredientiDaComprare(utenteLoggato.token, dataInizio, dataFine).then(response => {
                setListaSpesa(response.data);
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

    }

    const inserisciSingoloIngrediente = async () => {
        if (ingredienteDaAggiungere !== "ZZZ" && ingredienteDaAggiungere) {
            let jsonBody = {
                idIngrediente: ingredienteDaAggiungere,
                dataSpesa: dataSpesa,
                note: ""
            }
            await spesaService.inserisciSpesa(utenteLoggato.token, jsonBody).then(response => {
                setIngredienteDaAggiungere("");
                getListaSpesa();
                toast.success("Ingrediente aggiunto con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
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

    const inserisciSpesa = async (spesa: any) => {
        let jsonBody = {
            idIngrediente: spesa.idIngrediente,
            dataSpesa: dataSpesa,
            note: spesa.note
        }
        let numeroOccorrenze: number = listaSpesa.filter((ingrediente: any) => ingrediente.idIngrediente === spesa.idIngrediente).length;
        let numeroInserite: number = 0;
        for (let index = 0; index < numeroOccorrenze; index++) {
            await spesaService.inserisciSpesa(utenteLoggato.token, jsonBody).then(response => {
                dispatch(fetchIsLoadingAction(false));
                numeroInserite++;
                setListaSpesa(listaSpesa.filter((ingrediente: any) => ingrediente.idIngrediente !== spesa.idIngrediente))


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
        toast.success(spesa.nome + " inserita con successo! Quantità: " + numeroInserite, {
            position: "top-center",
            autoClose: 5000,
        });

    }


    const modificaSpesa = async (spesa: any) => {
        let jsonBody = spesa;
        if (jsonBody.dataAcquisto === null) {
            jsonBody.dataAcquisto = new Date().toISOString().substring(0, 10);
        } else {
            jsonBody.dataAcquisto = false;
        }

        await spesaService.modificaSpesa(utenteLoggato.token, jsonBody, spesa.idSpesa).then(response => {
            getListaSpesa();

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


    const [spesaDaEliminare, setSpesaDaEliminare] = React.useState<any>();


    const eliminaSpesa = async () => {
        await spesaService.eliminaSpesa(utenteLoggato.token, spesaDaEliminare.idSpesa).then(response => {
            toast.success("La riga è stata eliminata con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setSpesaDaEliminare(undefined);
            getListaSpesa();


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

    const [listaIngredientiPerPietanza, setListaIngredientiPerPietanza] = React.useState([]);
    const [ingredienteDaAggiungere, setIngredienteDaAggiungere] = React.useState("");

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

    const modificaIngrediente = async (ingrediente: any, nuovoPrezzo: any) => {
        console.warn(ingrediente);
        let jsonBody = {
            nome: ingrediente.nomeIngrediente,
            prezzoRiferimento: nuovoPrezzo
        }
        await ingredientiService.modificaIngrediente(utenteLoggato.token, jsonBody, ingrediente.idIngrediente).then(response => {
            dispatch(fetchIsLoadingAction(false));
            toast.success("Prezzo aggiornato con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            getListaSpesa();
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

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.dataSpesa !== undefined) {
                getListaSpesa();
            }
            getIngredientiPerPietanza();
            setRicercaEseguita(true);
        }
    });




    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-tag text-primary fa-1x pe-2 "></i>
                            {params.idTipoRuolo === undefined ? "Inserisci" : "Modifica"} lista spesa
                        </h3>



                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Data spesa<strong className='text-danger'>*</strong></label>

                            </div>
                            <input disabled={params.dataSpesa !== undefined} name='dataSpesa' type={"date"} onChange={(e: any) => setDataSpesa(e.currentTarget.value)} className={formErrors?.dataSpesa != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci la data della spesa..."} value={dataSpesa} />

                            <small className='text-danger'>{formErrors?.dataSpesa}</small>
                        </div>



                        {params.dataSpesa === undefined &&
                            <>
                                <div className={"col-12 pt-3"}>
                                    <div className='d-flex flex-row align-items-center justify-content-between'>
                                        <label>Data inizio<strong className='text-danger'>*</strong></label>

                                    </div>
                                    <input name='dataInizio' type={"date"} onChange={(e: any) => setDataInizio(e.currentTarget.value)} className={formErrors?.dataInizio != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una data inizio..."} value={dataInizio} />

                                    <small className='text-danger'>{formErrors?.dataInizio}</small>
                                </div>

                                <div className={"col-12 pt-3"}>
                                    <div className='d-flex flex-row align-items-center justify-content-between'>
                                        <label>Data fine<strong className='text-danger'>*</strong></label>

                                    </div>
                                    <input name='dataFine' type={"date"} onChange={(e: any) => setDataFine(e.currentTarget.value)} className={formErrors?.dataFine != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una data fine..."} value={dataFine} />

                                    <small className='text-danger'>{formErrors?.dataFine}</small>
                                </div>

                                <div className={"col-12 pt-3"}>
                                    <div className="d-grid gap-2">
                                        <button onClick={getIngredientiDaComprare} className="btn btn-primary" type="button">Cerca lista ingredienti</button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-carrot text-primary fa-1x pe-2 "></i>
                            Lista delle cose da comprare - {getTotale(listaSpesa)}€
                        </h3>

                    </div>
                </div>
                {params.dataSpesa === undefined &&
                    <div className="card-body p-3">
                        <div className="row gx-4">

                            <div className='col-12 '>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead >
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Prezzo riferimento</th>
                                                <th scope="col"></th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaSpesa) && listaSpesa.map((riga: any, index: number) =>
                                                    <tr key={index}>
                                                        <td>{riga.nome}</td>
                                                        <td>{riga.prezzoRiferimento}</td>
                                                        <td className='text-center'>
                                                            <span onClick={() => inserisciSpesa(riga)} className='btn btn-primary'>Aggiungi <i className="fa-solid fa-plus "></i></span>
                                                        </td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                }


                {params.dataSpesa !== undefined &&
                    <div className="card-body p-3">
                        <div className="row gx-4">

                            <div className='col-12 '>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead >
                                            <tr>
                                                <th scope="col">Prelevato</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Prezzo riferimento</th>

                                                <th scope="col">Elimina</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaSpesa) && listaSpesa.map((riga: any, index: number) =>
                                                    <tr key={index+"ZZZ"+riga.prezzoRiferimento+riga}>
                                                        <td className='text-center'><div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={riga.dataAcquisto !== null} onClick={(e) => { modificaSpesa(riga) }} />
                                                        </div></td>
                                                        <td>{riga.nomeIngrediente}</td>
                                                        <td><input step={0.1} className='form-control' type='number' defaultValue={riga.prezzoRiferimento} onBlur={(event) => { modificaIngrediente(riga, event.currentTarget.value) }} /></td>

                                                        <td className='text-center'><span onClick={() => setSpesaDaEliminare(riga)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>

                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='col-12 col-md-10'>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Aggiungere un ingrediente</label>

                                </div>
                                <select name='idVoceMenuPadre' className={ingredienteDaAggiungere === undefined || ingredienteDaAggiungere === null || ingredienteDaAggiungere === "" || ingredienteDaAggiungere === "ZZZ" ? "form-control is-invalid" : "form-control"} onChange={(event) => { setIngredienteDaAggiungere(event.currentTarget.value) }} value={ingredienteDaAggiungere}>
                                    <option value={"ZZZ"}>Scegli...</option>
                                    {Array.isArray(listaIngredientiPerPietanza) && listaIngredientiPerPietanza.map((ingrediente: any) =>
                                        <option value={ingrediente.idIngrediente} >{ingrediente.nome} - {ingrediente.prezzoRiferimento}€</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-2 col-12'>
                                <span onClick={inserisciSingoloIngrediente} className='btn btn-primary mt-4'>Aggiungi</span>
                            </div>

                        </div>
                    </div>
                }

            </div>


            <div className="modal fade" id="eliminaRisorsa" data-bs-keyboard="false" aria-labelledby="eliminaRisorsaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaRisorsaLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi eliminare l'ingrediente <strong>{spesaDaEliminare != undefined ? spesaDaEliminare.nomeIngrediente : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaSpesa} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout >
    );

}