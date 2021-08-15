var assert = require('chai').assert;
var expect = require('chai').expect;
const { getPokemonJSON, isVariant, readJSON } = require('../utils/Pokemon/GetPokemon.js');

describe('Pokemon', function() {
  describe('#getPokemonJSON', function() {
    it('venusaur should return id = 3', async function() {
      var pokemon = await getPokemonJSON('venusaur');
      assert.equal(pokemon.id,3);
    });
    it('VenuSaur should return id = 3', async function() {
      var pokemon = await getPokemonJSON('VenuSaur');
      assert.equal(pokemon.id,3);
    });
    it('venaSaur should return id = 3', async function() {
      var pokemon = await getPokemonJSON('VenaSaur');
      assert.equal(pokemon.id,3);
    });
    it('Mr Mime should return id = 122', async function() {
      var pokemon = await getPokemonJSON('Mr Mime');
      assert.equal(pokemon.id,122);
    });
    it('mr-mime-galar should return id = 10165', async function() {
      var pokemon = await getPokemonJSON('mr-mime-galar');
      assert.equal(pokemon.id,10165);
    });
    it('meowstic should return id = 678', async function() {
      var pokemon = await getPokemonJSON('meowstic');
      assert.equal(pokemon.id,678);
    });
    it('alolan vulpix should return id = 10103', async function() {
      var pokemon = await getPokemonJSON('alolan vulpix');
      assert.equal(pokemon.id,10103);
    });
    it('giratina should return id = 487', async function() {
      var pokemon = await getPokemonJSON('giratina');
      assert.equal(pokemon.id,487);
    });
    it('GiratinA should return id = 487', async function() {
      var pokemon = await getPokemonJSON('GiratinA');
      assert.equal(pokemon.id,487);
    });
  });
  describe('#isVariant', function(){
    it('nintales should return as false as a variantBoolean',async function(){
      var variantBoolean = isVariant('ninetales');
      assert.equal(variantBoolean, false);
    });
    it('nintales-alolan should return as true as a variantBoolean',async function(){
      var variantBoolean = isVariant('ninetales-alola');
      assert.equal(variantBoolean, true);
    });
    it('alolan nintales should return as false as this is corrected in correctedPokemonInput function',async function(){
      var variantBoolean = isVariant('alolan nintales');
      assert.equal(variantBoolean, false);
    });
  });
  describe('#readJSON', function(){
    it('When given valid json file path, this should return parsed JSON', function(){
      const file = readJSON("src/utils/Pokemon/PokemonVariants.json");
      expect(file).to.be.an('object');
    });
    it('When given an invalid json file path, this should return error', function(){
      assert.throw(() => {readJSON("invalid_path.json")}, Error);
    });
  });
});