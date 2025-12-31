function checkPalindrome() {
  let input = document.getElementById("text-input").value;
  let output = document.getElementById("result");

  // Check if the input is empty
  if (input === "") {
    alert("Please input a value");
    return;
  }

  // Remove all non-alphanumeric characters and convert to lowercase
  let cleanedInput = input.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  // Reverse the cleaned input
  let reversedInput = cleanedInput.split("").reverse().join("");

  // Check if the cleaned input is the same as the reversed input
  output.innerHTML =
    cleanedInput === reversedInput
      ? input + " is a palindrome!"
      : input + " is not a palindrome.";
}
