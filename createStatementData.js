export default function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance) {
    const calculator = new createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
      this.performance = aPerformance;
      this.play = aPlay;
    }
    get amount() {
      throw new Error('subclass responsibility');
    }
    get volumeCredits() {
      let result = 0;
      result += Math.max(aPerformance.audience - 30, 0);
      if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
      return result;
    }
  }

  function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type) {
      case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
      case "comedy": return new ComedyCalculator(aPerformance, aPlay);
      default:
        throw new Error(`unknown type: ${aPlay.type}`);
    }
  }

  class TragedyCalculator extends PerformanceCalculator {
    get amount() {
      let result = 40000;
      if (this.performance.audience > 30) {
        result += 1000 * (this.performance.audience - 30);
      }
      return result;
    }
  }
  class ComedyCalculator extends PerformanceCalculator {
    get amount() {
      let result = 30000;
      if (this.performance.audience > 20) {
        result += 10000 + 500 * (this.performance.audience - 20);
      }
      result += 300 * this.performance.audience;
      return result;
    }
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }
  function volumeCreditsFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits; // Git practice for git commit --amend
  }
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}