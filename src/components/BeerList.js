import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BeerListItem from './BeerListItem'
import BeerListFilter from './BeerListFilter'
import { editHeader } from '../features/header/headerSlice'

function BeerList({goToSelectedBeer, filterList, resetList}) {

  const beers = useSelector(state => state.beers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(editHeader('BEER SHOP', 'Welcome to out', false))
  }, [])

  return (    
      <div className='main-list'>
        <div className='list-filter-container'>
          <BeerListFilter filterList={filterList} resetList={resetList}/>
        </div>
        <div className='beer-list'>
          {
            beers.map(beer => 
              <BeerListItem 
                beer={beer} 
                key={beer.id} 
                goToSelectedBeer={goToSelectedBeer}
              />)
          }
        </div>
      </div>  
  )
}

export default BeerList