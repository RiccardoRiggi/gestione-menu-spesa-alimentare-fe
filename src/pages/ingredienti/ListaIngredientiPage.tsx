import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import risorseService from '../../services/RisorseService';
import ingredientiService from '../../services/IngredientiService';

export default function ListaIngredientiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [ingredienteDaEliminare, setIngredienteDaEliminare] = React.useState<any>();

    const [ingredienti, setIngredienti] = React.useState([]);
    const [paginaIngredienti, setPaginaIngredienti] = React.useState(1);

    const getIngredienti = async (pagina: any) => {

        if (pagina !== 0) {

            await ingredientiService.getIngredienti(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setIngredienti(response.data);
                    setPaginaIngredienti(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setIngredienti(response.data);
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

    const eliminaIngrediente = async () => {
        await ingredientiService.eliminaIngrediente(utenteLoggato.token, ingredienteDaEliminare.idIngrediente).then(response => {
            toast.success("La risorsa è stata eliminata con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setIngredienteDaEliminare(undefined);
            getIngredienti(paginaIngredienti);


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
            getIngredienti(paginaIngredienti);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                            Lista ingredienti
                        </h3>
                        <Link to="/scheda-ingrediente" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci ingrediente</Link>

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
                                            <th scope="col">Prezzo</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(ingredienti) && ingredienti.map((ingrediente: any, index: number) =>
                                                <tr key={index}>
                                                    <th scope="row">{ingrediente.idIngrediente}</th>
                                                    <td>{ingrediente.nome}</td>
                                                    <td>{ingrediente.prezzoRiferimento}€</td>
                                                    <td className='text-center'><Link to={"/scheda-ingrediente/" + ingrediente.idIngrediente} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setIngredienteDaEliminare(ingrediente)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaIngredienti}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getIngredienti(paginaIngredienti - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getIngredienti(paginaIngredienti + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
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
                            Vuoi eliminare l'ingrediente <strong>{ingredienteDaEliminare != undefined ? ingredienteDaEliminare.nome : ""}</strong> con identificativo <strong>{ingredienteDaEliminare != undefined ? ingredienteDaEliminare.idIngrediente : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaIngrediente} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}