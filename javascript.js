function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
                          { style: "currency", currency: "USD",
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
      const play = playFor(perf);
      let thisAmount = amountFor(perf, play);
  
      // add volume credits
      volumeCredits += Math.max(perf.audience - 30, 0);
      // add extra credit for every ten comedy attendees
      if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
  
      // print line for this order
      result += `  ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
      totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    function amountFor(aPerformance, play) {
      let result = 0;
      switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
          throw new Error(`unknown type: ${play.type}`);
      }
      return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
  }

/*
When you have to add a feature to a program but the code is not structured in a convenient way,
first refactor the program to make it easy to add the feature, then add the feature.

Before you start refactoring, make suer you have a solid suite of tests.
These tests must be self-checking.

Refactoring changes the programs in small steps, so if you make a mistake,
it is easy to find where the bug is.
*/