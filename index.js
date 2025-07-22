const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

let data = [
  {
    id: uuidv4(),
    username: "harsha",
    content: "this is content",
  },
  {
    id: uuidv4(),
    username: "subhash",
    content: "this is not content",
  },
  {
    id: uuidv4(),
    username: "Dheeraj",
    content: "this is content",
  },
];

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/posts", (req, res) => {
  res.render("index.ejs", { data });
});

app.get("/posts/new", (req, res) => {
  res.render("newPost.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  data.push({ id, username, content }); // pushing the object
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params; // this means id = req.params.id
  let idPost = data.find((x) => id === x.id);
  res.render("show.ejs", { idPost });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let updatedContent = req.body.content;
  let idPost = data.find((x) => id === x.id);
  idPost.content = updatedContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let idPost = data.find((x) => id === x.id);
  res.render("edit.ejs", { idPost });
});

app.listen(port, () => {
  console.log("listening");
});
