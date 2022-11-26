
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
const itemschema = {
  name: String
};

const Item = mongoose.model("Item", itemschema);

const item1 = new Item({
  name: "Welcome to you todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

// Item.deleteMany({name: 'Eat Food'}, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Your data saved is Successfully");
//   }
// });


app.get("/", function(req, res) {
// const day = date.getDate();

Item.find({}, (err, foundItems) => {

  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesefuly the date saved to DB");
      }
    });
    res.redirect("/");
  } else {
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  }
});


});

app.post("/", function(req, res){

  const item = req.body.newItem;

  //не нужный код из v1
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
