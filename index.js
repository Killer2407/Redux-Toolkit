const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDER = 'ICECREAM_ORDER'
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function orderIcecream() {
    return {
        type: ICECREAM_ORDER,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10,
}

const initialIcecreamState = {
    numOfIcecream: 20,
}

const reducersCake = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}

const reducersIcecream = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDER:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream - 1,
            }
        case ICECREAM_RESTOCK:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload,
            }
        default:
            return state

    }
}

const rootReducer = combineReducers({
    cake: reducersCake,
    icecream: reducersIcecream
})

const store = createStore(rootReducer)
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

actions.orderIcecream()
actions.restockIcecream(5)

unsubscribe()
