import React from 'react';
import { Grid, Image, Icon, Card, Button } from 'semantic-ui-react';

export const ContactItem = (props) => {

    const { item, onDeleteUser, onUpdateUser } = props;
    const {firstname, lastname, email, contact, status, id} = item;
    console.log(firstname, props, id)
    return(
        <Grid>
            <Grid.Row celled="true">
                <Grid.Column width={4}>
                    <Image  src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' size='small' />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Grid.Row className={'contact-name'}>
                        <h1>{firstname + ' ' + lastname}</h1>
                    </Grid.Row>
                    <Grid.Row>
                        <pre><strong>Email: </strong>{email}</pre>
                        <pre><strong>Contact: </strong>{contact}</pre>
                        <pre color={status == 'Active' ? 'green' : 'red'}><strong>Status: </strong>{status}</pre>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Icon name='pencil' size='large' color="blue" onClick={(e) => onUpdateUser(e, item)}/>
                    <Icon name='remove' size='large' color="red" onClick={(e) => onDeleteUser(e, item)}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    // return(
    //     <Card>
    //     <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    //     <Card.Content>
    //       <Card.Header>{firstname + ' ' + lastname }</Card.Header>
    //       <Card.Meta>
    //         <span className='date'>{contact}</span>
    //       </Card.Meta>
    //       <Card.Description>
    //         {email}
    //       </Card.Description>
    //       <Card.Description color="green">
    //         {status}
    //       </Card.Description>
    //     </Card.Content>
    //     <Card.Content extra>
    //     <div className='ui two buttons'>
    //       <Button basic color='blue'onClick={(e) => onUpdateUser(e, item)}>
    //         Edit
    //       </Button>
    //       <Button basic color='red' onClick={(e) => onDeleteUser(e, item)}>
    //         Delete
    //       </Button>
    //     </div>
    //     </Card.Content>
    //   </Card>
    // )

}


{/* <div>
<pre>Name: {item.firstname + ' ' + item.lastname}</pre>
<pre>Email: {item.email}</pre>
<pre>Contact: {item.contact}</pre>
<pre>Status: {item.status}</pre>
</div> */}


