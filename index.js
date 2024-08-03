import express from "express";
import bodyParser from "body-parser";



let posts = [];

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

app.post("/", (req, res) => {
    const textarea = req.body.txt;
    if (textarea) {
        const post = {
            text: textarea,
            timestamp: new Date().toLocaleString()
        };
        posts.push(post);
    }
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const index = parseInt(req.body.index);
    const text = req.body.text;
    const newTime = new Date().toLocaleString();
    if (posts[index]) {
        posts[index].text = text;
        posts[index].timestamp = newTime; // Update the timestamp of the edited post
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && posts[index]) {
        posts.splice(index, 1); // Remove the post at the specified index
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
