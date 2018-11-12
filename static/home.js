const getMessageURL='/api/messages';
function User(name) {
    let self=this;
    self.name=name;
};
// Overall viewmodel for this screen, along with initial state
function HomeViewModel() {
    var self = this;

    // Text to send
    self.submitText = ko.observable("");

    // The user sending the message
    self.Iam = ko.observable({"name":null});
    self.messages = ko.observableArray([]);
    self.Iams = ko.observableArray([
        new User("Annabelle"),
        new User("Benjamin"),
        new User("Clarice"),
        new User("Divac"),
    ]);
    // The users receiving the message
    self.youAre = ko.observable({"name":null});
    self.youAres = ko.observableArray([
        new User("Annabelle"),
        new User("Benjamin"),
        new User("Clarice"),
        new User("Divac"),
    ]);

    // Enable or disable Send based on if sender and recipient are set.
    self.canSend = ko.computed(function() {
        let out = self.Iam().name != null && self.youAre().name != null;
        console.log("canSend", self.Iam().name, self.youAre().name, out);
        return out;

    },this);

    self.youAreClick =function(user) {
        console.log("youAreClick",user)
        self.youAre(user)
        self.Iams().forEach( (u) =>  {
          if(u.name == user.name) {
              console.log("disabled youare")
              $("#Iam-" + user.name).prop("disabled",true)
              //$("#youAre-" + user.name).prop("checked","checked")
          } else {
              $("#Iam-" + u.name).prop("disabled",false)
          }
        });

        // get messages for these users
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if(u1 != null && u2 != null){
           self.getMessages(u1,u2)
        }
        return true;
    };
    self.IamClick =function(user) {
        console.log("IamClic",user)
        self.Iam(user)
        self.youAres().forEach( (u) =>  {
            if(u.name == user.name) {
                console.log("disabled iam")
                $("#youAre-" + user.name).prop("disabled",true)
                //$("#Iam-" + user.name).prop("checked","checked")
                console.log($("#Iam-" + user.name))
            } else {
                $("#youAre-" + u.name).prop("disabled",false)
            }
        });
        // get messages for these users
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if(u1 != null && u2 != null){
            self.getMessages(u1,u2)
        }
        return true;
    };

    // return messages for users
    self.getMessages = function(u1,u2){
        $.getJSON(getMessageURL, {u1,u2}, function(data) {
            console.log(data);
            self.messages.removeAll()
            data.forEach((m)=>{
               self.messages.push(m)
            })
        })
    }

    // Send button click - send message to server
    self.sendMessage = function(){
        let text = self.submitText()
        if(!text){
            return;
        }
        let u1 = self.Iam().name;
        let u2 = self.youAre().name;
        if(u1 == null || u2 == null){
            return;
        }
        console.log(text)
        // data to be sent to api.  Prepend sender's name to message
        let data = {u1:u1,u2:u2,message: `${u1}: ${text}`};
            $.post(getMessageURL, JSON.stringify(data))
                .done((r)=>{
                    console.log("Success")
                })
                .fail(e=>{
                    console.log(err)
                    alert(`Error: ${e}`)
                })
        };
}
