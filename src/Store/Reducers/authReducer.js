const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Email or password is incorrect'
            }
            
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        
        case 'SIGNOUT_SUCCESS':
            return state

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
                return {
                    ...state,
                    authError: action.err.message
                }
        case 'NAME_TAKEN':
                return {
                    ...state,
                    authError: 'Name is already taken'
                }
        default:
            return state;
    }
}

export default authReducer