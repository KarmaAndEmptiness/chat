import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from './views/login/Login'
import Register from './views/register/Register'
import Home from './views/home/Home'

const App = () => {
    return (
        <>
            <CssBaseline enableColorScheme />
            <BrowserRouter>
                <Suspense fallback={
                    <div style={
                        {
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }>
                        <CircularProgress />
                    </div>
                }
                >
                    <Routes>
                        <Route path="login" name="Login Page" element={
                            <Login />
                        } />
                        <Route path="register" name="Register Page" element={
                            <Register />
                        } />
                        <Route path="/*" name="Home Page" element={
                            <Home />
                        } />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}
export default App