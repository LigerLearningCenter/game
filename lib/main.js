var gs = new GameState();

// in the turn loop
var timestamp;
var count = 0;
var MAX_COUNT = (2050 - 2016) * 52 * 2;

timestamp = moment(new Date());

var allEvents = agricultureEvents.concat(consumerServicesEvents, ecologyEvents, educationEvents, industryEvents, infrastructureEvents, tourismEvents);

function loop() {
    //Modifying sectors’ effectiveness according to current Social Mood
    gs.updateAllCoefficientEffects();
    //Selecting Random Event that instantly influences the game
    $("#event").html(gs.getRandomEvent(allEvents));
    //Money laying on the last unbuilt milestone in each sector is deducted, multiplied by sector’s effectiveness and returned to player’s budget
    gs.checkForUnbuiltMilestone();
    //Calculating Milestones’ progress
    gs.updateAllInvestments();
    //Calculating Social Mood
    gs.updateSocialMood();

    gs.increaseMonth();
    
    updateUI();

    if (gs.isGameOver) {
        $("#overlay").show();
    } else {
        window.setTimeout(loop, 6000);        
    }
}

function updateTime() {
    $("#timestamp").text(timestamp.format("DD.MM.YYYY"));
    var percent = 100.0 * count / MAX_COUNT;
    $("#timestamp").attr({"left" : percent + "%"});
    timestamp.add(1, 'd');
    count++;
    if (!gs.isGameOver) {
        window.setTimeout(updateTime, 1000);                
    }
}

function updateUI() {
    updateBudgetToUI();

    for (sector in SECTORS) {
        var value = 100 * ((gs.sectors[sector].investment + 500.0 * gs.sectors[sector].milestone.level) / 5000.0);
        
        $("div[data-sector-name='" + sector + "'] svg rect").attr({
            "y" : (100 - value) + "%"
        }, {duration: 100});
    }

    switch (gs.socialMoodLevel) {
        case 4:
            $("#social-mood-1").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-2").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-3").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-4").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-5").attr("src", "img/socialmood-happy.png");        
            break;
        case 3:
            $("#social-mood-1").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-2").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-3").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-4").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-5").attr("src", "img/socialmood-sad.png");        
            break;
        case 2:
            $("#social-mood-1").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-2").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-3").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-4").attr("src", "img/socialmood-sad.png");        
            $("#social-mood-5").attr("src", "img/socialmood-sad.png");        
            break;
        case 1:
            $("#social-mood-1").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-2").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-3").attr("src", "img/socialmood-sad.png");        
            $("#social-mood-4").attr("src", "img/socialmood-sad.png");        
            $("#social-mood-5").attr("src", "img/socialmood-sad.png");        
            break;
        case 0:
            $("#social-mood-1").attr("src", "img/socialmood-happy.png");        
            $("#social-mood-2").attr("src", "img/socialmood-sad.png");        
            $("#social-mood-3").attr("src", "img/socialmood-sad.png");        
            $("#social-mood-4").attr("src", "img/socialmood-sad.png");        
            $("#social-mood-5").attr("src", "img/socialmood-sad.png");        
            break;
    }
    if (gs.socialMood == 0) {
        $("#social-mood-1").attr("src", "img/socialmood-sad.png");        
        $("#social-mood-2").attr("src", "img/socialmood-sad.png");        
        $("#social-mood-3").attr("src", "img/socialmood-sad.png");        
        $("#social-mood-4").attr("src", "img/socialmood-sad.png");        
        $("#social-mood-5").attr("src", "img/socialmood-sad.png");                
    }

    // updateSocialMoodToUI();
    // updateMilestoneToUI();
}
  
function updateMilestoneToUI() {
    for (var sectorName in SECTORS){
        animateToGivenSector(sectorName);
    }
    
}

function animateToGivenSector(sectorName){
    for (var i = 0; i < gs.sectors[sectorName].milestone.numberOfMilestonesBuiltInLastCycle; i++){
        animateMilestone(sectorName);
    }    
}

function animateMilestone(){
    // Data team is working  on it
}

function updateBudgetToUI(){
    $(".money").html("$" + numberWithCommas(Math.round(gs.budget * 1000)));
}

function addCommaToNumber (number){
    number = number.toString();
    var listOfNumber = [];
    for (var i = 0; i < number.length; i++){
        listOfNumber.push(number[i]);
    }
    for (var i = 0 ; i < Math.floor(listOfNumber.length / 3) - 1; i++){
        for (var a = listOfNumber.length - 1, b = 1; a > -1; a--, b++){
            if (a % 3 === 0){
                listOfNumber.insert();
            }
        }
    }  
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
