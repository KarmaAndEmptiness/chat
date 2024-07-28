import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
const Login = React.lazy(() => import('./views/login/Login'))
const Register = React.lazy(() => import('./views/register/Register'))
const Home = React.lazy(() => import('./views/home/Home'))
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
    return (
        <>
            <CssBaseline enableColorScheme />
            {/* <BrowserRouter> */}
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
                {/* <Routes>
                        <Route path="/login" name="Login Page" element={
                            <Login />
                        } />
                        <Route path="/" name="Register Page" element={
                            <Register />
                        } />
                    </Routes> */}
                {/* <Login /> */}
                {/* <Register /> */}
                <Home />
            </Suspense>
            {/* </BrowserRouter> */}
        </>
    )
}
export default App