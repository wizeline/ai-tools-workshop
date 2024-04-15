# AI Tools - Express Server

In this module, we will leverage GitHub Copilot to assist us in the creation of an Express.js server. This server will consist of a REST API to allow users to create, edit and delete their accounts, read other users accounts, and create, read, edit and delete activities to find partners.
This document will list the steps to follow in order to have the server up and running with all the necessary functionnality.

&nbsp;
## Chapter 1: Set the Express server up

### Step 1.1: Initiate Express server

Ask Copilot in the chat:
> How can I create an express server?

Follow the steps that it recommends:

1. In the `backend/` directory, run `npm install express`
2. In the server code block Copilot suggested, click on the 3 dots icon and then "Insert into New File".
3. Save this new file as `backend/index.js`
4. In your terminal run `node index.js`
5. Open the localhost URL to make sure you receive the "Hello World!" message

Our server is set up!

&nbsp;
## Chapter 2: Generate our database

### Step 2.1: Populate our users table

Create file `backend/db/users.json` and place your cursor in this new empty file.
Open GitHub Copilot chat extension, and type the prompt:
> `#file:user.ts` add 10 users based on the User type, in an object and with their key being their ID. None of them have statistics and some of them do not have friends.

When you start typing #file, press `Enter` to select the command, and then select the file `backend/schemas/user.ts` in the dropdown. It will add the `#file:user.ts` part of the prompt, which gives access to Copilot to this file for executing the prompt.

On the code block that Copilot suggested, click on the icon to "Insert at Cusor".

### Step 2.2: Populate our activities table

Create file `backend/db/activities.json` and place your cursor in this new empty file.
Open GitHub Copilot chat extension, and type the prompt:
> `#file:activity.ts` `#file:users.json` Add 5 activities based on the Activity type, in an object and with their key being their ID. Use different statuses. The owner must be included in the participants. The participants, except the owner, can be included in the applicants.

Here we need to reference both the type file and the users JSON because we want to use their IDs for the activities participants.

Click on "Insert at Cursor" to populate our activities JSON file.

This is it! Our database is populated with 10 users, and 5 activities, based on their respectives schemas.
