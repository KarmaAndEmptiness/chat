import React, { Suspense, useState, useMemo, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../scss/base.scss'
import '../scss/quill.scss'

import router from '@/router'

// 创建 Theme Context
export const ThemeContext = createContext();

const App = () => {
    const [mode, setMode] = useState('system');

    // 创建主题
    const theme = useMemo(() => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const selectedMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

        return createTheme({
            palette: {
                mode: selectedMode,
            },
        });
    }, [mode]);

    // 监听系统主题变更
    useEffect(() => {
        if (mode === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [mode]);

    // 切换主题函数
    const toggleTheme = (newMode) => {
        setMode(newMode);
    };

    return (
        <>
            <ThemeContext.Provider value={{ mode, toggleTheme }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
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
                        <RouterProvider router={router} />
                    </Suspense>
                </ThemeProvider>
            </ThemeContext.Provider>

        </>
    )
}
export default App