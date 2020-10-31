import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { fetchPokemons } from '../redux';

function Home2({pokemonData, fetchPokemons}) {
    useEffect(() =>{
        fetchPokemons()
        
    }, [])
    return (
        <div>
            halo
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemons: () => dispatch(fetchPokemons())
    }
}
const mapStateToProps = state =>{
    return {
        pokemonData: state.pokemon
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home2);