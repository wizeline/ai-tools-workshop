# AI Tools - Express Server

In this module, we will leverage GitHub Copilot to assist us in the creation of an Express.js server. This server will consist of a REST API to allow users to create, edit and delete their accounts, read other users accounts, and create, read, edit and delete activities to find partners.
This document will list the steps to follow in order to have the server up and running with all the necessary functionnality.

&nbsp;
## Set the server up

### Step 1: Initiate Node

You do not remember how to initiate a Node.js application? GitHub Copilot is here for you.
In the chat, enter:
> How can I initiate a Node application?

Then open your VS Code terminal, make sure you are in the backend directory, and click on the "Insert into Terminal" icon from the command suggested by Copilot, which should be `npm init -y`.
Run the command in the terminal and the package.json file will be created.

### Step 2: Initiate Express server

Ask Copilot in the chat:
> How can I create an express server?

Follow the steps that it recommends:

1. In the `backend/` directory, run `npm install express`
2. In the server code block Copilot suggested, click on the 3 dots icon and then "Insert into New File".
3. Save this new file as `backend/index.js`
4. In your terminal run `node index.js`
5. Open the localhost URL to make sure you receive the "Hello World!" message

Our server is set up!
