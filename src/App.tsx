import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import ListaAccessiPage from './pages/accessiAttivi/ListaAccessiPage'
import ListaAccountTelegramPage from './pages/accountTelegram/ListaAccountTelegramPage'
import ListaDispositiviFisiciPage from './pages/dispositiviFisici/ListaDispositiviFisiciPage'
import HomePage from './pages/HomePage'
import ImpostazioniPage from './pages/ImpostazioniPage'
import ListaIndirizziIp from './pages/indirizziIp/ListaIndirizziIp'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import LogsPage from './pages/LogsPage'
import ListaVociMenuPage from './pages/menu/ListaVociMenuPage'
import SchedaVoceMenuPage from './pages/menu/SchedaVoceMenuPage'
import ListaNotifichePage from './pages/notifiche/ListaNotifichePage'
import ListaNotificheUtentePage from './pages/notifiche/ListaNotificheUtentePage'
import SchedaNotificaPage from './pages/notifiche/SchedaNotificaPage'
import RecuperoPasswordPage from './pages/RecuperoPasswordPage'
import ListaRisorsePage from './pages/risorse/ListaRisorsePage'
import SchedaRisorsaPage from './pages/risorse/SchedaRisorsaPage'
import ListaRuoliPage from './pages/ruoli/ListaRuoliPage'
import SchedaRuoloPage from './pages/ruoli/SchedaRuoloPage'
import ListaUtentiPage from './pages/utenti/ListaUtentiPage'
import SchedaUtentePage from './pages/utenti/SchedaUtentePage'
import PannelloDiControlloPage from './pages/PannelloDiControlloPage'
import { useEffect } from 'react'
import OneSignal from 'react-onesignal'
import { useSelector } from 'react-redux'
import configurazione from './configurazione'

import ListaIngredientiPage from './pages/ingredienti/ListaIngredientiPage'
import SchedaIngredientePage from './pages/ingredienti/SchedaIngredientePage'
import MenuAlimentarePage from './pages/menuAlimentare/MenuAlimentarePage'
import ListaPietanzePage from './pages/pietanze/ListaPietanzePage'
import SchedaPietanzaPage from './pages/pietanze/SchedaPietanzaPage'
import ListaSpesePage from './pages/spesa/ListaSpesePage'
import SchedaSpesaPage from './pages/spesa/SchedaSpesaPage'

function App() {


  const utenteLoggato = useSelector((state: any) => state.utenteLoggato);


  useEffect(() => {

    if (utenteLoggato.token) {
      OneSignal.init({
        appId: configurazione.oneSignal.appId,
        allowLocalhostAsSecureOrigin: true,
        serviceWorkerParam: {
          scope: configurazione.oneSignal.scope
        },
      });
    }

  }, [utenteLoggato.token]);

  return (
    <BrowserRouter basename='/menu-spesa-alimentare'>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="recupero-password" element={<RecuperoPasswordPage />} />

        <Route path="logout" element={<LogoutPage />} />


        <Route
          path=""
          element={
            <PrivateRoute>
              <ListaIngredientiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo"
          element={
            <PrivateRoute>
              <PannelloDiControlloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/dashboard"
          element={
            <PrivateRoute>
              <PannelloDiControlloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/impostazioni"
          element={
            <PrivateRoute>
              <ImpostazioniPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/logs/:livelloLog"
          element={
            <PrivateRoute>
              <LogsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/logs"
          element={
            <PrivateRoute>
              <LogsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-menu"
          element={
            <PrivateRoute>
              <ListaVociMenuPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-voce-menu"
          element={
            <PrivateRoute>
              <SchedaVoceMenuPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-voce-menu/:idVoceMenu"
          element={
            <PrivateRoute>
              <SchedaVoceMenuPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-risorse"
          element={
            <PrivateRoute>
              <ListaRisorsePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-risorsa"
          element={
            <PrivateRoute>
              <SchedaRisorsaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-risorsa/:idRisorsa"
          element={
            <PrivateRoute>
              <SchedaRisorsaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-ruoli"
          element={
            <PrivateRoute>
              <ListaRuoliPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-ruolo"
          element={
            <PrivateRoute>
              <SchedaRuoloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-ruolo/:idTipoRuolo"
          element={
            <PrivateRoute>
              <SchedaRuoloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-utenti"
          element={
            <PrivateRoute>
              <ListaUtentiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-utente"
          element={
            <PrivateRoute>
              <SchedaUtentePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-utente/:idUtente"
          element={
            <PrivateRoute>
              <SchedaUtentePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-indirizzi-ip"
          element={
            <PrivateRoute>
              <ListaIndirizziIp />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-dispositivi-fisici"
          element={
            <PrivateRoute>
              <ListaDispositiviFisiciPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-account-telegram"
          element={
            <PrivateRoute>
              <ListaAccountTelegramPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-accessi"
          element={
            <PrivateRoute>
              <ListaAccessiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-notifiche-utente"
          element={
            <PrivateRoute>
              <ListaNotificheUtentePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-notifiche"
          element={
            <PrivateRoute>
              <ListaNotifichePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-notifica"
          element={
            <PrivateRoute>
              <SchedaNotificaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-notifica/:idNotifica"
          element={
            <PrivateRoute>
              <SchedaNotificaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-ingredienti"
          element={
            <PrivateRoute>
              <ListaIngredientiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-ingrediente"
          element={
            <PrivateRoute>
              <SchedaIngredientePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-ingrediente/:idIngrediente"
          element={
            <PrivateRoute>
              <SchedaIngredientePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-pietanze"
          element={
            <PrivateRoute>
              <ListaPietanzePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-pietanza"
          element={
            <PrivateRoute>
              <SchedaPietanzaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-pietanza/:idPietanza"
          element={
            <PrivateRoute>
              <SchedaPietanzaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/menu-alimentare"
          element={
            <PrivateRoute>
              <MenuAlimentarePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/menu-alimentare/:dataInizio/:dataFine"
          element={
            <PrivateRoute>
              <MenuAlimentarePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-spese"
          element={
            <PrivateRoute>
              <ListaSpesePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-spesa"
          element={
            <PrivateRoute>
              <SchedaSpesaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-spesa/:dataSpesa"
          element={
            <PrivateRoute>
              <SchedaSpesaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

      </Routes>


    </BrowserRouter>
  )
}

export default App
