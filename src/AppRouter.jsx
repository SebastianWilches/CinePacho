import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import { HomePage, CarteleraPage, LoginPage, RegisterPage, SnacksPage } from './pages'
import { MoviePage } from './pages/MoviePage';
import { AdminPage } from './pages/AdminPage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route index element={<HomePage />} />
                <Route path='cartelera' element={<CarteleraPage />} />
                <Route path='movie/:id' element={<MoviePage/>} />
                <Route path='snacks' element={<SnacksPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='admin' element={<AdminPage/>} />
            </Route>
            {/* <Route path='*' element={<Navigate to='/'/>}/> */}
        </Routes>
    );
}

/*
<Route path='admin' element={<AdminPage/>} />
*/