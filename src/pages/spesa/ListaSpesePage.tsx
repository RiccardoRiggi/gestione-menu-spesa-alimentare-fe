import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import ruoliService from '../../services/RuoliService';
import pietanzeService from '../../services/PietanzeService';
import spesaService from '../../services/SpesaService';
import { getData } from '../../DateUtil';

export default function ListaSpesePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [spese, setSpese] = React.useState([]);
    const [paginaSpese, setPaginaSpese] = React.useState(1);

    const getListaSpese = async (pagina: any) => {

        if (pagina !== 0) {

            await spesaService.getListaSpese(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setSpese(response.data);
                    setPaginaSpese(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setPaginaSpese(pagina);
                    toast.warning("Non sono state trovate spese", {
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

    

    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getListaSpese(paginaSpese);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                            Lista spese
                        </h3>
                        <Link to="/scheda-spesa" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci spesa</Link>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Data</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(spese) && spese.map((spesa: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{getData(spesa.dataSpesa)}</th>
                                                    <td className='text-center'><Link to={"/scheda-spesa/" + spesa.dataSpesa} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaSpese}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getListaSpese(paginaSpese - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getListaSpese(paginaSpese + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>

            </div>

           


        </Layout >
    );

}