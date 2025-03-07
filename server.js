// Here is where we import modules
const dotenv = require("dotenv"); //requires dotenv package
// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose"); // require mongoose
const Fruit = require('./models/fruits')

const app = express();

dotenv.config(); // loads .env enviroment

//Connect to MongoDB using the connection string in .env
mongoose.connect(process.env.MONGODB_URI);

//logs connection status
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//Middleware function here
app.use(express.urlencoded({ extended: false }));
// The above function reads the request body and decode it into req.body so we can access form data

// Root path/route "Home Page"
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//Path to the page with a form to fill out and submit to add a new fruit to database
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

//Path used to recieve form submissions. Use Post
app.post('/fruits', async (req,res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    //Creating data for our database
    await Fruit.create(req.body)
    
    //redirect tells user to navigate to new URL path
    res.redirect('/fruits') //this is a URL path
})

//Get /fruits... Index route sends a page that list all fruits from the database
app.get('/fruits', async(req, res) => {
    const allFruits = await Fruit.find({})
    res.render('fruits/index.ejs', {fruits: allFruits})
})

//This is the show route
app.get('/fruits/:fruitId', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render('fruits/show.ejs', {fruit: foundFruit})
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });