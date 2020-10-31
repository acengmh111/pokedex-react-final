import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPokemons, fetchPokemonDetail, catchPokemon } from '../redux';
import {Link} from 'react-router-dom';
import '../assets/css/Detail.css';
import DetailPoke from '../assets/images/detail_poke.svg';
import DetailEllipse from '../assets/images/detail_ellipse.svg';
import DetailCircle from '../assets/images/detail_circle.svg';
import LeftArrow from '../assets/images/left_white.svg';
import Modal from './generals/Modal';
import ModalFire from './generals/ModalFire';
import Header from './details/Header';
import Tab from './details/Tab';
import About from './details/About';
import Stats from './details/Stats';
import Abilities from './details/Abilities';
import Moves from './details/Moves';


class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            active: true,
            modal: false,
            modal_fire_success: false,
            modal_fire_fail: false,
            successCatch: false,
            detailPokemon: {}
        }
        this.btnRef = React.createRef()
        this.parentTab = React.createRef()
        this.parentContent = React.createRef()
        this.inputRef = React.createRef()
    }

    componentDidMount(){
        this.props.fetchPokemons()
        this.props.fetchPokemonDetail(this.props.match.params.id)

        
    }

    

    tabClick = (element, activeId) => {
        let tabLength = this.parentTab.current.childElementCount;

        for(let j = 0; j < tabLength; j++){
            if(this.parentTab.current.childNodes[j].id === activeId){
                this.parentTab.current.childNodes[j].className = "tab active"
            }
            else{
                this.parentTab.current.childNodes[j].className = "tab"
            }
            
        }

        for(let i = 0; i < tabLength; i++){
            if(this.parentContent.current.childNodes[i].id === activeId){
                this.parentContent.current.childNodes[i].style.display = "flex"
            }
            else{
                this.parentContent.current.childNodes[i].style.display = "none"
            }
            
        }
        
    }
    catchPoke = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    cancel = () =>{
        this.setState({
            modal: !this.state.modal
        }) 
    }
    go = () => {
    
       //50% chances
       if(Math.random() < 0.5){
           this.setState({
               modal_fire_success: !this.state.modal_fire_success
           })
       }
       else{
            this.setState({
                modal_fire_fail: !this.state.modal_fire_fail
            }) 
       }
       this.setState({
            modal: !this.state.modal
       })
    }
    cancelCatch = () =>{
        this.setState({
            modal_fire_success: !this.state.modal_fire_success
        }) 
    }
    cancelCatchFail = () =>{
        this.setState({
            modal_fire_fail: !this.state.modal_fire_fail
        }) 
    }
    goCatch = () => {
        let nickname = this.inputRef.current.value
        let pokemonId = this.props.pokemonData.detail_pokemon.id
        let generatedId = Math.floor(Date.now() / 1000)
        this.props.catchPokemon(pokemonId, nickname, generatedId)
        this.setState({
            modal_fire_success: !this.state.modal_fire_success
        })
    }
    goBack = () =>{
        this.props.history.goBack();
    }


    render() {
        
        let about = (<About dataId="about" dataClass="active"/>)

        if(this.props.pokemonData != null
            && this.props.pokemonData.detail_pokemon != null ){
            const weight = (this.props.pokemonData.detail_pokemon.weight / 10)
            const height = (this.props.pokemonData.detail_pokemon.height / 10)
            const base_xp = this.props.pokemonData.detail_pokemon.base_experience
            about = (<About 
                dataId="about" 
                dataClass="active" 
                weight={weight}
                height={height}
                base_xp={base_xp}
                />)
        }

        let abilities = (<Abilities dataId="abilities"/>)

        if(this.props.pokemonData != null
            && this.props.pokemonData.detail_pokemon != null 
            && this.props.pokemonData.detail_pokemon.abilities != null){
            abilities = (<Abilities 
                dataId="abilities"
                abilities={this.props.pokemonData.detail_pokemon.abilities}
                />)
        }
        
                              
        let moves = (<Moves dataId="moves"/>)

        if(this.props.pokemonData != null
            && this.props.pokemonData.detail_pokemon != null 
            && this.props.pokemonData.detail_pokemon.moves != null){
            moves = (<Moves 
                dataId="moves"
                moves={this.props.pokemonData.detail_pokemon.moves}
                />)
        }

        let stats = (<Stats dataId="stats"/>)

        if(this.props.pokemonData != null
            && this.props.pokemonData.detail_pokemon != null 
            && this.props.pokemonData.detail_pokemon.stats != null){
            stats = (<Stats 
                dataId="stats"
                stats={this.props.pokemonData.detail_pokemon.stats}
                />)
        }

        let header = ''
        if(this.props.pokemonData != null 
            && this.props.pokemonData.detail_pokemon != null 
            && this.props.pokemonData.detail_pokemon.types != null){
            header = (
                <Header types={this.props.pokemonData.detail_pokemon.types}
                        name={this.props.pokemonData.detail_pokemon.name}
                        id={this.props.pokemonData.detail_pokemon.id}></Header>
            )

        }
        let PokeImage = '';
        if(this.props.pokemonData != null 
            && this.props.pokemonData.detail_pokemon != null 
            && this.props.pokemonData.detail_pokemon.sprites != null 
            && this.props.pokemonData.detail_pokemon.sprites.front_default != null){
                PokeImage = <img src={this.props.pokemonData.detail_pokemon.sprites.front_default} alt="pokemon" />
        }   
        
        return (
            
            <>
            {
                this.state.modal ? <Modal cancel={this.cancel} name={this.props.pokemonData.detail_pokemon.name} go={this.go}/> : ''
            }
            {
                this.state.modal_fire_success ? 
                <ModalFire cancel={this.cancelCatch} ref={this.inputRef} name={this.props.pokemonData.detail_pokemon.name} status="success" go={this.goCatch}/> : 
                ''
            }
            {
                this.state.modal_fire_fail ? 
                <ModalFire cancel={this.cancelCatchFail} status="fail"/> : 
                ''
            }
            <div className="detail">
                <div className="detail__persona">
                    <img src={DetailPoke} className="detail__imgpoke" alt="img_poke"></img>
                    <img src={DetailCircle} className="detail__imgcircle" alt="img_circle"></img>
                    <img src={DetailEllipse} className="detail__imgellipse" alt="img_ellipse"></img>
                    <button className="go_back" onClick={this.goBack} to="/"><img src={LeftArrow} alt="img_arrow_back"></img></button>
                    {
                        header
                    }
                    <div className="wrap-img">
                        {
                            PokeImage
                        }
                    </div>
                    <div className="detail__body">
                        <div className="catch">
                            <button onClick={() => this.catchPoke()} style={{textTransform: 'capitalize'}}>Catch {this.props.pokemonData.detail_pokemon.name}</button>
                        </div>
                        <div className="tab-header" ref={this.parentTab}>
                            {/* inget jangan nambah apa apa didua kontent ini */}
                            <Tab title="About" dataClass="tab active" dataId="about" event={this.tabClick}/>
                            <Tab title="Abilities" dataClass="tab" dataId="abilities" event={this.tabClick}/>
                            <Tab title="Moves" dataClass="tab" dataId="moves" event={this.tabClick}/>
                            <Tab title="Stats" dataClass="tab" dataId="stats" event={this.tabClick}/>
                        </div>
                        <div className="tab-content" ref={this.parentContent}>
                        {/* style={this.state.active ? styleNone : styleFlex} */}
                            {/* <About dataId="about" dataClass="active"/>
                            <Abilities dataId="abilities"/>
                            <Moves dataId="moves"/>
                            <Stats dataId="stats"/>     */}
                            {
                                about
                            }
                            {
                                abilities
                            }
                            {
                                moves
                            }
                            {
                                stats
                            }
                        </div>
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
        fetchPokemonDetail: (id) => dispatch(fetchPokemonDetail(id)),
        catchPokemon: (id, name, generatedId) => dispatch(catchPokemon(id, name, generatedId))
    }
}
const mapStateToProps = state =>{
    return {
        pokemonData: state.pokemon,
        pokemonCatch: state.catchPokemon
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);