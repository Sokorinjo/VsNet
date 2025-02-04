# MERN-VSnet
Fullstack web app built with MERN stack that allows users to post, comment and chat.

## Setup/Install
**1. Clone git repo.**
```
git clone git@github.com:Sokorinjo/VsNet.git
```

**2. Add *.env* file to the project folder.**<br>
This file needs to contain four things:
* PORT - 8000 or any other,
* MONGO_URI - link to mongodb collection,
* ACCESS_TOKEN_SECRET - secret for access token,
* REFRESH_TOKEN_SECRET - secret for refresh token.

Generating access and refresh token secrets:
1. In terminal type node to get NodeJs prompt.
2. Run: 
```
>require('crypto').randomBytes(64).toString('hex')
'b5accbc3eabe2ef9c13ccc29...'
```
3. Copy and paste string in **.env** file for *ACCESS_TOKEN_SECRET* and *REFRESH_TOKEN_SECRET*
```
ACCESS_TOKEN_SECRET=b5accbc3eabe2ef9c13ccc29...
REFRESH_TOKEN_SECRET=f8d9728a81ef3f7376d82bee5...
```
**3. Install necessary dependencies** <br>
1. From the project folder run: 
```
npm install
```
2. Go to the **frontend** folder and run the same command: 
```
cd frontend 
npm run install
```

**4. Run the application**<br>
Open terminal and run: 
```
npm run dev
```
