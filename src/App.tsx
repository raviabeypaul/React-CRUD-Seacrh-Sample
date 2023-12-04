import './App.scss';
import { RouteHandler } from './setup/RouterHandler';
import { ThemeProvider } from '@mui/material';
import theme from './styles/Theme';
import { StyledContainer } from './components/StyledContainer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RouteHandler />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
