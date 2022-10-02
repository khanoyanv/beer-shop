import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeers } from '../features/beers/beersSlice'
import { editHeader } from '../features/header/headerSlice'
import SimiliarBeerItem from './SimiliarBeerItem'

function SingleBeer({wrapObject, addToCart, goToSelectedBeer}) {

  const dispatch = useDispatch()
  const beers = useSelector(selectBeers)
  const [quantity, setQuantity] = useState(1)
  const [singleBeer, setSingleBeer] = useState({})
  let [update, setUpdate] = useState(0)
  const path = window.location.pathname

  useEffect(() => {
    axios.get(`https://api.punkapi.com/v2/beers?ids=${path.substring(1)}`)
    .then(res => {
        localStorage.setItem('selectedBeer', JSON.stringify(res.data[0]))
        setUpdate(update++)
        dispatch(changeSingleBeer(res.data[0]))
    })
  }, [])

  useEffect(() => {
    dispatch(editHeader(singleBeer.name, singleBeer.tagline, true))
  }, [singleBeer])

  useEffect(() => {
    const newObj = Object.assign({}, JSON.parse(localStorage.getItem('selectedBeer')))
    wrapObject(newObj, beers)
    setSingleBeer({...newObj})
  }, [update])

  const changeSingleBeer = (beer) => {
    setSingleBeer(beer)
  }

  return (
    <div className='single-beer' >
        <div className = 'single-beer-container'>
            <img className='single-beer-image' src={singleBeer.image_url} />
            <div className='single-beer-details'>
                <h2 className='single-beer-title' > {singleBeer.name} </h2>
                <h3 className='single-beer-tagline' > {singleBeer.tagline} </h3> 
                <p className='single-beer-description' > {singleBeer.description} </p>
                <div className='add-to-cart-container'>
                    <div className='sub-add-buttons'>
                        <i className='bi bi-dash-lg sub-quantity' 
                           onClick={(e) => quantity !== 0 ? setQuantity(quantity - 1) : false}/>
                        <p className='quantity'> {quantity} </p>
                        <i className='bi bi-plus-lg add-quantity' onClick={(e) => setQuantity(quantity + 1)}/>
                    </div>
                    <div className='add-to-cart-button-container'>
                        <i className='add-to-cart-button bi bi-cart-plus' 
                           onClick={() => addToCart(singleBeer, quantity)}> 
                           Add to cart 
                        </i>  
                    </div>
                </div>
            </div>   
        </div>
        <div className='similiar-beers' >
            {singleBeer.similiarBeers ? 
                singleBeer.similiarBeers[0].slice(0,3).map(beer => 
                <SimiliarBeerItem 
                    beer={beer} 
                    key={beer.id} 
                    goToSelectedBeer={goToSelectedBeer}
                    clickHandler={changeSingleBeer}
                /> ) :
                <h1 className='loading-similiar-beers'>Loading...</h1> 
            }
        </div>
    </div>    

  )
}

export default SingleBeer