function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

describe("test", function () {
  importTest("TestGetPokemon.js", '../test/Pokemon/TestGetPokemon.js');
});