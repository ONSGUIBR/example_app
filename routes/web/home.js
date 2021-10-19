var express = require("express");
var passport = require("passport");

var User = require("../../models/user");
var Room = require("../../models/room");
var Reservation = require("../../models/reservation");

var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.get("/", function (req, res) {
   // console.log("hello I'm on the start page");
   res.render("home/");
});

router.get("/home", function (req, res) {
   res.render("home/home");
});

router.get("/reserve", function (req, res) {
   if(res.locals.currentUser == null) {
      res.render("home/login");
   } else {
      res.render("home/reserve");
   }
});

router.get("/login", function (req, res) {
   res.render("home/login")
});


router.get("/book", function (req, res) {
   Room.find({room_avai:true}).sort('room_start').exec((err, data) =>{
      if(err) console.log(err);
      res.render("home/book",{rooms: data});
   });
});

router.get("/profile", function (req, res) {
   //console.log(res.locals.currentUser.A_id);
   Reservation.find({A_id: res.locals.currentUser.A_id} ,function(err,data){
      if(err) console.log(err);
      res.render("home/profile",{reservations: data});
   });
   
});

router.post("/book", function (req, res, next) {
   var obj_id = req.body.obj_id;
   var room_Id = req.body.room_Id;
   var room_cap = req.body.room_cap;
   var A_id = req.body.A_id;
   var room_start = req.body.room_start;
   var room_end = req.body.room_end;

   const set_false = {$set: {room_avai : false}}

   var newUser = new Reservation({
      room_Id: room_Id,
      room_cap: room_cap,
      A_id: A_id,
      room_start: room_start,
      room_end: room_end
   });

   Room.findByIdAndUpdate(obj_id, {room_avai : false}, { useFindAndModify: false}, function (err, docs){
      if (err){
         console.log(err)
      }
   });

   newUser.save(next);
   res.redirect("home/profile");

});


router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

router.post("/login", passport.authenticate("login", {
   successRedirect: "/home",
   failureRedirect: "/login",
   failureFlash: true
}));

router.get("/signup", function (req, res) {
   res.render("home/signup")
});

router.post("/signup", function (req, res, next) {

   var First_Name = req.body.First_Name;
   var Last_Name = req.body.Last_Name;
   var A_id = req.body.A_id;
   var email = req.body.email;
   var password = req.body.password;
   var repassword = req.body.repassword;

   if(password != repassword){
      return res.redirect("/signup");
   }

   User.find({$or: [{email: email},{A_id : A_id}]}, function (err, user) {
      if (err) {
         console.log("Error when creating new user in sign up") 
         return next(err); 
      }
      if (user[0]){
         req.flash("error", "There's already an account with this email or this id");
         return res.redirect("/signup");
      }
      if (user[1]){
         req.flash("error", "There's already an account with this email or this id");
         return res.redirect("/signup");
      }

      var newUser = new User({
         First_Name: First_Name,
         Last_Name: Last_Name,
         A_id: A_id,
         email: email,
         password: password
      });

      newUser.save(next);

   });

}, passport.authenticate("login", {
   successRedirect: "/home",
   failureRedirect: "/signup",
   failureFlash: true
}));

router.post("/profile", function (req, res, next) {

   var del_id = req.body.del_id;
   var room_id = req.body.room_id;
   var room_start = req.body.room_start;
   var local = new Date(room_start);

   console.log(local);
   Reservation.deleteOne({_id: del_id},function(err,data){
      if(err){
         console.log(err);
      }
   });
   Room.updateOne({"room_Id":room_id,"room_start": {"$gte": new Date(local)} },{$set: {room_avai: true}})
   .then(result => {console.log(result);}).catch(err => console.error(err));

});

module.exports = router;
