import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { editHeader } from '../features/header/headerSlice'
import CartItem from './CartItem'

function Cart({cartItems, deleteCartItem}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(editHeader('Cart', '', true))
  }, [])

  return (
    <div className='cart-list'>
      {
        cartItems.length ?
        cartItems.map(beer => <CartItem beer={beer} key={beer.id} deleteCartItem={deleteCartItem}/>) :
        <h1 className='empty-cart-text'> Your cart is empty </h1>
      }
    </div>
  )
}

export default Cart