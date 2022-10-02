import React, { useState } from 'react'

function BeerListFilter({filterList, resetList}) {

  const [name, setName] = useState('')
  const [date, setDate] = useState('2022-01')
  const [brewedBefore, setBrewedBefore] = useState(false)
  const [brewedAfter, setBrewedAfter] = useState(false)

  const setChecked = (e) => {
    switch(e.target.name) {
      case 'before':
        setBrewedBefore(!brewedBefore)
        if(brewedAfter) { setBrewedAfter(false) }
        break
      case 'after':
        setBrewedAfter(!brewedAfter)
        if(brewedBefore) { setBrewedBefore(false) }
    }
  }

  return (
    <form className='filter-form' onSubmit={e => filterList(e, name, date, brewedBefore, brewedAfter)}>
      <input className='search-bar'  placeholder='Search by name...' type='search' value={name} onChange={e => {
          setName(e.target.value)
          resetList(e)
        }} 
      />
      <input type='checkbox' checked={brewedBefore} name='before' onChange={e => setChecked(e)} /> 
      <span> Brewed before </span>
      <input type='checkbox' checked={brewedAfter} name='after' onChange={e => setChecked(e)} /> 
      <span> Brewed after </span>
      <input className='brewed-input' type='month' value={date} onChange={e => setDate(e.target.value)} />
      <i 
        className='bi bi-funnel-fill filter-button' 
        onClick={e => filterList(e, name, date, brewedBefore, brewedAfter)}> 
        Filter </i>
      <i 
        className='bi bi-arrow-clockwise reset-button' 
        onClick={e => resetList(e)}> 
      Reset </i>
    </form>
  )
}

export default BeerListFilter