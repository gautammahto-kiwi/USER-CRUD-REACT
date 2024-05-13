import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddEditForm from '../Forms/AddEditForm';

/**
 * ModalForm component renders a modal for adding or editing user data.
 */
class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false // Modal visibility state
        };
    }

    /**
     * Toggle the visibility of the modal.
     */
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    render() {
        const { buttonLabel, addItemToState, updateState, item } = this.props;
        const { modal } = this.state;

        // Close button for the modal
        const closeBtn = <button className="btn-close" onClick={this.toggle}></button>;

        // Determine button color and title based on the operation (Add/Edit)
        const label = buttonLabel;
        const isEdit = label === 'Edit';
        const buttonColor = isEdit ? 'warning' : 'success';
        const title = isEdit ? 'Edit User' : 'Add New User';

        return (
            <div>
                {/* Button to trigger modal */}
                <Button
                    color={buttonColor}
                    onClick={this.toggle}
                    style={{ float: 'left', marginRight: '10px' }}>
                    {label}
                </Button>
                {/* Modal component */}
                <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
                    {/* Modal header */}
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    {/* Modal body */}
                    <ModalBody>
                        {/* Render AddEditForm inside modal body */}
                        <AddEditForm
                            addItemToState={addItemToState}
                            updateState={updateState}
                            toggle={this.toggle}
                            item={item}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalForm;
