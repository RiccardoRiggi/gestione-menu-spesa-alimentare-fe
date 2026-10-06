import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import risorseService from '../../services/RisorseService';
import ingredientiService from '../../services/IngredientiService';
import menuAlimentareService from '../../services/MenuAlimentareService';
import { getData } from '../../DateUtil';
import comboService from '../../services/ComboService';
import pietanzeService from '../../services/PietanzeService';

export default function MenuAlimentarePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const params = useParams();

    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [menuAlimentareDaEliminare, setMenuAlimentareDaEliminare] = React.useState<any>();

    const [listaMenuAlimentare, setListaMenuAlimentare] = React.useState([]);

    const [listaTipoPasti, setListaTipoPasti] = React.useState([]);


    const [elencoGiorniSettimanaTemplate, setElencoGiorniSettimanaTemplate] = React.useState([0, 1, 2, 3, 4, 5, 6]);

    const cambiaSettimana = (numero: number) => {
        let startTmp = "";
        let endTmp = "";

        let startDateTmp = new Date(params.dataInizio !== undefined ? params.dataInizio : "");
        let endDateTmp = new Date(params.dataFine !== undefined ? params.dataFine : "");

        startDateTmp = new Date(startDateTmp.setTime(startDateTmp.getTime() + 1000 * 60 * 60 * 24 * numero));
        endDateTmp = new Date(endDateTmp.setTime(endDateTmp.getTime() + 1000 * 60 * 60 * 24 * numero));

        startTmp = startDateTmp.toISOString().substring(0, 10);
        endTmp = endDateTmp.toISOString().substring(0, 10);



        navigate("/menu-alimentare/" + startTmp + "/" + endTmp + "");
    }

    useEffect(() => {
        if (params.dataInizio === undefined || params.dataFine === undefined) {
            let startTmp = "";
            let endTmp = "";

            let d = new Date();
            var day = d.getDay();
            let diff = d.getDate() - day + (day == 0 ? -6 : 1);
            let startDateTmp = new Date(d.setDate(diff));
            startTmp = startDateTmp.toISOString().substring(0, 10);
            let endDateTmp = new Date(d.setDate(startDateTmp.getDate() + 6));
            endTmp = endDateTmp.toISOString().substring(0, 10);


            navigate("/menu-alimentare/" + startTmp + "/" + endTmp + "");
        } else {
            getMenuAlimentari();
        }
        getListaPietanze();
    }, [params.dataInizio, params.dataFine]);

    const getMenuAlimentari = async () => {
        await comboService.getComboTipoPasto(utenteLoggato.token).then(response => {
            setListaTipoPasti(response.data);
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

        await menuAlimentareService.getMenuAlimentari(utenteLoggato.token, params.dataInizio, params.dataFine).then(response => {

            if (response.data.length !== 0) {
                setListaMenuAlimentare(response.data);
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

    const eliminaMenuAlimentare = async () => {
        await menuAlimentareService.eliminaMenuAlimentare(utenteLoggato.token, menuAlimentareDaEliminare.idMenuAlimentare).then(response => {
            toast.success("Menu eliminato con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setMenuAlimentareDaEliminare(undefined);
            getMenuAlimentari();


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

    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getMenuAlimentari();
        }
    }, []);

    const addDays = (days: number): Date => {
        var date = new Date(params.dataInizio !== undefined ? params.dataInizio : "");
        date.setDate(date.getDate() + days);
        return date;
    }

    const [tipoPastoDaInserire, setTipoPastoDaInserire] = React.useState<any>();
    const [dataDaInserire, setDataDaInserire] = React.useState<any>();

    const submitForm = async () => {

        let jsonBody = {
            idTipoPasto: tipoPastoDaInserire.idTipoPasto,
            dataPasto: dataDaInserire,
            idPietanza: idPietanza,
            note: note
        }

        await menuAlimentareService.inserisciMenuAlimentare(utenteLoggato.token, jsonBody).then(response => {
            toast.success("Pasto inserito con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setDataDaInserire(undefined);
            setTipoPastoDaInserire(undefined);
            setIdPietanza("ZZZ");
            setListaUltimeDateSomministrazione([]);
            getMenuAlimentari();
            getListaPietanze();

        }).catch(e => {
            setDataDaInserire(undefined);
            setTipoPastoDaInserire(undefined);
            setListaUltimeDateSomministrazione([]);
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
    const [note, setNote] = React.useState<any>("");

    const [idPietanza, setIdPietanza] = React.useState<any>("ZZZ");
    const [listaPietanze, setListaPietanze] = React.useState([]);


    const aggiornaPietanza = (event: any) => {
        setIdPietanza(event.target.value);
        getUltimeDateSomministrazionePietanza(event.target.value);
    }

    const getListaPietanze = async () => {
        await pietanzeService.getPietanzeNoPaginate(utenteLoggato.token).then(response => {
            setListaPietanze(response.data);
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

    const [listaUltimeDateSomministrazione, setListaUltimeDateSomministrazione] = React.useState([]);

    const getUltimeDateSomministrazionePietanza = async (idPietanza: any) => {
        await pietanzeService.getUltimeDateSomministrazionePietanza(utenteLoggato.token, idPietanza).then(response => {
            setListaUltimeDateSomministrazione(response.data);
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

    const getDifferenzaInGiorni = (dataA: any, dataB: any) => {
        const date1 = new Date(dataA);
        const date2 = new Date(dataB);
        const diffTime = (date2.getTime() - date1.getTime());
        const diffDays = (diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
            return "oggi";
        } else if (diffDays < 0) {
            return (diffDays * -1) + " giorni fa";
        } else if (diffDays > 0) {
            return "tra " + (diffDays) + " giorni";
        } else {
            return "";
        }
    }

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-calendar-days text-primary fa-1x pe-2 "></i>
                            Menu alimentare
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">


                        {Array.isArray(elencoGiorniSettimanaTemplate) && elencoGiorniSettimanaTemplate.map((giorno: any, index: number) =>
                            <div className='col-12 border-bottom border-danger border-2 mb-2'>
                                <div className='row'>

                                    <h4>{addDays(giorno).toLocaleDateString("it-IT", { weekday: 'long' }).charAt(0).toUpperCase() + addDays(giorno).toLocaleDateString("it-IT", { weekday: 'long' }).slice(1)} {getData(addDays(giorno))}</h4>
                                    {Array.isArray(listaTipoPasti) && listaTipoPasti.map((tipoPasto: any, index: number) =>
                                        <div className='col-12 pb-3'>
                                            <ul className="list-group">
                                                <li className="list-group-item"><strong>{tipoPasto.nome} <i onClick={() => { setDataDaInserire(addDays(giorno).toISOString().substring(0, 10)); setTipoPastoDaInserire(tipoPasto); setListaUltimeDateSomministrazione([]); }} style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#inserisciPasto" className="fa-solid fa-plus text-danger ps-3"></i></strong></li>
                                                {Array.isArray(listaMenuAlimentare) && listaMenuAlimentare.map((pasto: any, index: number) =>
                                                    <>
                                                        {pasto.dataPasto === addDays(giorno).toISOString().substring(0, 10) && pasto.idTipoPasto === tipoPasto.idTipoPasto &&
                                                            <li className="list-group-item">{pasto.nomePietanza} {pasto.noteMenuAlimentare !== "" ? "(" + pasto.noteMenuAlimentare + ")" : ""} <i style={{ cursor: 'pointer' }} onClick={() => setMenuAlimentareDaEliminare(pasto)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className="fa-solid fa-trash-can text-danger ps-3"></i></li>
                                                        }

                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => cambiaSettimana(-7)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Settimana precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => cambiaSettimana(+7)} className='btn btn-primary'>Settimana successiva<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="eliminaRisorsa" data-bs-keyboard="false" aria-labelledby="eliminaRisorsaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaRisorsaLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi eliminare la pietanza <strong>{menuAlimentareDaEliminare != undefined ? menuAlimentareDaEliminare.nomePietanza : ""}</strong> prevista per <strong>{menuAlimentareDaEliminare != undefined ? menuAlimentareDaEliminare.nomeTipoPasto : ""}</strong> per {menuAlimentareDaEliminare !== undefined ? new Date(menuAlimentareDaEliminare.dataPasto).toLocaleDateString("it-IT", { weekday: 'long' }) : ""} <strong>{menuAlimentareDaEliminare != undefined ? getData(menuAlimentareDaEliminare.dataPasto) : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaMenuAlimentare} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="inserisciPasto" data-bs-keyboard="false" aria-labelledby="inserisciPastoLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="inserisciPastoLabel">Inserisci {tipoPastoDaInserire != undefined ? tipoPastoDaInserire.nome : ""} per il giorno {menuAlimentareDaEliminare !== undefined ? new Date(dataDaInserire).toLocaleDateString("it-IT", { weekday: 'long' }) : ""} {dataDaInserire != undefined ? getData(dataDaInserire) : ""}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className={"col-12"}>
                                    <div className='d-flex flex-row align-items-center justify-content-between'>
                                        <label>Pasto</label>

                                    </div>
                                    <select name='idVoceMenuPadre' className={idPietanza === undefined || idPietanza === null || idPietanza === "" || idPietanza === "ZZZ" ? "form-control is-invalid" : "form-control"} onChange={aggiornaPietanza} value={idPietanza}>
                                        <option value={"ZZZ"}>Scegli...</option>
                                        {Array.isArray(listaPietanze) && listaPietanze.map((pietanza: any) =>
                                            <option value={pietanza.idPietanza} >{pietanza.nome}</option>
                                        )}
                                    </select>
                                </div>
                                <div className={"col-12 pt-3"}>
                                    <div className='d-flex flex-row align-items-center justify-content-between'>
                                        <label>Note</label>

                                    </div>
                                    <input name='note' type={"text"} onChange={(e: any) => setNote(e.currentTarget.value)} className={"form-control"} placeholder={"Inserisci una nota..."} value={note} />
                                </div>
                                <div className='col-12 pt-3'>
                                    <ul className="list-group">
                                        <label>Cronologia rispetto alla data {getData(dataDaInserire)}</label>
                                        {Array.isArray(listaUltimeDateSomministrazione) && listaUltimeDateSomministrazione.map((data: any, index: number) =>
                                            <li className="list-group-item">{getData(data.dataPasto)} - {getDifferenzaInGiorni(dataDaInserire, data.dataPasto)} {data.note !== "" ? "(" + data.note + ")" : ""}</li>

                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button disabled={idPietanza === undefined || idPietanza === null || idPietanza === "" || idPietanza === "ZZZ"} onClick={submitForm} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Salva<i className="fa-solid fa-save ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}