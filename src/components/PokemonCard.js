import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  constructor() {
    super();
    this.state = {
      togglePic: true,
    };
  }
  toggleButton = () => {
    const toggle = !this.state.togglePic;
    this.setState({ togglePic: toggle });
  };

  render() {
    const { hp, name } = this.props.pokemon;
    const {
      sprites: { back, front },
    } = this.props.pokemon;
    // console.log(this.state);
    // console.log(this.props.pokemon);
    return (
      <Card>
        <div>
          <div className="image">
            <img
              src={this.state.togglePic ? front : back}
              onClick={this.toggleButton}
              alt="oh no!"
            />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
