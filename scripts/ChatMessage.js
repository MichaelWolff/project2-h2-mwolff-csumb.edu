import * as React from 'react';

export class ChatMessage 
extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'message':'',
            'link':'',
            'username':''
        }
        this.state.message = JSON.parse(this.props.message);
    }
    render() {
        const link = this.state.message['link'];
        const picture = this.state.message['picture'];
        if(!(picture==="")){
            if(link===""){
                return (<li className="messageItem">
                            <img className="profilePicture" src={picture} /><b className="username">{this.state.message['username']}</b>
                            <p className="messageText">{this.state.message['text']}</p>
                        </li>);
            } else {
                if(link.indexOf('@') > -1){
                    let email = "mailto:"+link;
                    return (<li className="messageItem">
                            <img className="profilePicture" src={picture} /><a href={email} className="username">{this.state.message['username']}</a>
                            <p className="messageText">{this.state.message['text']}</p>
                        </li>); 
                } else {
                    return (<li className="messageItem">
                            <img className="profilePicture" src={picture} /><a href={link} className="username">{this.state.message['username']}</a>
                            <p className="messageText">{this.state.message['text']}</p>
                        </li>); 
                }
            }
        } else {
            if(link===""){
                return (<li className="bot_messageItem">
                            <b className="username">{this.state.message['username']}</b>
                            <p className="messageText">{this.state.message['text']}</p>
                        </li>);
            } else {
                console.log("LINK IS NOT NULL, LINK IS ~~~"+link+"~~~");
                return (<li className="messageItem">
                            <a href={link} className="username">{this.state.message['username']}</a>
                            <p className="messageText">{this.state.message['text']}</p>
                        </li>);
            }
        }
    }
}