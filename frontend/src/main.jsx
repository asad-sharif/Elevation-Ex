import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StrictMode>
    </PersistGate>
  </Provider>
)
