$(document).on('click', '#cancel-btn', function (){

    const selected_room_id = $(this).parents(".card").find("#room-id").text();
    const selected_room_cap = $(this).parents(".card").find("#room-cap").text();
    const selected_room_date = $(this).parents(".card").find("#room-date").text();
    const some_id = $(this).parents(".card").find("#room-obj-id").text().split(" ");
    var split_select = selected_room_date.split('-'); // 5/5/2021 3:00:00 PM-5:00:00PM
    var temp = split_select[0].split(' ');
    var split_date = temp[0].split('/');
    var month = split_date[0];
    var day = split_date[1];
    var year = split_date[2];

    var i = selected_room_date.indexOf(':');
    var selected_start_hr = selected_room_date.slice(i-2,i).replace(' ','');

    var j = selected_room_date.indexOf('-');
    var selected_start_AMPM = selected_room_date.slice(j-2,j);




    function alertmsg (room, cap, date) {
        const new_msg = "Canceling the following reservation: \n"
        const id_msg = room
        const cap_msg = cap + "\n"
        const date_msg = date 

        return new_msg + id_msg + " " + cap_msg + date_msg
    }

    function fixtime (t1, t2){
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

    function fixdate (dt1){
        if (parseInt(dt1)>9){
          return dt1
        }
        else{
          return "0" + dt1;
        }
    }

    const selected_time =  year +'-'+ fixdate(month) + "-" + fixdate(day)+ "T" + fixtime(parseInt(selected_start_hr) , selected_start_AMPM) + ":00:00";

    const alertm = alertmsg (selected_room_id, selected_room_cap, selected_room_date)

    if (confirm(alertm)){
        $.post("/profile",{
            del_id: some_id[0],
            room_id: selected_room_id[5],
            room_start: selected_time
        });
        location.reload();


    }



})
