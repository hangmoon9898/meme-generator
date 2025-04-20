import React, { Component } from "react";
import { connect } from "react-redux";

class MyMemes extends Component {
  render() {
    if (this.props.myMemes.length === 0) {
      return (
        <div className="empty-memes-message">
          No memes created yet. Select a template and add text to create your first meme!
        </div>
      );
    }
    
    return (
      <div className="my-memes-container">
        {this.props.myMemes.map((meme, index) => {
          // Handle case where meme structure might be different
          const imageUrl = meme.data?.url || meme.url || '';
          
          return imageUrl ? (
            <img
              key={index}
              src={imageUrl}
              alt="my-meme"
              className="my-meme-img"
            />
          ) : null;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myMemes: state.myMemes,
  };
}

export default connect(mapStateToProps, null)(MyMemes);