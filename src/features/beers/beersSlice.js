export function beersReducer(state=[], action) {
    if(action.type === 'load-beers') {
        return [...action.payload]
    } else if(action.type === 'lazy-load-beers') {
        return [...state, ...action.payload]
    }
    return state
}

export const initialBeers = []

export function selectBeers(state) {
    return state.beers
}

export function loadBeers(data) {
    return {
        type: 'load-beers',
        payload: data
    }
}

export function lazyLoadBeers(data) {
    return {
        type: 'lazy-load-beers',
        payload: data
      }
}