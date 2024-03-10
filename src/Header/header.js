import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <h1><Link href='/'>Store</Link></h1>
        <nav>
          <ul>
            <Link href="#">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Products</Link>
          </ul>
        </nav>
      </div>
    </header>
  )
}
