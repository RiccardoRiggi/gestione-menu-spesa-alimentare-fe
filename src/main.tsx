import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react';
// @ts-ignore
import { configureStore } from './store/configureStore';

const { store, persistor }: any = configureStore();


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <App />
    </PersistGate>
  </Provider>,
)
