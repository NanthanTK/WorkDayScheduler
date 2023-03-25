
// to display date
var today = dayjs();
$('#currentDay').text(today.format('DD MMM YYYY'));
$('#hour-10').removeClass ("present");

//to render colour to the div elements based on time
$("[ id^='hour']").each(function(){
  var timeID=$(this).prop('id');
  var slotTime = timeID.slice(-2);
  var dash = slotTime.charAt(-0);
    if (dash == "-"){
      slotTime=slotTime.slice(-1);
    }
  var divTime = parseInt(slotTime);
  var nowTime = today.format("HH");
  console.log(timeID, slotTime, nowTime, divTime);

    if (nowTime>divTime){
      $(this).removeClass("present future");
    }
    if (nowTime==divTime){
      $(this).removeClass("past future");
    }
    if (nowTime<divTime){
      $(this).removeClass("past present");
    }    
});

// to render the the stored items in the local storage
var storedList=localStorage.getItem("toDo");
  if (storedList !== null){
    console.log("data exists");
    $("[ id^='hour']").each(function(){
    var toDo=JSON.parse(localStorage.getItem("toDo"));
    console.log (toDo);
    var timeID=$(this).prop('id');
    var matchingObj = $.grep(toDo, function(obj) {
    return obj.parentID == timeID;
    });
      if (matchingObj.length > 0) {
            console.log(matchingObj.length, matchingObj[0].toDoItem);
            var textEl=$(this).closest('div').find('textarea');
            textEl.val(matchingObj[0].toDoItem);
      }
    });
  }
    else{
      console.log("no data");
    }
 
  // code that gets the user input and save it to the local storage
$(document).ready(function(){
        
    $(".btn").click (function(){
        var storedItem=JSON.parse(localStorage.getItem("toDo"));
            if (storedItem !== null){
              var toDo = storedItem;
              console.log(toDo);
            }
             else{
              var toDo=[];          
            }
        thisPparentID=$(this).parent().attr("id");
        thisToDoItem=$(this).closest("div").find("textarea").val(); 
        toDo.push({parentID:thisPparentID, toDoItem:thisToDoItem});
        console.log(toDo);
        localStorage.setItem("toDo", JSON.stringify(toDo));
    });

});

