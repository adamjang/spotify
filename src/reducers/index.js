import { createStore, combineReducers } from 'redux'

import spotify from './spotify'

// # populate reducers here.
const rootReducer = combineReducers({
  spotify
})

createStore(rootReducer)

export default rootReducer
