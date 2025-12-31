function checkbtn() {
  let str = document.getElementById("user-input").value;
  let result = document.getElementById("results-div");

  let cleanStr = str.replace(/[^0-9]/g, "");

  document.getElementById("user-input").value = "";

  if (str === "") {
    alert("Please provide a phone number");
    return;
  }

  const regex = /^(1\s?)?(\d{3}|\(\d{3}\))[\-\s]?\d{3}[\-\s]?\d{4}$/;

  let p = document.createElement("p");
  result.appendChild(p);

  p.innerHTML = (regex.test(str) ? "Valid" : "Invalid") + " US number: " + str;
}

function clearbtn() {
  document.getElementById("results-div").innerHTML = "";
}
