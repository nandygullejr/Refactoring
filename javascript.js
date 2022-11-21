function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
                          { style: "currency", currency: "USD",
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
 
      // print line for this order
      result += `  ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
      totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    function amountFor(aPerformance) {
      let result = 0;
      switch (playFor(aPerformance).type) {
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
          throw new Error(`unknown type: ${playFor(aPerformance).type}`);
      }
      return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function volumeCreditsFor(aPerformance) {
      let result = 0;
      // add volume credits
      result += Math.max(aPerformance.audience - 30, 0);
      // add extra credit for every ten comedy attendees
      if ("comedy" === playFor(aPerformance).type) result += Math.floor(perf.audience / 5);
      return result;
    }
  }

/*
When you have to add a feature to a program but the code is not structured in a convenient way,
first refactor the program to make it easy to add the feature, then add the feature.

Before you start refactoring, make suer you have a solid suite of tests.
These tests must be self-checking.

Refactoring changes the programs in small steps, so if you make a mistake,
it is easy to find where the bug is.

Any fool can write code that a computer can understand.
Good programmers write code that humans can understand.
*/