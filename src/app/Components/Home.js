import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Message} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { ContactItem } from './ContactItem';
import ModalPopup from './ModalPopup';

class Home extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.saveListener = this.saveListener.bind(this);
        this.actionCreator = this.actionCreator.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onDropdownClick = this.onDropdownClick.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            status: ''
        }
    }
    
    saveListener(event, data){
        event.preventDefault();
        var data = new FormData(event.target);
        console.log(event.target);
        
        let action = this.props.addOrUpdate == 'Add' ? 'ADD_CONTACT' : 'UPDATE_CONTACT';
        this.props.actionHandler(this.actionCreator(action, {
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email: data.get('email'),
            contact: data.get('contact'),
            status: data.get('status')
        }));

        
        this.props.actionHandler({type: 'MODAL_CLOSE'})
        this.props.actionHandler({type: 'CLEAR_SELECTED_DATA', value: {}})
        // console.log('Clicked')
    }

    onDeleteUser(event, item){
        event.persist()
        // console.log('Hello', item.id)
        this.props.actionHandler(this.actionCreator('DELETE_CONTACT', item.id));
    }

    onUpdateUser(event, item){
        event.persist()
        // console.log('Hello', item.id)
        
        this.props.actionHandler({type: 'UPDATE_SELECTED_DATA', value: {id: item.id}})
        this.props.actionHandler({type: 'MODAL_OPEN', value: {addOrUpdate: 'Update', item: item}})
        this.props.actionHandler(this.actionCreator('UPDATE_CONTACT', item.id));
    }
    
    actionCreator(type, value){
        return {
            type,
            value  
        }
    }

    componentDidUpdate(){
        console.log('Updated');
    }
    
    handleOpen(){
        this.props.actionHandler({type: 'MODAL_OPEN', value: {addOrUpdate: 'Add'}})
    }

    handleClose(){
        this.props.actionHandler({type: 'MODAL_CLOSE'})
    }

    onDropdownClick(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onInputChange(event, data){
        console.log(event.target.name, event.target.value);
        this.props.actionHandler({type: 'UPDATE_SELECTED_DATA', value: {name: event.target.name, val: event.target.value}})
    }

    render(){
        console.log('PROPS', this.props);
        const { contacts, selectedContact } = this.props; 
        let statusOptions = [{
            key: 'Active',
            text: 'Active',
            value: 'Active',
            name: 'Active'
        },{
            key: 'Inactive',
            text: 'Inactive',
            value: 'Inactive',
            name: 'Inactive'
        }]
        return(
            <div>
                <div className='appheader'>
                    <h1 id="app-title">Contact List</h1>
                    <ModalPopup
                        handleOpen = {this.handleOpen}
                        handleClose = {this.handleClose}
                        saveListener = {this.saveListener}
                        onInputChange = {this.onInputChange}
                        modalOpen = {this.props.modalOpen}
                        addOrUpdate = {this.props.addOrUpdate}
                        selectedContact = {this.props.selectedContact}
                    />
                </div>
                {contacts.length ? 
                    contacts.map((item, index) => {
                        return (<ContactItem className='contact-item' item={item} key={index} onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser}/>)
                    }) : 
                <Message>
                    <Message.Header>No Contacts</Message.Header>
                    <p>
                    Please add contacts to display.
                    </p>
              </Message>}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        contacts: state.contacts,
        count: state.count,
        modalOpen: state.modalOpen,
        addOrUpdate: state.addOrUpdate,
        selectedContact: state.selectedContact
    }
}

function mapDispatchToProps(dispatch){
    return {
        actionHandler(data){
        console.log('Here')
        return dispatch(data)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


{/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                    <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                    We've found the following gravatar image associated with your e-mail
                    address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                    </Modal.Description> */}