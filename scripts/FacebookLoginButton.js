import * as React from 'react';
import { Socket } from './Socket';

export class FacebookLoginButton
extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      'username':''
    }
  }
    
    componentDidMount(){
      // facebook signin  button render
        window.fbAsyncInit = function() {
          FB.init({
                appId      : '265055400595856',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.8'
          });
    
          // login callback implementation goes inside the function() { ... } block
          FB.Event.subscribe('auth.login', function(response) {
                FB.api('/me', function(meresponse) {
                  Socket.emit('user connected', {'facebook_user_token':response.authResponse.accessToken,'google_user_token':'','username':meresponse.name});
                });
          });
          
          FB.Event.subscribe('auth.logout', function(response) {
              FB.api('/me', function(meresponse) {
                  Socket.emit('user quit',{'username':meresponse.name});
              });
          });

        }.bind(this);
    
        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        Socket.on('user left', (data) => {
          if(data['service']=='facebook'){
            Socket.emit('user quit',{'username':this.state.username});
          }
        });
    }
    
    render() {
      return ( <div>
          <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
       </div> );
    };
}