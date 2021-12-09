import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

const url = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      newPokemon: {
        name: "",
        hp: 0,
        sprites: {
          front:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
          back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
        },
      },
      search: "",
    };
  }

  componentDidMount() {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ pokemon: data });
        console.log(data);
        console.log(this.state);
      });
  }

  handleInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      newPokemon: { ...this.state.newPokemon, [e.target.name]: e.target.value },
    });
  };

  handleInputImg = (e) => {
    console.log(e.target.value);
    this.setState({
      newPokemon: {
        ...this.state.newPokemon,
        sprites: {
          ...this.state.newPokemon.sprites,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = () => {
    if (this.state.newPokemon.name !== "" && this.state.newPokemon.hp !== "") {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...this.state.newPokemon }),
      });
    } else return alert("Do not leave empty!");
  };
  render() {
    const searchResult = this.state.pokemon.filter((s) =>
      s.name.includes(this.state.search)
    );
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm
          newName={this.handleInputChange}
          newHp={this.handleInputChange}
          newFrontImg={this.handleInputImg}
          newBackImg={this.handleInputImg}
          newSubmit={this.handleSubmit}
          nameValue={this.state.newPokemon.name}
        />
        <br />
        <Search search={this.handleSearch} />
        <br />
        <PokemonCollection pokemon={searchResult} />
      </Container>
    );
  }
}

export default PokemonPage;
