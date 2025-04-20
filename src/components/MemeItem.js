import React, { Component } from "react";
import { connect } from "react-redux";
import { createMeme } from "../actions";

class MemeItem extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false,
      creating: false
    };
  }

  postMeme() {
    this.setState({ creating: true });
    
    const { text0, text1 } = this.props;
    const memeObj = {
      template_id: this.props.meme.id,
      text0,
      text1,
    };
    
    this.props.createMeme(memeObj)
      .then(() => {
        this.setState({ creating: false });
      })
      .catch(() => {
        this.setState({ creating: false });
      });
  }
  
  render() {
    return (
      <div
        className="meme-item"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        onClick={() => this.postMeme()}
      >
        <img
          src={this.props.meme.url}
          alt={this.props.meme.name}
          className={this.state.hovered || this.state.creating ? "meme-img darken-img" : "meme-img"}
        />

        <p className={this.state.hovered || this.state.creating ? "meme-txt" : "no-txt"}>
          {this.state.creating ? "Creating..." : this.props.meme.name}
        </p>
      </div>
    );
  }
}

export default connect(null, { createMeme })(MemeItem);