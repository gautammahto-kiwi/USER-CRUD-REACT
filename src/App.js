import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalForm from './Components/Modals/Modal';
import DataTable from './Components/Tables/DataTable';

/**
 * App component is the main component of the application.
 * It manages the state of user data and renders the CRUD interface.
 */
class App extends Component {
  state = {
    items: [] // Array to store user data
  };

  /**
   * Fetches initial user data from the API when the component mounts.
   */
  componentDidMount() {
    this.getItems();
  }

  /**
   * Fetches user data from the API.
   */
  getItems = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users?limit=10&select=id,firstName,lastName,email,phone`)
      .then(response => response.json())
      .then(({ users }) => this.setState({ items: users }))
      .catch(err => console.log(err));
  };

  /**
   * Adds a new user item to the state.
   * @param {Object} item - The new user item to be added
   */
  addItemToState = (item) => {
    this.setState(prevState => ({ items: [...prevState.items, item] }));
  };

  /**
   * Updates an existing user item in the state.
   * @param {Object} updatedItem - The updated user item
   */
  updateState = (updatedItem) => {
    this.setState(prevState => ({
      items: prevState.items.map(item => (item.id === updatedItem.id ? updatedItem : item))
    }));
  };

  /**
   * Deletes a user item from the state.
   * @param {number} id - The ID of the user item to be deleted
   */
  deleteItemFromState = (id) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }));
  };

  render() {
    const { items } = this.state;

    return (
      <Container className="App">
        <Row>
          <Col xs={9}>
            <h1 style={{ margin: "20px 0" }}>User List</h1>
          </Col>
          <Col xs={3} style={{ margin: "20px 0" }}>
            {/* Render ModalForm component to add new user */}
            <ModalForm buttonLabel="Add User" addItemToState={this.addItemToState} />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Render DataTable component to display user data */}
            <DataTable items={items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
