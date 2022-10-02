import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeFocusOnBeer } from '../features/focusOnBeer/focusOnBeerSlice'
import { selectHeader } from '../features/header/headerSlice'

function Header({cartItems}) {

  const header = useSelector(selectHeader)
  const dispatch = useDispatch()

  const goToItem = () => {
    dispatch(changeFocusOnBeer(window.location.pathname))
  }

  return (
    <header className='header'>
        <Link to='/' className='back-button-container' >
          <i id='backButton' onClick={() => goToItem()} className={'bi bi-arrow-left ' + (header.showBackButton ? 'show' : 'hide')} />
        </Link>
        <img src={'/images/beer-logo.png'} className='header-logo' />
        <div className='welcome'>
              <Link to='/' className='home-button'> 
              <i 
                className='bi bi-house' 
                onMouseEnter={e => e.target.className='bi bi-house-fill home-icon'}
                onMouseLeave={e => e.target.className='bi bi-house home-icon'}
              > Home </i> </Link>
              <p className='welcome-quote'> {header.welcome} </p>
              <h1 className='welcome-shop-name'> {header.title} </h1> 
        </div>
        <Link to='/cart' className='cart'>
          <i className='bi bi-cart-fill'> {cartItems.length} </i>
        </Link>
    </header>    

  )
}

export default Header