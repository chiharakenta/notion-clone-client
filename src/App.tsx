import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/layout/AuthLayout';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './components/pages/Home';
import { Memo } from './components/pages/Memo';

function App() {
  const theme = createTheme({
    palette: {
      primary: blue
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/notion-clone-client/">
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
            <Route path="memo/:memoId" element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
