import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}
  
function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber/100);
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

Brevity is the soul of wit, but clarity is the soul of evolvable software.

When programming, follow the camping rule:
Always leave the code base healthier than when you found it.
...
Always leave the code base healthier than when you found it.
It will never be perfect, but it should be better.
*/