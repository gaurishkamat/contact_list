import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/Reducer/appReducer';
import Home from './app/Components/Home';

class App extends React.Component{
    render(){
        configureStore.subscribe(()=>{
            console.log('Store', configureStore.getState());
        });

        // configureStore.dispatch({type:'INCREMENT'})

        // console.log('Store', store.contacts);
        return(
            <Provider store={configureStore}>
                <div>
                    <Home/>
                </div>
            </Provider>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));