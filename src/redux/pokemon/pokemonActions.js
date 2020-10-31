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

const fetchPokemonsRequest = () =>{
    return {
        type: FETCH_POKEMONS_REQUEST
    }
}
const fetchPokemonsSuccess = pokemons =>{
    return {
        type: FETCH_POKEMONS_SUCCESS,
        payload: pokemons
    }
}
const fetchPokemonsFail = error =>{
    return {
        type: FETCH_POKEMONS_FAIL,
        payload: error
    }
}
const fetchPokemonDetailRequest = () =>{
    return {
        type: FETCH_POKEMON_DETAIL_REQUEST
    }
}
const fetchPokemonDetailSuccess = pokemons =>{
    return {
        type: FETCH_POKEMON_DETAIL_SUCCESS,
        payload: pokemons
    }
}
const fetchPokemonDetailFail = error =>{
    return {
        type: FETCH_POKEMON_DETAIL_FAIL,
        payload: error
    }
}

const doCatchPokemon = (id,name, generatedId) =>{
    return {
        type: CATCH_POKEMON,
        id: id, 
        name: name,
        generatedId: generatedId
    }
}
const doReleasePokemon = (id, id_pokemon) =>{
    return {
        type: RELEASE_POKEMON,
        id: id,
        id_pokemon: id_pokemon
    }
}

export const fetchPokemons = () => {
    return (dispatch) => {
        dispatch(fetchPokemonsRequest)
        fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(response =>  response.json())
        .then(data => { 
            var detail_data = []      
            data.results.map((detailData,x) => {
                x++;
                fetch(detailData.url)
                .then(resp => resp.json())
                .then(detail => {
                    detail.ownedTotal = 0
                    detail_data.push({id: detail.id, 
                        name: detail.name, 
                        types: detail.types, 
                        image: detail.sprites.front_default,
                        ownedTotal: detail.ownedTotal,
                        catched: []
                    })
                    if(data.results.length === x){
                        dispatch(fetchPokemonsSuccess(detail_data))
                    }
                    
                })
            })
            
        })
        .catch(err => {
            const errorMsg = err.message
            dispatch(fetchPokemonsFail(errorMsg))
        })
    }
}
export const fetchPokemonDetail = (id) => {
    return (dispatch) => {
        // console.log("data +", id)
        dispatch(fetchPokemonDetailRequest)
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response =>  response.json())
        .then(data => { 
            // console.log("data +", id)
            dispatch(fetchPokemonDetailSuccess(data))
            
        })
        .catch(err => {
            const errorMsg = err.message
            dispatch(fetchPokemonDetailFail(errorMsg))
        })
    }
}

export const catchPokemon = (id,name, generatedId) =>{
    return (dispatch) => {
        dispatch(doCatchPokemon(id,name, generatedId))
    }
}
export const releasePokemon = (id, id_pokemon) =>{
    return (dispatch) => {
        dispatch(doReleasePokemon(id, id_pokemon))
    }
}