class Milestone {

    constructor(coefficientLists) {
        //CoefficientEffect from the milestone
        this.coefficientEffect = 0;
        this.coefficientLists = coefficientLists;
        this.level = 0;
        this.previousLevel = 0;
    }

    /*
     * Get the different between previous level and current level
     * @returns {number}
     */
    get numberOfMilestonesBuiltInLastCycle() {
        return this.level - this.previousLevel;
    }

    /*
     * increase milestone level by the parameter level
     * @parameter {interger} floor(investment/500) call from calculateInvestment() in sector Class
     */
    increaseLevelBy(number) {
      this.previousLevel = this.level;
      this.level += number;
    }
    /**
    * This will give the coefficientList corresponding to the milstone level 
    */
    get coefficientList() {
        return this.coefficientLists[this.level];
    } 

}
