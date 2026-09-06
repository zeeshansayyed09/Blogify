const path = require("path")
require("dotenv").config();
const express = require("express")
const UserRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blog")
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require('./models/blog');


 
const app = express();
const PORT = process.env.PORT || 6100;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.use(checkForAuthenticationCookie('token'))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("mongodb is connected");

})

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))



app.use('/user', UserRoutes)
app.use('/blog', blogRoutes)


app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({}).populate('createdBy').sort({ createdAt: -1 });
    res.render("home", {
        user: req.user,
        blog: allBlogs,
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on: http//localhost:${PORT}`);
})