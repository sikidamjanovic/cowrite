import authReducer from './authReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer
})

export default rootReducer