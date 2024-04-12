# AI Tools - Express Server

In this module, we will leverage GitHub Copilot to assist us in the creation of an Express.js server. This server will consist of a REST API to allow users to create, edit and delete their accounts, read other users accounts, and create, read, edit and delete activities to find partners.
This document will list the steps to follow in order to have the server up and running with all the necessary functionnality.

## Generate our database

### Step 1: Populate our users table

Place cursor in empty file `backend/db/users.json`.
Open GitHub Copilot chat extension, and type the prompt:
> `#file:user.ts` add 10 users based on the User type, in an object and with their key being their ID. None of them have statistics and some of them do not have friends.

When you start typing #file, press `Enter` to select the command, and then select the file `backend/schemas/user.ts` in the dropdown. It will add the `#file:user.ts` part of the prompt, which gives access to Copilot to this file for executing the prompt.

On the code block that Copilot suggested, click on the icon to "Insert at Cusor".

### Step 2: Populate our activities table

Place cursor in empty file `backend/db/activities.json`.
Open GitHub Copilot chat extension, and type the prompt:
> `#file:activity.ts` `#file:users.json` Add 5 activities based on the Activity type, in an object and with their key being their ID. Use different statuses. The owner must be included in the participants. The participants, except the owner, can be included in the applicants.

Here we need to reference both the type file and the users JSON because we want to use their IDs for the activities participants.

Click on "Insert at Cursor" to populate our activities JSON file.

This is it! Our database is populated with 10 users, and 5 activities, based on their respectives schemas.