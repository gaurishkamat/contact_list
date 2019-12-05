import { createStore } from 'redux';
const uuid = require('uuid');


const defaultState = {
    count: 0,
    modalOpen: false,
    addOrUpdate: 'Add',
    selectedContact: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
        status: ''
    },
    contacts: [{
        id: uuid(),
        firstname: 'Gaurish',
        lastname: 'Kamat',
        email: 'gaurishkamat23@gmail.com',
        contact: '9922339855',
        status: 'Active'
    },{
        id: uuid(),
        firstname: 'Savan',
        lastname: 'Kumar',
        email: 'savansharma22@gmail.com',
        contact: '9023209889',
        status: 'Inactive'
    }]
}


const configureStore = createStore((state = defaultState, action) => {
    switch(action.type){
        case 'ADD_CONTACT': {
            if(typeof action.value == 'object'){
                let value = {...action.value, id: uuid()};
                const newcontacts = [...state.contacts];
                newcontacts.push(value);
                return {...state, contacts: newcontacts}
            }
            return state;
        }

        case 'INCREMENT':{
            return {...state, count: state.count+1}
        }
        case 'UPDATE_CONTACT': {
            if(typeof action.value == 'object'){
                let updatedContacts = [...state.contacts];
                // console.log("STATE",updatedContacts)
                updatedContacts = updatedContacts.map( contact => {
                    // console.log('ACTION', contact, action.value)
                    if(state.selectedContact.id == contact.id){
                        // console.log('INSIDE IF')
                        return {...contact, ...action.value}
                        console.log('INSIDE CONTACT', contact)
                    }
                    return contact;
                })
                
                // console.log("STATE2",updatedContacts)
                // newContacts = [...state, action.value];
                return {...state, contacts: updatedContacts}
            }
            
            return state;
        }

        case 'DELETE_CONTACT': {
            let newContacts = Object.values(state.contacts).filter((item) => item.id != action.value);
            return {...state, contacts: newContacts}
        }

        case 'MODAL_OPEN': {
            let selectedContact = action.value.item ? action.value.item : state.selectedContact;
            return {...state, modalOpen: true, addOrUpdate: action.value.addOrUpdate, selectedContact}
        }

        case 'MODAL_CLOSE': {
            return {...state, modalOpen: false}
        }

        case 'UPDATE_SELECTED_DATA': {
            let newSelectedContact = {...state.selectedContact}
            newSelectedContact[`${action.value.name}`] = action.value.val;
                        return {...state, selectedContact: newSelectedContact}
        }

        case 'CLEAR_SELECTED_DATA': {
            return {...state, selectedContact: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                contact: '',
                status: ''
            }}
        }

        default: return state;
    }
})

export default configureStore;