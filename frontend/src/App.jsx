import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

import ScrollToTop from './components/ScrollToTop'

function App() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-textPrimary">
                <AppRoutes />
            </div>
        </BrowserRouter>
    )
}

export default App
