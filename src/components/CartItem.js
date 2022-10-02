import React, { useState } from 'react'

function CartItem({beer, deleteCartItem}) {

  const [beerQuantity, setBeerQuantity] = useState(beer.quantity)

  return (
    <div className='cart-list-item'>
        <img src={beer.image_url} className='cart-list-item-image' />
        <h3 className='cart-list-item-title'> {beer.name} </h3>
        <div className='cart-list-item-quantity-control'>
            <i className='bi bi-chevron-down arrow-down' onClick={() => {
                if(beerQuantity !== 1){
                    setBeerQuantity(beerQuantity - 1)
                }}} 
            />
            <p className='cart-list-item-quantity'> {beerQuantity} </p>
            <i className='bi bi-chevron-up arrow-up' onClick={() => setBeerQuantity(beerQuantity + 1)} />
        </div>
        <i className='bi bi-x close' id={beer.id} onClick={(e) => {
          deleteCartItem(e)
        } }/>
        <h3 className='cart-list-item-price'> {beer.price*beerQuantity}$ </h3>
    </div>
  )
}

export default CartItem