export function focusOnBeerReducer(state='', action) {
    if(action.type === 'change-beer-focus') {
        return {
            path: action.payload
        }
    }
    return state
}

export const initialFocusOnBeer = {
    path: ''
}

export function selectFocusOnBeer(state) {
    return state.focusOnBeer
}

export function changeFocusOnBeer(path) {
    return {
        type: 'change-beer-focus',
        payload: path
      }
}