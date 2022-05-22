const auth = {
    isLoggedIn: true,
    role: ''
}

const loginReducer = (state = auth, action) => {
    switch (action.type) {
        case 'LOGIN':
           //if payload == admin then navigate to dashboard
              //if payload == student then navigate to registration
            return {
                ...state,
                isLoggedIn: true,
                role: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}


export default loginReducer