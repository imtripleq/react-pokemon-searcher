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
      },
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
    this.setState({
      newPokemon: {
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = () => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...this.state.newPokemon }),
    });
  };
  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm
          newName={this.handleInputChange}
          newHp={this.handleInputChange}
          newFrontImg={this.handleInputChange}
          newBackImg={this.handleInputChange}
          newSubmit={this.handleSubmit}
          nameValue={this.state.newPokemon.name}
        />
        <br />
        <Search />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
      </Container>
    );
  }
}

export default PokemonPage;
