import { combineReducers, createStore } from "redux";
import {beersReducer, initialBeers} from '../features/beers/beersSlice.js' 
import { focusOnBeerReducer, initialFocusOnBeer } from "../features/focusOnBeer/focusOnBeerSlice.js";
import { headerReducer, initialHeader } from "../features/header/headerSlice.js";
import { singleBeerReducer, initialSingleBeer } from "../features/singleBeer/singleBeerSlice.js";

const store = createStore(combineReducers({
    header: headerReducer,
    beers: beersReducer,
    singleBeer: singleBeerReducer,
    focusOnBeer: focusOnBeerReducer
}), 
{
    header: initialHeader,
    beers: initialBeers,
    singleBeer: initialSingleBeer,
    focusOnBeer: initialFocusOnBeer,
})

export default store 