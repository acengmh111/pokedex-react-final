import { pokemonReducer } from './pokemon/pokemonReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    pokemon: pokemonReducer
})
export default rootReducer