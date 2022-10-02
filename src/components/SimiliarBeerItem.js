import React from 'react'
import { Link } from 'react-router-dom'

function SimiliarBeerItem({beer, goToSelectedBeer, changeSingleBeer}) {

  return (
    <Link to={beer.path} id={beer.id} className='similiar-beer-item' onClick={e => {
      goToSelectedBeer(e, beer)
      changeSingleBeer(beer)
    }}>
        <img src={beer.image_url} className='similiar-beer-item-image' id={beer.id}/>
        <div className='similiar-beer-item-name-price-container' id={beer.id}>
            <h2 className='similiar-beer-item-name' id={beer.id}> {beer.name} </h2>
            <h3 className='similiar-beer-item-price' id={beer.id}> {beer.price}$ </h3>
        </div>
    </Link>
  )
}

export default SimiliarBeerItem