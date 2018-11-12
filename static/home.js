function User(name) {
    let self=this;
    self.name=name;
};
// Overall viewmodel for this screen, along with initial state
function HomeViewModel() {
    var self = this;
    self.Users = [
        {name:"Annabelle"},
        {name:"Benjamin"},
        {name:"Clarice"},
        {name:"Devac"}
    ];
    // The user sending the message
    self.Iam = ko.observable({"name":null});
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

    self.youAreClick =function(user) {
        console.log("youAreClick",user)
        console.log(self.youAre(user))
        self.Iams().forEach( (u) =>  {
          if(u.name == user.name) {
              console.log("disabled youare")
              $("#Iam-" + user.name).prop("disabled",true)
              //$("#youAre-" + user.name).prop("checked","checked")
          } else {
              $("#Iam-" + u.name).prop("disabled",false)
          }
        });
        return true;
    };
    self.IamClick =function(user) {
        console.log("IamClic",user)
        console.log(self.Iam(user));
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
        return true;
    };
}
