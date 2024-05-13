import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

/**
 * AddEditForm component renders a form for adding or editing user data.
 * It handles input changes, form submission, and populating form fields for editing.
 */
class AddEditForm extends React.Component {
    state = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };

    /**
     * Updates the state with the value of the input fields when they change.
     * @param {Object} e - The event object
     */
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    /**
     * Handles form submission for adding or editing a user.
     * Sends a request to the API and updates the state accordingly.
     * @param {Object} e - The event object
     */
    handleSubmit = e => {
        e.preventDefault();
        const { id, firstName, lastName, email, phone } = this.state;
        const { item, addItemToState, updateState, toggle } = this.props;

        // Determine the API endpoint and HTTP method
        const endpoint = item ? `${process.env.REACT_APP_BASE_URL}/users/${id}` : `${process.env.REACT_APP_BASE_URL}/users/add`;
        const method = item ? 'PUT' : 'POST';

        // Send a request to the API
        fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, firstName, lastName, email, phone })
        })
            .then(response => response.json())
            .then(updatedItem => {
                // Update the state based on whether the item already exists or not
                if (item) {
                    updateState(updatedItem);
                } else {
                    addItemToState(updatedItem);
                }
                // Close the modal after submission
                toggle();
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        // Populate form fields if editing an existing item
        const { item } = this.props;
        if (item) {
            const { id, firstName, lastName, email, phone } = item;
            this.setState({ id, firstName, lastName, email, phone });
        }
    }

    render() {
        const { firstName, lastName, email, phone } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" onChange={this.onChange} value={firstName} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" onChange={this.onChange} value={lastName} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={this.onChange} value={email} />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" onChange={this.onChange} value={phone} placeholder="ex. 555-555-5555" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm;
