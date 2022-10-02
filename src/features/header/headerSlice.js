export function headerReducer(state={}, action) {
    if(action.type === 'edit-header') {
        return {
            title: action.payload.title,
            welcome: action.payload.welcome,
            showBackButton: action.payload.showBackButton 
        }
    }
    return state
}

export const initialHeader = {
    title: 'BEER SHOP',
    welcome: 'Welcome to our',
    showBackButton: false
}

export function selectHeader(state) {
    return state.header
}

export function editHeader(newTitle, newWelcome, newBackButtonStatus) {
    return {
        type: 'edit-header',
        payload: {
            title: newTitle,
            welcome: newWelcome,
            showBackButton: newBackButtonStatus
        }
    }
}