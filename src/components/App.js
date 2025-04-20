import React, { Component } from "react";
import { connect } from "react-redux";
import MemeItem from "./MemeItem";
import MyMemes from "./MyMemes";
import { Form, FormGroup, FormControl, FormLabel, Container, Row, Col, Card } from "react-bootstrap";
import "../styles/index.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      memeLimit: 10,
      text0: "",
      text1: "",
      searchTerm: "",
    };
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value.toLowerCase() });
  };

  filterMemes = () => {
    if (!this.state.searchTerm) {
      return this.props.memes.slice(0, this.state.memeLimit);
    }
    
    return this.props.memes
      .filter(meme => meme.name.toLowerCase().includes(this.state.searchTerm))
      .slice(0, this.state.memeLimit);
  };

  render() {
    return (
      <Container fluid className="meme-container">
        <Row className="header-section mb-4">
          <Col>
            <h1 className="title">Meme Generator</h1>
            <p className="subtitle">Create and share your favorite memes!</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={8}>
            <Card className="text-input-card">
              <Card.Body>
                <Card.Title>Add Your Text</Card.Title>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <FormLabel>Top Text</FormLabel>
                        <FormControl
                          type="text"
                          placeholder="Enter top text..."
                          value={this.state.text0}
                          onChange={(event) => this.setState({ text0: event.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <FormLabel>Bottom Text</FormLabel>
                        <FormControl
                          type="text"
                          placeholder="Enter bottom text..."
                          value={this.state.text1}
                          onChange={(event) => this.setState({ text1: event.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="mb-3">
                    <FormLabel>Search Templates (optional) </FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Search by name..."
                      onChange={this.handleSearch}
                    />
                  </FormGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="created-memes-card">
              <Card.Body>
                <Card.Title>Your Created Memes</Card.Title>
                <MyMemes />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="templates-card">
              <Card.Body>
                <Card.Title>Choose a Template</Card.Title>
                <div className="meme-templates-container">
                  {this.filterMemes().map((meme, index) => {
                    return (
                      <MemeItem
                        key={index}
                        meme={meme}
                        text0={this.state.text0}
                        text1={this.state.text1}
                      />
                    );
                  })}
                </div>
                {this.props.memes.length > this.state.memeLimit && (
                  <div 
                    className="load-more-button"
                    onClick={() => {
                      this.setState({ memeLimit: this.state.memeLimit + 10 });
                    }}
                  >
                    Load More Templates
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, null)(App);