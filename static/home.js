const messageAPIURL = '/api/messages';
const POLL_INTERVAL = 3000;

function User(name) {
    let self = this;
    self.name = name;
}

// HomeViewModel uses knockout.js to create bindings to DOM elements
function HomeViewModel() {
    var self = this;

    // Text to send
    self.submitText = ko.observable("");

    // The user sending the message
    self.Iam = ko.observable({"name": null});
    // Messages currently displayed
    self.messages = ko.observableArray([]);
    // Array of users (senders
    // ToDo - dynamic list
    self.Iams = ko.observableArray([
        new User("Annabelle"),
        new User("Benjamin"),
        new User("Clarice"),
        new User("Divac"),
    ]);
    // The current recipient of the message
    self.youAre = ko.observable({"name": null});
    // Array of users (receivers)
    self.youAres = ko.observableArray([
        new User("Annabelle"),
        new User("Benjamin"),
        new User("Clarice"),
        new User("Divac"),
    ]);

    // Enable or disable Send based on if sender and recipient are set.
    self.canSend = ko.computed(function () {
        let out = self.Iam().name != null && self.youAre().name != null;
        return out;

    }, this);

    // When user clicks "Who are you chatting with" radio buttons
    self.youAreClick = function (user) {

        // set new sender
        self.youAre(user);

        // Need to disable or enable  the radio buttons in the
        self.Iams().forEach((u) => {
            if (u.name == user.name) {
                $("#Iam-" + user.name).prop("disabled", true)
            } else {
                $("#Iam-" + u.name).prop("disabled", false)
            }
        });

        // Get the current sender and recipient, get messages to display for their chat
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if (u1 != null && u2 != null) {
            self.getMessages(u1, u2)
        }
        return true;
    };

    // When user clicks "Who are you chatting with" radio buttons
    self.IamClick = function (user) {
        self.Iam(user);
        self.youAres().forEach((u) => {
            if (u.name == user.name) {
                $("#youAre-" + user.name).prop("disabled", true)
            } else {
                $("#youAre-" + u.name).prop("disabled", false)
            }
        });
        // get messages for these users
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if (u1 != null && u2 != null) {
            self.getMessages(u1, u2)
        }
        return true;
    };

    // return messages for users
    self.getMessages = function (u1, u2) {
        $.getJSON(messageAPIURL, {u1, u2}, function (data) {
            self.messages.removeAll();
            data.forEach((m) => {
                self.messages.push(m)
            })
        })
    };

    // Send button click - send message to server
    self.sendMessage = function () {
        let text = self.submitText();
        // Make sure something is th
        if (!text) {
            return;
        }

        // Only send if we have a sender and receiver
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if (u1 == null || u2 == null) {
            return;
        }
        let message = `${u1}: ${text}`;

        // data to be sent to api.  Prepend sender's name to message
        let data = {u1, u2, message};
        // POST the data
        $.post(messageAPIURL, JSON.stringify(data))
            .done((r) => {

                //succesful - add the message to the list now, don't wait for refresh
                m = self.messages();
                m.push(message);
                self.messages(m);
                // clear the input
                self.submitText("");

            })
            .fail(e => {
                console.log(err);
                alert(`Error: ${e}`)
            })
    };

    // SetInterval - poll every 3 seconds
    // ToDo - set up WebSockets instead
    setInterval(function () {
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if (u1 != null && u2 != null) {
            self.getMessages(u1, u2)
        }
    }, POLL_INTERVAL)
}
