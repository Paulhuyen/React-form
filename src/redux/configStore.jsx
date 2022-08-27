import {combineReducers, createStore} from 'redux'


const rootReduce = combineReducers({
})

export const store = createStore(rootReduce, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());