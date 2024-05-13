import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';

/**
 * DataTable component renders a table to display user data
 * and provides functionality to edit or delete each user.
 */
class DataTable extends Component {
    /**
     * Delete an item from the state and API
     * @param {number} id - The ID of the user to be deleted
     */
    deleteItem = id => {
        // Ask for confirmation before deleting
        let confirmDelete = window.confirm('Delete item forever?');
        if (confirmDelete) {
            // Send a DELETE request to the API to delete the user
            fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(item => {
                    // Remove the deleted user from the state
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        const { items, updateState } = this.props;

        // Map items to table rows
        const tableRows = items.map(item => (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                    <div style={{ width: '110px' }}>
                        {/* Render ModalForm for editing */}
                        <ModalForm buttonLabel="Edit" item={item} updateState={updateState} />
                        {' '}
                        {/* Button to delete the item */}
                        <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                    </div>
                </td>
            </tr>
        ));

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render table rows */}
                    {tableRows}
                </tbody>
            </Table>
        );
    }
}

export default DataTable;
