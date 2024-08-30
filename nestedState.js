const redux = require('redux')
const produce = require("immer").produce
// const bindActionCreators = redux.bindActionCreators


const initialState = {
    name: 'Aniket',
    address: {
        street: '123 Main Street',
        city: 'Harrison',
        state: 'NJ',
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

function updateStreet(street) {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const streetReducers = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }

    }
}

const store = redux.createStore(streetReducers)
console.log("Initial State", store.getState())

const unsubcribe = store.subscribe(() => {
    console.log("Updated State", store.getState())
})
store.dispatch(updateStreet("600 Frank E Rodgers"))

unsubcribe()
