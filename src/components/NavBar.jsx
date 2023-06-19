import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <h1>Navegación</h1>
      <Outlet />
    </div>
  )
}
