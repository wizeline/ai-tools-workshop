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

&nbsp;
## Chapter 3: Create our REST API

### Step 3.1: Add our routes in the index file

First, we will create our empty files `backend/src/routes/users.ts` and `backend/src/routes/activities.ts`

Then, we will ask GitHub Copilot:
> I want my app to use my users and activities routes which will be located in the routes directory. What code should I add?

From the response, we will see that we can add the following lines to the file `backend/src/index.ts`:
```javascript
app.use("/users", require("./routes/users"));
app.use("/activities", require("./routes/activities"));
```

### Step 3.2: Create our routes

Place you cursor in `backend/src/routes/users.ts` and ask Copilot in the chat:
> Add all the routes to complete the CRUD for users. We will import the controllers from another place

Note that we did not even specify from where we want to import the controllers, but Copilot will know exactly what to do.

Do the same thing with `backend/src/routes/activities.ts`.

### Step 3.3: Create our controllers

We have already referenced the controllers files in the previous step, but they do not exist yet. Let's create the files `backend/src/controllers/users.ts` and `backend/src/controllers/activities.ts`

Now open the users controllers file and ask Copilot in the chat:
> `@workspace` create all the controllers to cover all the users routes and using our json database and our helpers in `#file:json-helpers.ts`

Here, the keyword `@workspace` will tell Copilot that it can access the whole repo to find all the necessary information for it to define our controllers.

Depending on the response, you can ask Copilot to add some things like typing, and/or error handling...

Do the same with the activities controllers file.

Now we can test our API.

NB: If the `POST` and `PUT` do not work, it is probably because you need to add:
```javascript
app.use(express.json());
```
in the file `backend/src/index.ts`.

Our API is ready! Of course, we could still add some things to make it more robust, like session handling for instance. Feel free to keep going to get more accostumed to GitHub Copilot!

## Chapter 4: Add unit tests

### Step 4.1: Add controllers unit tests

Open one of the controllers files and then open the GitHub Copilot chatbox to type:
> Can you write the unit tests to cover all the controllers in this file?

Copilot will return a response with mocks and a couple of tests. We can then ask them for more detailed tests depending on the coverage of the response provided.
Examples:
> Can you add all the remaining tests?

> Can you test the errors too?

...

Now run the tests to make sure that they all pass.

Do the same for the other controllers and other functions you want to test.