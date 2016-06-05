$(document).ready(function() {
    $(".menubar").hide();

    //Will view Second
    $("#click-here").bind("click", function(event) {
        $("#page-2").show();
        $(".page-1").hide();
        $(".money").show();
        $("#page-2Next").show();
    });
    //Will view Third  
    $("#page-2Next").bind("click", function(event) {
        $(".page-3").show();
        $("page-3Next").show();
        $("#page-2Next").hide();
    });

    //Will view Fourth
    $("#page-3Next").bind("click", function(event) {
        $("#allArrow").show();
        $(".page-3").hide();
        $("#page-4Next").show();
        $(".menubar").show();
        $("header").show();
        $(".content").show();

    });
    //Will view Fifth
    $("#page-4Next").bind("click", function(event) {
        $("#allArrow").hide();
        $(".down").show();
        $("#page-4Next").hide();
        $("#page-5Next").show();
        $( "#arrow" ).hide();


    });
    //Will view sixth
    $("#page-5Next").bind("click", function(event) {
        $( "#socailmoodHappy1" ).show();
        $( "#socailmoodHappy2" ).show();
        $( "#socailmoodHappy3" ).show();
        $( "#socailmoodHappy4" ).show();
        $( "#socailmoodSad5" ).show();
        $( ".back-color" ).show();
        $(".business").hide();
        $(".show").show();
        $(".down").hide();
        $( "#topBarsDateCollection" ).show();
        $("#page-6Next").show();
    });
    //Will view seventh
    $( "#page-6Next" ).bind( "click", function(event){
        $( "#socailmoodHappy1" ).show();
        $( "#socailmoodHappy2" ).show();
        $( "#socailmoodHappy3" ).show();
        $( "#socailmoodHappy4" ).show();
        $( "#socailmoodHappy5" ).show();
        $( "#socailmoodSad5" ).hide();
        $( "#arrow" ).show();
        $( ".horizontal-grid" ).show();
        $( ".show1" ).show();
        $("#page-6Next").hide();
        $("#page-7Next").show();
        $( ".show" ).hide();
    });
    // Will view eighth
    $( "#page-7Next" ).bind( "click", function(event){
        $( ".show2" ).show();
        $( ".show1" ).hide();
        $( "#page-8Next" ).show();
        $( "#page-7Next" ).hide();
        $( "#arrow" ).hide();

    });
    //Will view nine
     $( "#page-8Next" ).bind( "click", function(event){
        $( ".show2" ).hide();
        $( ".show3" ).show();
        $( "#page-9Next" ).show();
        $( "#page-8Next" ).hide();

    });
     //Will view 10
     $( "#page-9Next" ).bind( "click", function(event){
        $( ".show3" ).hide();
        $( ".show4" ).show();
        $( "#page-10Next" ).show();
        $( "#page-9Next" ).hide();

    });
     //Will view 11
     $( "#page-10Next" ).bind( "click", function(event){
        $( ".show4" ).hide();
        $( ".show5" ).show();
        $( "#page-11Next" ).show();
        $( "#page-10Next" ).hide();

    });
      //Will view 12
     $( "#page-11Next" ).bind( "click", function(event){
        $( ".show5" ).hide();
        $( ".show6" ).show();
        $( "#gradient8").show();
        $( "#page-12Next" ).show();
        $( "#page-11Next" ).hide();

    });
      //Will view 13
     $( "#page-12Next" ).bind( "click", function(event){
        $( ".show6" ).hide();
        $( ".show7" ).show();
        $( "#page-13Next" ).show();
        $( "#page-12Next" ).hide();



    });
     //Will view 14
     $( "#page-13Next" ).bind( "click", function(event){
        $( ".show7" ).hide();
        $( ".show8" ).show();
        $( "#page-14Next" ).show();
        $( "#page-13Next" ).hide();

    });
     //Will view 15
     $( "#page-14Next" ).bind( "click", function(event){
        $( ".show8" ).hide();
        $( ".show9" ).show();
        $( "#page-15Next" ).show();
        $( "#page-14Next" ).hide();
        $("#arrow-up").show();
    });

});




//Pausing Icon
$("#pause").click(function() {
    console.log("click");
    if ($(this).attr("data-selected") == "false") {
        $(this).attr("src", "img/ICONS/navagation/pause-white-small.png");
        $(this).attr("data-selected", "true");
    } else {
        $(this).attr("src", "img/ICONS/navagation/auto-play-white-small.png");
        $(this).attr("data-selected", "false");
    }
});


// //3rd Page code 
//  //Changing the point number 
// function convertToK(){
//  var moneyReal = document.getElementById("moneyInTheBank").innerHTML;
//  var moneyDisplay = "";
//  moneyReal = parseInt(moneyReal);

//  if (moneyReal > 1000) {
//      var round = moneyReal/1000;
//      console.log(round);
//      moneyDisplay = (round.toString() + "K");
//      document.getElementById("moneyInTheBank").innerHTML = moneyDisplay;
//  }else{
//      document.getElementById("moneyInTheBank").innerHTML = moneyReal;
//  }
// }
// window.onload = convertToK;

// //6th Page code
//  //Get ting time 
// var time = new Date();
// var date = time.getDate();
// var month = time.getMonth();
// var year = time.getFullYear();

// var view = document.getElementById("timeZone").innerHTML = date + "." + month + "." + year;
// window.onload = convertToview;