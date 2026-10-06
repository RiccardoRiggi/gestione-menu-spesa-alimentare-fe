import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import ruoliService from '../../services/RuoliService';
import pietanzeService from '../../services/PietanzeService';

export default function ListaPietanzePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [pietanzaDaEliminare, setPietanzaDaEliminare] = React.useState<any>();
    const [pietanze, setPietanze] = React.useState([]);
    const [paginaPietanze, setPaginaPietanze] = React.useState(1);

    const getPietanze = async (pagina: any) => {

        if (pagina !== 0) {

            await pietanzeService.getPietanze(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setPietanze(response.data);
                    setPaginaPietanze(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setPaginaPietanze(pagina);
                    toast.warning("Non sono state trovate pietanze", {
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

    const eliminaPietanza = async () => {
        await pietanzeService.eliminaPietanza(utenteLoggato.token, pietanzaDaEliminare.idPietanza).then(response => {
            toast.success("La pietanza è stata eliminata con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setPietanzaDaEliminare(undefined);
            getPietanze(paginaPietanze);
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
            getPietanze(paginaPietanze);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                            Lista pietanze
                        </h3>
                        <Link to="/scheda-pietanza" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci pietanza</Link>

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
                                            <th scope="col">Note</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(pietanze) && pietanze.map((pietanza: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{pietanza.idPietanza}</th>
                                                    <td>{pietanza.nome}</td>
                                                    <td>{pietanza.note}</td>
                                                    <td className='text-center'><Link to={"/scheda-pietanza/" + pietanza.idPietanza} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setPietanzaDaEliminare(pietanza)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaPietanze}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getPietanze(paginaPietanze - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getPietanze(paginaPietanze + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
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
                            Vuoi eliminare la pietanza <strong>{pietanzaDaEliminare != undefined ? pietanzaDaEliminare.nome : ""}</strong> con identificativo <strong>{pietanzaDaEliminare != undefined ? pietanzaDaEliminare.idPietanza : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaPietanza} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}