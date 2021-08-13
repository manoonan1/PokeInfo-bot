var assert = require('assert');
const { getPokemonJSON } = require('../utils/Pokemon/GetPokemon.js');

describe('Pokemon', function() {
  describe('#JSON', function() {
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
    it('" " should return id = undefined', async function() {
        var pokemon = await getPokemonJSON(' ');
        assert.equal(pokemon.id, TypeError,"TypeError: Cannot read property 'item' of undefined");
    });
  });
});