class Sector {

    constructor(milestoneCoefficentLists) {
        this.milestone = new Milestone(milestoneCoefficentLists);
        this.eventMoneyEffect = 0;
        this.eventMoodEffect = 0;
        this.investment = 0;
        this.numberOfTurnsAfterLastInvestment = -1;
        //the name of each property repersent the level of the socialMoodLevel
        //the data is the effect on the efficency
    }

    /*
     * Get sector's eventMoodEffectiveness.
     * @returns {number} - effectiveness
     */
    effectiveness(socialMoodLevel) {
        return this.effectOnEffectiveness(socialMoodLevel) + this.milestone.coefficientEffect + this.eventMoneyEffect;
    }

    /*
     * return the effect on effectiveness from the socialMood.
     * @returns {number}
     */
    effectOnEffectiveness(socialMoodLevel) {
        return SOCIAL_MOOD_LEVEL_EFFECTS[socialMoodLevel];
    }

    invest(money) {
        this.investment += money;
        this.numberOfTurnsAfterLastInvestment = -1;
    }

    /**
    * deduct investment to change milestone level
    */
    calculateInvestment() {
        var numberOfMilestone = Math.floor(this.investment / 500);
        this.investment -= numberOfMilestone * 500;
        this.milestone.increaseLevelBy(numberOfMilestone);
        this.numberOfTurnsAfterLastInvestment++;
    }

    /**
    * returns the money that produce each second. 
    * @returns {number}
    */
    get moneyProduced () {
        return this.milestone.level;
    }
}