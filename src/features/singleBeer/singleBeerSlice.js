export function singleBeerReducer(state={}, action) {
    if(action.type === 'set-single-beer') {
        return {
            state: action.payload
        }
    }
    return state
}

export const initialSingleBeer = {}

export function selectSingleBeer(state) {
    return state.singleBeer
}

export function changeSingleBeer(obj) {
    return {
        type: 'set-single-beer',
        payload: obj
    }
}