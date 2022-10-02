import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { lazyLoadBeers } from '../features/beers/beersSlice'

function Footer() {

  const dispatch = useDispatch()
  const loadindex = useRef(1)

// after intersecting with footer new data loads
  useEffect(() => {
    setTimeout(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
              loadindex.current = loadindex.current + 0.5
              if(Number.isInteger(loadindex.current) && loadindex.current < 6) {
                axios.get(`https://api.punkapi.com/v2/beers?page=${loadindex.current}`)
                .then(res => {
                  res.data.slice(0,18).forEach(beer => {
                    beer.path = '/' + beer.id;
                    beer.quantity = 0;
                    beer.price = Math.floor(Math.random() * 10) + 1;
                    beer.similiarBeers = [
                      res.data.slice(0, 18).filter(eachBeer => 
                      beer.abv - eachBeer.abv <= 1 && beer.abv - eachBeer.abv >= -1  &&
                      beer.ibu - eachBeer.ibu >= -10 && beer.ibu - eachBeer.ibu <= 10  && 
                      beer.name != eachBeer.name)
                    ];
                  });
                  dispatch(lazyLoadBeers(res.data.slice(0,9))) 
                })
              }
            }
          })
        }, {threshold: 0.8})
      observer.observe(document.querySelector('.footer'))
    }, 3000)
  }, [])
  
  return (
    <footer className='footer' id='footer'>
        <div className = 'our-information'>
          <i className = 'bi bi-geo-alt-fill'> Margaryan 1/1, Yerevan, Armenia</i>
          <i className = 'bi bi-envelope-fill'> sales@beershop.com</i>
          <i className = 'bi bi-telephone-fill'> +374 33 333 333</i>
        </div>
        <div className='copyright' >2022&copy; All rights reserved</div>
    </footer>
  )
}

export default Footer