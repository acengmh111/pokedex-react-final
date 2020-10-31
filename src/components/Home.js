import React, { Component } from 'react';
import '../assets/css/Home.css';
import Header from './homes/Header';
import {connect} from 'react-redux';
import { fetchPokemons } from '../redux';
import PokeHeader from '../assets/images/poke_banner.svg';
import Card from './generals/Card';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: []
        }
    }

    componentDidMount(){
        this.props.fetchPokemons()
    }

    catchPoke = (param, e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        })
    }
    cancel = () =>{
        this.setState({
            modal: !this.state.modal
        }) 
    }
    go = () =>{
        alert("halo")
    }

    render() {

        const pokemons = this.props.pokemonData.pokemons
        const pokemons_after_catch = this.props.pokemonData.pokemons_after_catch
        const viewPokemon = pokemons.map((data, index) => (
            <Link className="link" to={`detail/${data.id}`} key={data.id}>
                <Card card_key={data.id} 
                image={data.image} 
                name={data.name} 
                owned={
                    pokemons_after_catch !=  null ? 
                    pokemons_after_catch.map((value, i) => {
                        if(pokemons_after_catch[i].id === data.id){
                            return pokemons_after_catch[i].ownedTotal
                        }
                    })
                    : 0
                } 
                type={
                    data.types.map((poke, i) => {
                        if(data.types.length === 1){
                            return poke.type.name
                        }
                        else{
                            var name;
                            if(i < (data.types.length -1)){
                                name = poke.type.name+ " / "
                            }
                            else{
                                name = poke.type.name
                            }
                            return name
                        }

                    })
                } />
            </Link>
        ))
        return (
            <>
                
                <div className="home">
                    <div className="home__dialog">
                        <img src={PokeHeader} className="home__poke_img" alt="home_poke_img"></img>
                        <Header/>
                        <div className='home__linkwrap'>
                            <Link className="link" to="/list">
                                See My Pokemont List
                            </Link>
                        </div>
                        <div className="home__card">
                            {
                               viewPokemon
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPokemons: () => dispatch(fetchPokemons()),
    }
}
const mapStateToProps = state =>{
    return {
        pokemonData: state.pokemon
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);