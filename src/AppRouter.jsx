import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import { HomePage, CarteleraPage } from './pages'

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route index element={<HomePage />} />
                <Route path='cartelera' element={<CarteleraPage />} />
            </Route>

            <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    );
}
