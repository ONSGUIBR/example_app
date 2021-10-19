var mongoose = require("mongoose");



var roomSchema = new mongoose.Schema({
    room_Id:{type:String, required:true},
    room_cat:{type:String, required:true},
    room_cap:{type:String, required:true},
    room_avai:{type:Boolean, required:true},
    room_start:{type:Date, required:true},
    room_end:{type:Date, required:true}
});



var Room = mongoose.model("Room", roomSchema);

module.exports = Room;