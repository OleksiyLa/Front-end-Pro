import { createStore } from 'redux';

const reducer = (state,action) => {

    switch(action.type){
        case 'create_elem':
            return {
                elements: [...state.elements,action.element]
            }
        case 'view_elem':
            return {
                elements: action.elements
            }
        case 'reset_elem':
            return {
                elements: []
            };
        case 'shake_elem':
            return {
                elements: action.elements
            }
        default:
            return state;
    }
}

const initialState = {
    elements: [],
};

const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, initialState,devTool);

export default store;