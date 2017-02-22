import * as React from 'react';
import {ChatMessage} from './ChatMessage';
import { Socket } from './Socket';

export class ChatMessageList
extends React.Component {
     constructor(props){
        super(props);
        this.state = {
            'IsLoggedIn':true,
            'messages':[]
        }
    }
    componentDidMount(){
        /*Socket.on('logged in', (data) => {
            console.log("Checking google");
                var auth = gapi.auth2.getAuthInstance();
                let user=auth.currentUser.get();
                
                if(user.isSignedIn()){
                    this.setState({
                        'IsLoggedIn': true,
                        'messages': data['messages']
                    });
                    console.log("User is signed in");
                } else {
                    console.log("Checking facebook");
                    var fbLogin = false;
                    FB.getLoginStatus(function(response) {
                        if (response.status == 'connected'){
                            console.log("Connected to fb");
                            this.setState({
                                'IsLoggedIn': true,
                                'messages': data['messages']
                            });
                            console.log("User is signed in");
                        }
                    });
                    if(!fbLogin){
                        this.setState({
                            'IsLoggedIn': false
                        });
                        console.log("User is logged out");   
                    }
                }
        });*/
        Socket.on('all users', (data) => {
            console.log("Checking google");
                var auth = gapi.auth2.getAuthInstance();
                let user=auth.currentUser.get();
                var loggedIn = false;
                if(user.isSignedIn()){
                    this.setState({
                        'IsLoggedIn': true
                    });
                    console.log("User is signed in");
                } else {
                    console.log("Checking facebook");
                    var fbLogin = false;
                    FB.getLoginStatus(function(response) {
                        if (response.status == 'connected'){
                            console.log("Connected to fb");
                            loggedIn = true;
                            console.log("User is signed in");
                        }
                    });
                    if(!fbLogin){
                        this.setState({
                            'IsLoggedIn': false
                        });
                        console.log("User is logged out");   
                    }
                    if(loggedIn==true){
                        this.setState({
                            'IsLoggedIn': true
                        });
                    }
                }
        });
         //When we get a socket call with the type 'all messages', set our messages to that object
            Socket.on('all messages', (data) => {
                console.log('all messages recieved, checking if user is logged in');
                console.log("Checking google");
                var auth = gapi.auth2.getAuthInstance();
                let user=auth.currentUser.get();
                
                if(user.isSignedIn()){
                    this.setState({
                        'messages': data['messages']
                    });
                    console.log("User is signed in, messages: "+data['messages']);
                } else {
                    console.log("Checking facebook");
                    var fbLogin = false;
                    var messages = []
                    var isMessages = false;
                    FB.getLoginStatus(function(response) {
                        if (response.status == 'connected'){
                            console.log("Connected to fb");
                            isMessages = true;
                            console.log("User is signed in");
                        }
                    });
                }
                if(isMessages){
                    this.setState({
                        'messages': data['messages']
                    });
                }
            });
    }
    render(){
        const listItems = this.state.messages.map((a,i) => {
            return <ChatMessage key={i} message={a}/>
        });
        
        const isLoggedIn = this.state.IsLoggedIn;
        if (isLoggedIn) {
            console.log('Logged in');
            return (
                <div>
                    <ul>{listItems}</ul>
                </div>
            );
        } else {
           console.log('Not Logged in');
            return (
                <div>
                    <p>Not Logged in</p>
                </div>
            ); 
        }
    }
}