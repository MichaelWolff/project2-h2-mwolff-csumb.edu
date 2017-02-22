import * as React from 'react';
import {ChatMessageList} from './ChatMessageList';
import {ChatBox} from './ChatBox';
import {FacebookLoginButton} from './FacebookLoginButton';
import {GoogleLoginButton} from './GoogleLoginButton';
import { Socket } from './Socket';

export class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'messages':[]
        }
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }
    
    
    handleMessageSubmit(message){
        console.log("Client Submitting New Message: "+message.text);
        var auth = gapi.auth2.getAuthInstance();
        let user=auth.currentUser.get();
        if(user.isSignedIn()){
            Socket.emit('new message', {'facebook_user_token':'','google_user_token':user.getAuthResponse().access_token,'message':{'text': message.text}});
        } else {
            FB.getLoginStatus((response)=>{
                if(response.status=='connected'){
                    Socket.emit('new message', {'facebook_user_token':response.authResponse.accessToken,'google_user_token':'','message':{'text': message.text}});
                }
            });   
        }
    }
    
    render() {
        return (
            <div>
                <ChatMessageList/>
                <ChatBox submitfnc={this.handleMessageSubmit}/>
            </div>
        );
    }
}
