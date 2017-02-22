import * as React from 'react';
import {UserProfile} from './UserProfile';
import { Socket } from './Socket';

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    //io.emit('sign in', {'user':{'username': profile.getName(),}});
};

export class UserList
extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'usernames':[],
            'IsLoggedIn':false,
        }
    }
    
    //When the component is mounted, add the Socketio listener
    componentDidMount(){
        Socket.on('all users', (data) => {
            console.log("Checking google");
                var auth = gapi.auth2.getAuthInstance();
                let user=auth.currentUser.get();
                var loggedIn = false;
                if(user.isSignedIn()){
                    this.setState({
                        'usernames': data['usernames'],
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
                            'usernames': data['usernames'],
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
        const listItem = this.state.usernames.map((a,i)=>{
            return <UserProfile key={a+""+i} name={a} username={a}/>;
        })
        if(this.state.IsLoggedIn==true){
          return (
                <div>
                    <h4>Active Users</h4>
                    <ul>{listItem}</ul>
                </div>
            );  
        } else {
            return <div><h4>Active Users</h4></div>;
        }
    }
}