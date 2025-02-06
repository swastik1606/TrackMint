// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

const express=require('express');
const app=express();
const path = require('path');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override')
const flash = require('connect-flash');

const passport=require('passport');
const LocalStrategy=require('passport-local');

const session=require('express-session');
const MongoStore=require('connect-mongo');

const data=require('./models/data_model.js');
const user=require('./models/user_model.js');

const main_routes=require('./routes/main_routes.js');
const user_routes=require('./routes/user_routes.js');

const mongoose = require('mongoose');

const ExpressError = require('./utilities/express_error.js');
const mongoSanitize = require('express-mongo-sanitize');

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

app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, '/views'));app.engine('ejs', ejsMate);
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use('/chartjs', express.static(path.join(__dirname, 'node_modules/chart.js/dist')));
app.use(express.static('public'));

app.use(mongoSanitize());

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
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next();
})

app.use('/trackmint', main_routes);
app.use('/trackmint', user_routes);

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404))
})

app.use((err, req, res, next) => {
    console.log(`404 Error: ${req.method} ${req.originalUrl}`);
    console.log(err)
    const { status = 500, message = 'Something went wrong!' } = err;
    if (status === 404) {
        return res.status(404).render('error.ejs', { 
            message: 'Page not found',
            status: 404 
        });
    }
    res.status(status).render('error.ejs', { message, status });
});

app.listen(8080,()=>{
    console.log('PORT 8080 GURU!!');
})