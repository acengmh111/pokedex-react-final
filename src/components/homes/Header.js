import React from 'react';
import SearchIcon from '../../assets/images/Search.svg';
function Header(props) {
    return (
        <div className="home__header">
            {
                props.list ?
                (<h1>My Pokemon</h1>)
                :
                (<h1>Pokedex</h1>)
            }
            
            {/* <form className="home__search">
                <input type="text" placeholder="Search Pokemon"></input>
                <button className="bg_green"><img src={SearchIcon}></img></button>
            </form> */}
        </div>
    );
}

export default Header;