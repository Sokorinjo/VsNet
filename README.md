# MERN-VSnet
Fullstack web app built with MERN stack that allows users to post, comment and chat.

## Setup/Install
**1. Clone git repo.**

**2. Add *.env* file.**<br>
This file needs to contain four things:
* PORT - 8000 or any other,
* MONGO_URI - link to mongodb collection,
* ACCESS_TOKEN_SECRET - secret for access token,
* REFRESH_TOKEN_SECRET - secret for refresh token.

Generating access and refresh token secrets:
1. In terminal type node to get NodeJs prompt.
2. Run two times : `require('crypto').randomBytes(64).toString('hex')`
3. Copy and paste string in **.env** file for *ACCESS_TOKEN_SECRET* and *REFRESH_TOKEN_SECRET*

**3. Install neccessary dependencies** <br>
1. From the project folder run: `npm install`
2. Go to the frontend folder and run the same command: `cd frontend; npm run install`

**4. Run the application**
Open terminal and run: `npm run dev`
