class GameState {

    constructor() {
        this.time = 0;
        this.sectors = {};
        this.budget = 1000;
        this.socialMood = 100;
        this.date = new Date(2017, 0);
        for (var sectorName in SECTORS) {
            var coefficientLists = SECTORS[sectorName].coefficientLists;
            this.sectors[sectorName] = new Sector(coefficientLists);
        }

    }

    get investedInAllSectors() {
        for (var sectorName in gs.sectors) {
            var sector = gs.sectors[sectorName];
            if (sector.investment == 0) {
                return false;
            }
        } 
        return true;
    }

    forSectors(sectors, func) {
        for (var sectorName in sectors) {
            var sector = this.sectors[sectorName];
            func(this, sectorName, sector);
        }        
    }

    forAllSectors(func) {
        this.forSectors(SECTORS, func);
    }

    /**
     * returns the level of the social mood
     * @returns {number}
     */
    get socialMoodLevel() {
        if (this.socialMood > 80) {
            return 4;
        } else if (this.socialMood > 60 && this.socialMood < 81) {
            return 3;
        } else if (this.socialMood > 40 && this.socialMood < 61) {
            return 2;
        } else if (this.socialMood > 20 && this.socialMood < 41) {
            return 1;
        }
        return 0;
    }
    changeSocialMood(socialMoodChange) {
        this.socialMood += socialMoodChange;

        if (this.socialMood > 100) {
            this.socialMood = 100;
        }
        if (this.socialMood < 0) {
            this.socialMood = 0;
        }
    }
    
    updateSocialMood() {
        this.forAllSectors(function(gs, sectorName, sector) {
            for (var i = sector.milestone.numberOfMilestonesBuiltInLastCycle; i > 0; i--) {
                gs.changeSocialMood(3);
            }
            switch (sector.numberOfTurnsAfterLastInvestment) {
                case 0:
                    break; // we don't get a penalty
                case 1:
                    gs.changeSocialMood(-1);
                    break;
                default: // 2 or more
                    gs.changeSocialMood(-3);
            }
        });
    }

    /**
     * Make update to all the coefficientEffect.
     */
    updateAllCoefficientEffects() {
        this.forAllSectors(function(gs, sectorName, sector) {
            gs.setCaculateCoefficientEffect(sectorName);
        });
    }

    getSectorIndex(sectorName) {
        var sec = ["industry", "agriculture", "consumerServices", "infrastructure", "education", "tourism", "ecology"];
        return sec.indexOf(sectorName);
    }

    /**
     * calculate and set the coefficientEffect for a given sector
     * @param {name of Sector}
     */
    setCaculateCoefficientEffect(givenSectorName) {
        var givenSectorIndex = this.getSectorIndex(givenSectorName);
        this.sectors[givenSectorName].milestone.coefficientEffect = 0;
        this.forAllSectors(function(gs, sectorName, sector) {
            gs.sectors[givenSectorName].milestone.coefficientEffect += gs.sectors[sectorName].milestone.coefficientList[givenSectorIndex];
        });
    }

    /*
    Money laying on the last unbuilt milestone in each sector is deducted, multiplied by sector’s
    effectiveness and returned to player’s budget
    @variable {effectiveness} gs.sectors["industry"].effectiveness
    @variable {investment} gs.sectors["industry"].investment
    @equation {a = investment % 500} -  This will set a to the money that is
                                        left after building the milestone
    @equation {investment -= a} - This will set investment to to the money that is deducted
                                  after building the milestone
    @equation {budget += a * effectiveness} - this will return the money that is left multiplied by the
                                                    affectiveness after building the milestone to budget
  */
    checkForUnbuiltMilestone() {
        this.forAllSectors(function(gs, sectorName, sector) {
            gs.checkSectorForUnbuitMilestone(sectorName);
        });
    }

    checkSectorForUnbuitMilestone(sectorName) {
        var effectiveness = this.sectors[sectorName].effectiveness(this.socialMoodLevel);
        var investment = this.sectors[sectorName].investment;
        var moneyLeft = investment % 500;
        this.sectors[sectorName].investment -= moneyLeft;
        this.budget += moneyLeft * effectiveness;
    }

    /**
     * return all money that all sectors produce each second.
     * return {number}
     */
    get moneyCreatedFromSectors() {
        var allMoney = 0;
        this.forAllSectors(function(gs, sectorName, sector) {
            allMoney += sector.moneyProduced;
        });
        return allMoney;
    }

    /**
     * Add money to the budget that created by all the sectors.
     * @equation budget += moneyCreatedFromSectors;
     */
    updateBudget() {
        this.budget += this.moneyCreatedFromSectors;
    }

    /** 
    Choose a random event and call calculateRandomEventEffect to calculate its effect
    @param {randomEventList}
    @returns {description}

    @equation {randomNumber = Math.floor(Math.random() * allEvent.length)}
    @equation {randomEvent = allEvent[a]}
    */
    getRandomEvent(randomEventList) {
        //this will give a random number
        this.randomNumber = Math.floor(Math.random() * randomEventList.length);
        this.randomEvent = randomEventList[this.randomNumber];
        this.calculateRandomEventEffect(this.randomEvent);
        return this.randomEvent.description;
    }
    /**
    Calculate a given randomEvent effect on this.moodEffect and this.sector[sectorName].eventMoneyEffect
    @param {randomEvent}
    */

    calculateRandomEventEffect(randomEvent) {
        this.forAllSectors(function(gs, sectorName, sector) {
            sector.eventMoneyEffect += randomEvent.money[sectorName];
            gs.changeSocialMood(randomEvent.mood[sectorName]);
        });
    }

    /**
     * Add investment money for given sector and deduct that money from the budget.
     * @param {sectorName}
     * @parm {money} investment money
     */
    invest(sectorName, money) {
        if (this.budget >= money) {
            this.sectors[sectorName].invest(money);
            this.budget -= money;            
        } else {
            this.sectors[sectorName].invest(this.budget);
            this.budget = 0;                        
        }
        updateUI();
    }

    updateAllInvestments() {
        this.forAllSectors(function(gs, sectorName, sector) {
            sector.calculateInvestment();            
        });
    }

    /*
     * Change date to next month
     * @equation {dateMonth = currentMonth + 1}
     */
    increaseMonth() {
        var currentMonth = this.date.getMonth();
        this.date.setMonth(currentMonth + 1);
    }

    /*
     * Check is the user lose yet
     * @return {boolean}
     * @equation {socialMood <= 0 or budget <= 0}
     */
    get isUserLose() {
        return (this.socialMood <= 0) || (this.budget <= 0);
    }

    /*
     * Check is the user wins
     * @return {boolean}
     * @equation {(currentYear = 2053 and currentMonth >= 0) or (all milestones completely upgraded).}
     */
    get isUserWins() {
        var currentYear = this.date.getYear();
        var currentMonth = this.date.getMonth();
        var levelCheck = false;
        for (var sectorName in SECTORS) {
            var sector = this.sectors[sectorName];
            if (sector.milestone.level == 10) {
                levelCheck = true;
            } else {
                levelCheck = false;
                break;
            }
        }
        return (currentYear == 2053 && currentMonth >= 0) || (levelCheck == true);
    }

    get isGameOver() {
        return this.isUserWins || this.isUserLose
    }
}

