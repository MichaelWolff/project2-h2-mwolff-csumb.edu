"""
This is the main server file for this application. It imports flask (For HTML templating, Python server, webpack script watching, JS React, etc).
"""
import os
import flask
import flask_socketio
import json
import requests

app = flask.Flask(__name__)
import models

#Get the flask_socketio socket
socketio = flask_socketio.SocketIO(app)

#Chatroom messages
messages = []
users = []

#API Keys/Secrets
google_api_key = os.getenv("GOOGLE_API_KEY")
#apisecret = os.getenv("IMAGES_API_SECRET")

#index endpoint
@app.route('/')
def index():
    return flask.render_template('index.html')

#On socketio connect... (When a client connects...)
#TODO: Authenticate before showing messages
@socketio.on('user connected') 
def on_connect(data):
    print'Someone connected!'
    text = ''
    if data['facebook_user_token']!='':
        response=requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token='+data['facebook_user_token'])
        userJSON=response.json()
        if userJSON['name']!=None:
            user= {'text':userJSON['name']}
            text = userJSON['name']
    elif data['google_user_token']!='':
        response=requests.get('https://www.googleapis.com/plus/v1/people/me?key='+google_api_key+'&access_token='+data['google_user_token'])
        userJSON=response.json()
        if userJSON['displayName']!=None:
            user= {'text':userJSON['displayName']}
            text = userJSON['displayName']
    
    #Query for all Message models
    messages = getMessages()
    #users = getUsers()
    users.append(user)
    
    serverMessage = parseWithAlfred(">>"+text)
    if serverMessage is not None:
        messages.append(json.dumps(serverMessage))
    socketio.emit('logged in',{
        'username':user['text'],'messages': messages,
    })
    
    #Emit the new list of messages to all the clients
    socketio.emit('all messages', {
        'messages': messages,
    })
    
    #Emit the new list of messages to all the clients
    socketio.emit('all users', {
        'usernames': users,
    })
    
@socketio.on('user quit') 
def on_quit(data):
    print data['username']+" is leaving!"
    user= {'text':data['username']}
    #users = getUsers()
    
    index = getUserIndex(data['username'])
        
    #Query for all Message models
    messages = getMessages()
    
    serverMessage = parseWithAlfred("<<"+data['username'])
    if serverMessage is not None:
        messages.append(json.dumps(serverMessage))
    #Emit the new list of messages to all the clients
    socketio.emit('all users', {
        'usernames': users,
    })
    
    #Emit the new list of messages to all the clients
    socketio.emit('all messages', {
        'messages': messages,
    })
    
#On socketio disconnect... (When a client disconnects...)
#TODO: Authenticate before showing messages
@socketio.on('user disconnected') 
def on_disconnect(data):
    print'Someone disconnected!'
    
    socketio.emit('user quit', {
        'service': data['service'],'username':data['username']
    })

#On socketio recieve new message... (When client sends a message)
#TODO: Authenticate before sending messages
@socketio.on('new message') 
def messageRecieved(data):
    print'Sent a message!'
    if data['facebook_user_token']!='':
        response=requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture%2Clink&access_token='+data['facebook_user_token'])
        userJSON=response.json()
        if userJSON['name']!=None:
            print "USER DATA:"+str(userJSON);
            if userJSON.has_key('link'):
                print "LINK:"+userJSON['link']
                link = userJSON['link']
            else:
                print "NO LINK"
                link = ''
            user= {'text':userJSON['name'],'picture':userJSON['picture']['data']['url'],'link':link}
            #print 'text:'+userJSON['name']+',picture:'+userJSON['picture']+',link:'+link
            
    elif data['google_user_token']!='':
        response=requests.get('https://www.googleapis.com/plus/v1/people/me?key='+google_api_key+'&access_token='+data['google_user_token'])
        userJSON=response.json()
        if userJSON['displayName']!=None:
            print "USER DATA:"+str(userJSON);
            if userJSON.has_key('url'):
                link = userJSON['url']
            else:
                if userJSON['emails'][0].has_key('value'):
                    link = userJSON['emails'][0]['value']
                else:
                    link = ''
            user= {'text':userJSON['displayName'],'picture':userJSON['image']['url'],'link':link}
            print 'text:'+userJSON['displayName']+',picture:'+userJSON['image']['url']+',link:'+link
    
    #Query for all Message models
    messages = getMessages()
    #Create a new message JSON
    message= {'text':data['message']['text'],'username':user['text'],'picture':user['picture'],'link':user['link']}
    serverMessage = parseWithAlfred(data['message']['text'])
    if serverMessage is None:
        #Append the new message to the global messages array
        messages.append(json.dumps(message))
        #Commit it to the DB
        commitMessage(message)
    else:
        messages.append(json.dumps(serverMessage))
    
    #Emit the new list of messages to all the clients
    socketio.emit('all messages', {
        'messages': messages
    })
    
def parseWithAlfred(message):
    print "Parsing Message: "+message
    print "Checking For Markers: "+message[0:2]
    text = ""
    if message[0:2]=="!!":
        print "Checking ForCommands: "+message[2:]
        if message[2:]=="help":
            print "Found help command"
            text = "I have no help function yet, but soon I will and it will be AWESOME!"
    if message[0:2]==">>":
        print "Alfred read that a user logged in"
        text = "Welcome "+message[2:]+"! Type !!help for a list of commands!"
    if message[0:2]=="<<":
        print "Alfred read that a user logged out"
        text = "Everyone say goodbye to "+message[2:]+"!"
    
    if(text!=""):
        message={'text':text,'username':'Alfred','picture':'','link':''}
        commitMessage(message)
        return message
    
    return None
        
#Commit a message to the database
def commitMessage(message):
     #Create a Message model object for the new message
    message = models.Message(message['text'],message['username'],message['picture'],message['link'])
    #Add the new Message model object to the "session" (like git's working area?)
    models.db.session.add(message)
    #Commit the changes to the database
    models.db.session.commit()

#Get all previous messages from the database
def getMessages():
    #Query for all Message models
    messagesQuery = models.Message.query.all()
    #Convert the query in to an array of strings
    all_messages = [];
    for i in range(0,len(messagesQuery)):
        message = {'text':messagesQuery[i].text, 'username':messagesQuery[i].username, 'picture':messagesQuery[i].picture, 'link':messagesQuery[i].link}
        all_messages.append(json.dumps(message))
    return all_messages #mssgs
    
#Get all previous messages from the database
def getUsers():
    #Query for all Message models
    usersQuery = models.UserProfile.query.all()
    #Convert the query in to an array of strings
    all_users = [];
    for i in range(0,len(usersQuery)):
        user = {'text':usersQuery[i].username}
        all_users.append(json.dumps(user))
    return all_users #mssgs
    
def getUserIndex(username):
    print "Searching for user "+username
    index = -1
    for i in range(0,len(users)):
        print users[i]['text'] +" vs "+username
        if users[i]['text']==username:
            index = i
            del users[i]
            return index
    return -1

if __name__ == '__main__':
    socketio.run(app,host=os.getenv('IP','0.0.0.0'),port=int(os.getenv('PORT',8080)),debug=True)
