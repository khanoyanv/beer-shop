import React from 'react'
import { Link } from 'react-router-dom'

function BeerListItem({beer, goToSelectedBeer}) { 

  return (
        <Link to={beer.path} className='beer-list-item' id={beer.id} onClick={e => goToSelectedBeer(e, beer)}>
            <img src={beer.image_url} className='beer-list-item-image' id={beer.id} />
            <h2 className='beer-list-item-name' id={beer.id} > {beer.name} </h2>
            <h4 className='beer-list-item-price' id={beer.id} > {beer.price}$ </h4>
        </Link> 
  )
}

export default BeerListItem
