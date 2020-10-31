import React, { Component } from 'react';
import '../assets/css/List.css';
import Header from './homes/Header';
import Modal from './generals/Modal';
import {connect} from 'react-redux';
import { releasePokemon } from '../redux';
import LeftArrow from '../assets/images/left_black.svg';
import PokeHeader from '../assets/images/poke_banner.svg';
import Card from './generals/Card';
import {Link} from 'react-router-dom';

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: [],
            modal: false,
            matchRelease: null,
            matchPokeRelase: null
        }
    }

    componentDidMount(){
        //
    }

    release = (e, id, id_pokemon) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal,
            matchRelease: id,
            matchPokeRelase: id_pokemon
        })
    }
    cancel = () =>{
        this.setState({
            modal: !this.state.modal
        }) 
    }
    go = (id, id_pokemon) =>{
        this.setState({
            modal: !this.state.modal
        }) 
        this.props.releasePokemon(id, id_pokemon)
    }
    goBack = () =>{
        this.props.history.goBack();
    }

    render() {

        const pokemons_after_catch = this.props.pokemonData.pokemons_after_catch

        var viewPokemon = []
        var viewNull = null
        if(pokemons_after_catch!=null){
            pokemons_after_catch.map((data, i) => {
                if(data.catched.length > 0){
                   data.catched.map((d_catched, j) => 
                        
                    (
                        viewPokemon.push(
                            <Link className="link" nickname={d_catched.nickname} to={`detail/${data.id}`} key={d_catched.id}>
                                <Card card_key={d_catched.id} 
                                image={data.image} 
                                name={d_catched.nickname === '' ? ' - ' : d_catched.nickname}
                                real_name = {data.name} 
                                list={true}
                                release={(e) => this.release(e, d_catched.id, d_catched.id_pokemon)}
                                id_pokemon={d_catched.id_pokemon} 
                                id={d_catched.id} 
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

                        )
                        
                    ))
                }
            })
            
        }
        else{
            viewNull = (
            <div style={{border: 'none', boxShadow: 'none'}}>
                <p style={{textAlign: 'center', fontSize: '17px', color: 'gray'}}>
                    No Pokemon Found, <Link to="/" className="link green">Try To Catch It</Link>
                </p>
            </div>
            )
        }
        return (
            <>
                {
                    this.state.modal ? <Modal 
                        list={true} 
                        go={() => this.go(this.state.matchRelease, this.state.matchPokeRelase)} 
                        cancel={this.cancel}/> 
                    : ''
                }
                <div className="list">
                    <div className="list__dialog">
                        <img src={PokeHeader} className="list__poke_img" alt="list_poke_img"></img>
                        <button className="go_back" onClick={this.goBack} to="/"><img src={LeftArrow} alt="img_arrow_back"></img></button>
                        <Header list={true} />
                        <div className='list__linkwrap'>
                            <Link className="link" to="/">
                                Back To Home
                            </Link>
                        </div>
                        <div className="list__card">
                            {
                               viewPokemon.map(x => (
                                   x
                               ))
                            }
                            {
                                viewNull
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
        // fetchPokemons: () => dispatch(fetchPokemons()),
        releasePokemon: (id, id_pokemon) => dispatch(releasePokemon(id, id_pokemon))
    }
}
const mapStateToProps = state =>{
    return {
        pokemonData: state.pokemon
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(List);