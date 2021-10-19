var selected_cat = Array();
var selected_room = Array();

$(function(){

    $(".dropdown-menu  a").click(function(){
        selected_cat = $(this).text();
        $(this).parents(".dropdown").find('.btn').html($(this).text());
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
   });

});

$( ".card" ).hover(
    function() {
      $(this).addClass('shadow-lg').css('cursor', 'pointer');
    }, function() {
      $(this).removeClass('shadow-lg');
    }
);

// a function that displays list of rooms according to user selected capacity
// by simply hidding those that do not qualify
$("#search-btn").click(function(){
  $("#rooms-list #individual-room").each(function() {
    if (selected_cat.length>0){
      var target_cat = "Capacity " +selected_cat;
      if ($(this).text().includes(target_cat)) {
          $(this).show();
      }
      else {
          $(this).hide();
      }

    }

  });
});



$(document).on('click', '#reserve-btn', function (){

  // selected_room = $(this).parents(".individual-room");
  const user_id = $(this).parents(".container").find("#user-id").text().split(" ");
  const selected_obj_id = $(this).parents(".card").find("#room-obj-id").text().split(" ");
  const selected_room_id = $(this).parents(".card").find("#room-id").text().split(" "); //selected_room_id[1]
  const selected_cap = $(this).parents(".card").find("#room-cap").text().split(" "); //selected_cap[1]
  const selected_time = $(this).parents(".card").find("#room-time").text();

  var split_select = selected_time.split('-'); // 5/5/2021 3:00:00 PM-5:00:00PM
  var temp = split_select[0].split(' ');
  var split_date = temp[0].split('/');
  var month = split_date[0];
  var day = split_date[1];
  var year = split_date[2];

  var i = selected_time.indexOf(':');
  var selected_start_hr = selected_time.slice(i-2,i).replace(' ','');


  var j = selected_time.indexOf('-');
  var selected_start_AMPM = selected_time.slice(j-2,j);
  var selected_end_hr = selected_time.slice(j+1,j+3).replace(':','');
  var selected_end_AMPM = selected_time.slice(-3).replace(' ','');;


  function fixtime (t1, t2){  //correct time format
    if (t2 == "PM"){
      if (t1 == 12){
        return t1.toString();
      }
      else{
        res = t1+12;
        if(res>10){
            return res.toString();

        }else{
            return "0"+res.toString();
        }
      }
    }
    else if(t1<10){
        return "0"+t1.toString();
    }else{
        return t1.toString();
    }
  }

  function fixdate (dt1){    //correct date format
    if (parseInt(dt1)>9){
      return dt1;
    }
    else{
      return "0" + dt1;
    }
  }

  const start_time =  year +'-'+ fixdate(month) + "-" + fixdate(day)+ "T" + fixtime(parseInt(selected_start_hr) , selected_start_AMPM) + ":00:00";
  const end_time =  year +'-'+ fixdate(month) + "-" + fixdate(day)+ "T" + fixtime(parseInt(selected_end_hr) , selected_end_AMPM) + ":00:00";

  function alertmsg (room, cap, date) {     //alert message
    const new_msg = "Booking the following reservation: \n";
    const id_msg = room[0] + " " + room[1];
    const cap_msg = cap[0] + " " + cap[1] + "\n";
    const date_msg = date;


    return new_msg + id_msg + " " + cap_msg + date_msg;
  }

  var book_msg = alertmsg (selected_room_id, selected_cap, selected_time);

  if (confirm(book_msg)){     // confirm dialog box message
    $.post("/book", {
      obj_id : selected_obj_id[0],
      room_Id : selected_room_id[1],
      room_cap : selected_cap[1],
      A_id : user_id[0],
      room_start: start_time,
      room_end: end_time
    });
    window.location = "/profile" ;

  }
  else {
    location.reload();
  }


});
