function convert() {
  let input = document.getElementById("number").value;
  let output = document.getElementById("output");
  var note = document.querySelector(".note");
  // Check if the input is empty


  note.style.cssText = `
  background-color: lightcoral; 
  color: #8B0000; 
  border: solid red;
  `;
  if (input === "") {
    output.innerHTML = "Please enter a valid number.";
    return;
  }
  else if (input < 1) {
    output.innerHTML = "Please enter a number greater than or equal to 1.";
    return;
  }
  else if (input > 3999) {
    output.innerHTML = "Please enter a number less than or equal to 3999.";
    return;
  }
  
  note.style.cssText = '';

  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const hrns = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const ths = ["", "M", "MM", "MMM"];

  let result =
    ths[Math.floor(input / 1000)] +
    hrns[Math.floor((input % 1000) / 100)] +
    tens[Math.floor((input % 100) / 10)] +
    ones[input % 10];

  output.innerHTML = result;
}
