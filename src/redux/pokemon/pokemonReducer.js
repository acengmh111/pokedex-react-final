import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMONS_FAIL,
    FETCH_POKEMON_DETAIL_REQUEST,
    FETCH_POKEMON_DETAIL_SUCCESS,
    FETCH_POKEMON_DETAIL_FAIL,
    CATCH_POKEMON,
    RELEASE_POKEMON
} from './pokemonTypes';




// console.log(getDataStorage)

const initialState = {
    loading: false,
    pokemons: [],
    detail_pokemon: [],
    error: '',
    pokemons_after_catch: null
}



export const pokemonReducer = (state = initialState, action) => {


    switch(action.type){
        case FETCH_POKEMONS_REQUEST : return {
            ...state,
            loding: true
        }
        case FETCH_POKEMONS_SUCCESS : return {
            ...state,
            loading: false,
            pokemons: action.payload
        }
        case FETCH_POKEMONS_FAIL : return {
            ...state,
            loading: false,
            error: action.payload
        }
        case FETCH_POKEMON_DETAIL_REQUEST : return {
            ...state,
            loding: true
        }
        case FETCH_POKEMON_DETAIL_SUCCESS : return {
            ...state,
            loading: false,
            detail_pokemon: action.payload
        }
        case FETCH_POKEMON_DETAIL_FAIL : return {
            ...state,
            loading: false,
            error: action.payload
        }
        case CATCH_POKEMON : 
            var pokemonChanges;
            if(state.pokemons_after_catch == null){
                pokemonChanges = state.pokemons
            }
            else{
                pokemonChanges = state.pokemons_after_catch
            }
            for(let i = 0; i < pokemonChanges.length; i++){
                if(action.id === pokemonChanges[i].id){
                    pokemonChanges[i].ownedTotal+=1
                    pokemonChanges[i].catched.push({id: action.generatedId, id_pokemon: action.id, nickname: action.name})
                }
            }
            return {
                ...state,
                loading: false,
                pokemons_after_catch: pokemonChanges

            }
        case RELEASE_POKEMON : 
        if(state.pokemons_after_catch != null){
            state.pokemons_after_catch.map((data, i) => {
                if(action.id_pokemon === data.id){
                    data.ownedTotal-=1
                    if(data.catched.length > 0){
                        for(let i = 0; i < data.catched.length; i++){
                            if(data.catched[i].id === action.id){
                                data.catched.splice(i, 1)
                            }
                        }
                    }
                }
            })
        }
        return {
            ...state
        }
        default: return state
    }
}
// // export const pokemonReducerDetail = (state, action) => {
// //     switch(action.type){

// //         case FETCH_POKEMON_DETAIL_REQUEST : return {
// //             ...state,
// //             loding: true
// //         }
// //         case FETCH_POKEMON_DETAIL_SUCCESS : 
// //             return {

// //             ...state
// //         }
// //         case FETCH_POKEMON_DETAIL_FAIL : return {
// //             ...state,
// //             loading: false,
// //             error: action.payload
// //         }
// //         default: return state
// //     }
// // }

// export const catchPokemonReducer = (state = initialState, action) => {

//     // console.log(state)
//     // if(state.dataOwned){
//     //     if(state.dataOwned.length > 0){
//     //         for(let i = 0; i < state.dataOwned.length; i++){
//     //             if(action.id == state.dataOwned[i].id){
//     //                 state.dataOwned[i].ownedTotal+=1
//     //             }
//     //         }
//     //     }
//     // }
    
    
//     switch(action.type){
//         case CATCH_POKEMON : 
//         return {
//             ...state
//         }
//         default: return state
//     }
// }