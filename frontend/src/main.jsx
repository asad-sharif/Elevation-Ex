import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import store from './store'
// import { makeServer } from './server';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  </Provider>
)
