export const copyToClipboard = (value = "") => {
  const textField = document.createElement("textarea");
  textField.innerText = value;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};
