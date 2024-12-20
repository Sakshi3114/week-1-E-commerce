import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import store from './store/mainstore.js';
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store = {store} >
    <App />
    <Toaster />
  </Provider>
  </BrowserRouter>
  
);
