# Chat room by Michael Wolff

This is currently a poorly done chat room that allows users to login with FacebookLoginButton

##Batman theme

The theme of this application is batman, the bot will respond with batmanish things as Alfred

###Known Issues
-For Some Reason it was only working properly on Microsoft Edge-
1. Just about everything
2. For some reason when I "import models" and "models.db.create_all()" I am given an error
3. Facebook login is working however googles is not.
4. I can't seem to retrieve the user pictures properly
5. Honestly this is kinda a mess right now
6. I just tested it out on Microsoft Edge and everything ran MUCH better than it did in chrome, I wonder how many of my problems stemmed from testing in chrome
7. The google login isn't work correctly.
8. 


###Changes that have been made
I managed to break something with the authentication, I had everything working and then the whole hting came crumblin down
Working on adding the heroku page with a database(Not updating messages properly still 2)
For Some reason the database works just fine when hosted on cloud9 but not on Heroku
had to reinstall socket io so that I could see buttons again webpack was failing
Got postgres working again
sudo service postgresql start
Messing with the database# project2-h1-mwolff-csumb.edu-Redo-

###Points made since first handin
1 point: public chat room must be available at the endpoint /
2 points: public chat room has a background image
1 point: all public chat room text and images are legible
3 points: chat log of the room is always visible (messages sent and received)
2 point: input field is always visible 
1 point: page itself should not scroll
1 point: the chat log of the room should be at least 50% of the width of the screen
2 points: all messages from other users must look consistent
1 point: username, nickname, or real name of the sender must be next to message
1 point: profile picture of the sender must be next to their name

2 points: chatbot is clearly identifiable
1 point: !! about makes the bot message the room with a description
1 point: !! help makes the bot message the room with a list of all commands
1 point: !! say <something> makes the bot say <something> to the room
1 point: 1 other command
1 point: another command 
1 point: bot acknowledges unrecognized commands

2 points: all clients are able to send message to web server
4 points: all messages received on server are relayed to all clients

2 points: database is not SQLite
5 points: chat log at / loads with recent or all history
3 points: messages are persisted via database

3 points: users can only send messages after authentication
1 point: login with Facebook button is present on page and login flow works
1 point: username, nickname, email, or real name is pulled from FB
1 point: profile picture is pulled from FB

1 point: README.md is in the root of the repository on Github
1 point: Theme is explained in readme file
1 point: How theme is implemented is explained in readme file
1 point: Acknowledgement of known problems, if they exist, in readme file
1 point: Description of how to improve in readme file




# project2-h2-mwolff-csumb.edu
