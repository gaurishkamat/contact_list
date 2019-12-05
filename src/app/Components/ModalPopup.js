import React from 'react';
import { Modal, Grid, Input, Button, Icon, Form } from 'semantic-ui-react';


const ModalPopup = (props) => {

    const {handleOpen, handleClose, modalOpen, saveListener, onInputChange, addOrUpdate, selectedContact} = props;
    
    let btnSave = addOrUpdate == 'Add' ? 'Add' : 'Update';
return(
<Modal 
    trigger={<Icon onClick={handleOpen} name="user plus" size="huge"/>}
    open={modalOpen}
    onClose={handleClose}
    size='tiny'>
    <Modal.Header>{addOrUpdate} Contact</Modal.Header>
    <Modal.Content>
        <Form onSubmit={saveListener} autocomplete="off">
            <Grid divided='vertically'>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Input type="text" name="firstname"  id="firstname" placeholder="Firstname" value= {selectedContact.firstname} onChange={onInputChange} fluid/><br/>
                        <Input type="text" name="lastname"  id="lastname" placeholder="Lastname" value= {selectedContact.lastname}  onChange={onInputChange} fluid/><br/>
                        <Input type="email" name="email"  id="email" placeholder="Email" value= {selectedContact.email}  onChange={onInputChange} fluid/><br/>
                        <Input type="text" name="contact"  id="contact" placeholder="Contact" value= {selectedContact.contact}  onChange={onInputChange} fluid/><br/>
                        <select name="status" id="status" placeholder='Select status' value= {selectedContact.status}  onChange={onInputChange} fluid="true">
                            <option name="status" value="Active">Active</option>
                            <option name="status" value="Inactive">Inactive</option>
                        </select>
                        
                        {/* <Dropdown
                            name="status"
                            id="status"
                            placeholder='Select status'
                            onChange={this.onInputChange} 
                            fluid
                            selection
                            value= {selectedContact.status}
                            options={statusOptions}
                        /> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Button color="green" type="submit">{btnSave}</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button color="red" onClick={handleClose}>Close</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    </Modal.Content>
</Modal>
)}  

export default ModalPopup;
