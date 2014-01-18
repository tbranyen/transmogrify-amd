var assert = require("../util/assert");
var lib = require("../..");
var fs = require("fs");

suite("define", function() {

  var fixturesDir = __dirname + "/../fixtures/define/";
  var testDirs = fs.readdirSync(fixturesDir);
  testDirs.filter(function(fileName) {
    return fileName !== "." || fileName !== "..";
  }).forEach(function(testDir) {
    suite(testDir, function() {
      var expected = fs.readFileSync(
        fixturesDir + testDir + "/expected.js"
      ).toString();

      test("anonymous module", function() {
        var inputAnon = fs.readFileSync(
          fixturesDir + testDir + "/input-anon.js"
        ).toString();

        assert.astMatch(lib(inputAnon), expected);
      });

      test("named module", function() {
        var inputNamed = fs.readFileSync(
          fixturesDir + testDir + "/input-named.js"
        ).toString();

        assert.astMatch(lib(inputNamed), expected);
      });
    });
  });

  test("tautology", function() {
    assert.astMatch(
      lib("(function(a, b) { console.log(a + b); })(1, 3);"),
      "(function(__AMDCLEAN0__,   __AMDCLEAN1__)  {" +
        "console.log(__AMDCLEAN0__ + __AMDCLEAN1__);    " +
        "}) (1,3);"
    );
  });
});

/*
// Anonymous mixed dependencies and CJS.
define(["require", "depA"], function(require, depA) {});

// Named module.
define("name");

suite("Named module values.", function() {
  define('name', {});
  define("name", true);
  define("name", 1234);
  define("name", null);
  define("name", undefined);
});

// Named function.
define(function() {});

// Named function with dependencies
define("name", ["depA"], function(depA) {});

// Named CJS.
define("name", function(require, exports, module) {});

// Named mixed dependencies and CJS.

define("name", ["require", "depA"], function(require, depA) {});
*/
