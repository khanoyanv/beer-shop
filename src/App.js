import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import BeerList from './components/BeerList'
import Footer from './components/Footer'
import SingleBeer from './components/SingleBeer'
import Cart from './components/Cart'
import axios from 'axios'
import { loadBeers, selectBeers } from './features/beers/beersSlice'
import { changeSingleBeer, selectSingleBeer } from './features/singleBeer/singleBeerSlice'
import { selectFocusOnBeer } from './features/focusOnBeer/focusOnBeerSlice'
import { editHeader } from './features/header/headerSlice'

function App() {

  const beers = useSelector(selectBeers)
  const beer = useSelector(selectSingleBeer)
  const focusedBeer = useSelector(selectFocusOnBeer)
  const [beerPath, setBeerPath] = useState('/')
  const [cartItems, setCartItems] = useState([])
  const [initialBeers, setInitialBeers] = useState()
  const path = window.location.pathname
  const dispatch = useDispatch()

  function wrapObject(obj, filterArray) {
    obj.path = '/' + obj.id;
    obj.quantity = 0;
    obj.price = Math.floor(Math.random() * 10) + 1;
    obj.similiarBeers = [
        filterArray.filter(eachBeer => 
            obj.abv - eachBeer.abv <= 1 && obj.abv - eachBeer.abv >= -1  &&
            obj.ibu - eachBeer.ibu >= -10 && obj.ibu - eachBeer.ibu <= 10  && 
            obj.name != eachBeer.name
        )
    ];
    return obj
  }

  // getting data from endpoint and putting it in state && checking pathname for displaying single beer
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(new Array()))
    if(beer.name == undefined && path != '/' && path != '/cart') {
      setBeerPath(path) 
    }
    if(!beers.length) { 
    axios.get('https://api.punkapi.com/v2/beers?page=1')
    .then(response => {
      response.data.slice(0,18).forEach(beer => {
        wrapObject(beer, response.data.slice(0, 18))
      });
      setInitialBeers([...response.data.slice(0,18)])
      dispatch(loadBeers(response.data.slice(0,18)))
    })
    }
  }, [])

  // setting what beer to focus after clicking on left arrow button
  useEffect(() => {
    if(focusedBeer != '') {
      beers.map(beer => {
        if(beer.path == focusedBeer.path) {
          const focus = document.getElementById(beer.id)
          focus.scrollIntoView({behavior: 'smooth'})
        }
      })
    }
  }, [focusedBeer])

  const filterList = (e, name, date, brewedBefore, brewedAfter) => {
    e.preventDefault()
    const changedDate = date.split('-')
    const year = parseInt(changedDate[0])
    const month = parseInt(changedDate[1])
    const getMonth = (brewedDate) => parseInt(brewedDate.split('/')[0])
    const getYear = (brewedDate) => parseInt(brewedDate.split('/')[1])
    
    if(brewedBefore) {
      const filteredByDate = beers.filter(beer => getYear(beer.first_brewed) !== year ? 
        getYear(beer.first_brewed) < year :
        getMonth(beer.first_brewed) < month
      )
      filteredByDate.length ? dispatch(loadBeers(filteredByDate)) : alert(`No beers brewed before ${date}`)
    } 
    if(brewedAfter) {
      const filteredByDate = beers.filter(beer => getYear(beer.first_brewed) !== year ? 
        getYear(beer.first_brewed) > year :
        getMonth(beer.first_brewed) > month
      )
      filteredByDate.length ? dispatch(loadBeers(filteredByDate)) : alert(`No beers brewed after ${date}`)
    }
    if(name) {
      const filteredByName = beers.filter(beer => 
        beer.name.includes(name) || 
        beer.name.includes(name.charAt(0).toUpperCase() + name.slice(1))
      )
      dispatch(loadBeers(filteredByName))
    } else {
      dispatch(loadBeers(initialBeers))
    }
  }

  const goToSelectedBeer = (e, item) => {
    window.scrollTo(0, 0)
    const id = e.target.id;
    beers.map(eachBeer => {
      if(id == eachBeer.id) {
        setBeerPath(eachBeer.path)
        dispatch(changeSingleBeer(eachBeer))
        dispatch(editHeader(item.name, item.tagline, false))
      }
    })
  }
  
  const addToCart = (beer, quantity) => {
    beer.quantity = beer.quantity + quantity
    if(!cartItems.includes(beer)) {
      setCartItems([...cartItems, beer])
    }
  }

  const deleteCartItem = (e) => {
    const id = e.target.id
    setCartItems(cartItems.filter(beer => beer.id != id))
  }

  const resetList = (e) => {
    if(!e.target.value) {
      dispatch(loadBeers(initialBeers))
    }
  }

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Routes>
        <Route path='/' element={
          <BeerList filterList={filterList} goToSelectedBeer={goToSelectedBeer} resetList={resetList} />
        }/>
        <Route path={beerPath} element={ 
          <SingleBeer wrapObject={wrapObject} addToCart={addToCart} goToSelectedBeer={goToSelectedBeer}/>
        }/>
        <Route path='/cart' element={
          <Cart cartItems={cartItems} deleteCartItem={deleteCartItem}/>
        }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
