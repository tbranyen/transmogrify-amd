/**
 * Takes a String and indents each line the specified amount.
 *
 * @param {String} contents to indent.
 * @param {*} spaces is either a number of spaces to indent or a string value
 *            to indent by.
 * @return {String} indented contents.
 */
function indent(contents, spaces) {
  var lines = contents.split("\n");

  // Allow spaces to be a 
  if (typeof spaces === "number") {
    spaces = Array(spaces + 1).join(" ");
  }

  // Map over each line and indent or leave empty.
  lines = lines.map(function(line) {
    if (line) {
      return spaces + line;
    }

    else {
      return "";
    }
  });

  return lines.join("\n");
}

module.exports = indent;
