import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Content } from './Content';
import { UserList } from './UserList';
import { FacebookLoginButton } from './FacebookLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Socket } from './Socket';

ReactDOM.render( <FacebookLoginButton />,  document.getElementById('facebookButton') );
ReactDOM.render( <GoogleLoginButton />,  document.getElementById('googleButton') );
ReactDOM.render( <Content />,  document.getElementById('content') );
ReactDOM.render( <UserList />,  document.getElementById('userlist') );
