const express=require('express');
const app=express();
const path = require('path');
const ejsMate=require('ejs-mate');

const passport=require('passport');
const LocalStrategy=require('passport-local');

const session=require('express-session');
const MongoStore=require('connect-mongo');

const data=require('./models/data_model.js');
const user=require('./models/user_model.js');

const main_routes=require('./routes/main_routes.js');
const user_routes=require('./routes/user_routes.js');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/trackmint')
.then(() => console.log("MongoDB connected successfully"))
.catch(err => {
    console.error("Detailed connection error:", err);
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));app.engine('ejs', ejsMate);
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.static('public'));

const store=MongoStore.create({
    mongoUrl:"mongodb://127.0.0.1:27017/trackmint",
    secret:"minty",
    touchAfter:24*60*60,
    collection:'trackmint_sessions'
})

store.on('error',function(e){
    console.log('SESSION ERROR!',e);
})

const sessionConfig={
    store,
    name:"trackmint",
    secret:"minty",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
})

app.use('/trackmint', main_routes);
app.use('/trackmint', user_routes);

app.all('*',(req,res)=>{
    res.send('404');
})

app.listen(8080,()=>{
    console.log('PORT 8080 GURU!!');
})