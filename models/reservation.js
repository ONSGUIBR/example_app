var mongoose = require("mongoose");



var resSchema = new mongoose.Schema({
    room_Id:{type:String, required:true},
    room_cap:{type:String, required:true},
    A_id:{type:String, required:true},
    room_start:{type:Date, required:true},
    room_end:{type:Date, required:true}
});



var Reservation = mongoose.model("Reservation", resSchema);

module.exports = Reservation;