let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

document.getElementById("price").innerHTML = "Price: $" + price;

const div = document.getElementById("cid");
function updatecid() {
  for (let i = 0; i < cid.length; i++) {
    let p = document.createElement("p");
    p.innerHTML = cid[i][0] + ": $" + cid[i][1];
    div.appendChild(p);
  }
}
updatecid();

const currencyUnit = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  "ONE HUNDRED": 10000,
};

function change() {
  let input = document.getElementById("cash");
  let result = document.getElementById("change-due");

  let cash = parseFloat(input.value);
  let money = Number(cid.reduce((total, sum) => total + sum[1] * 100, 0));

  document.getElementById("cash").value = "";

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cash == price) {
    result.innerHTML = "No change due - customer paid with exact cash";
    return;
  }

  let change = (cash - price) * 100;
  let changeArr = [];

  if (change > money) {
    result.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    let currencyName = cid[i][0];
    let currencyTotal = cid[i][1] * 100;
    let currencyValue = currencyUnit[currencyName];
    let currencyAmount = 0;

    while (change >= currencyValue && currencyTotal >= currencyValue) {
      change -= currencyValue;
      currencyTotal -= currencyValue;
      currencyAmount += currencyValue / 100;
    }

    if (currencyAmount > 0) {
      changeArr.push([currencyName, currencyAmount]);
      cid[i][1] = Number((currencyTotal / 100).toFixed(2));
    }
  }

  if (change >= 1) {
    result.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let remainingMoney = Number(
    cid.reduce((total, sum) => total + sum[1] * 100, 0)
  );

  let status = remainingMoney == 0 ? "CLOSED" : "OPEN";

  div.textContent = "";
  updatecid();
  result.innerHTML =
    `Status: ${status}<br>` +
    changeArr.map((item) => `${item[0]}: $${item[1].toFixed(2)}`).join("<br>");
}
