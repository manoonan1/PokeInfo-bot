var assert = require('chai').assert;
var expect = require('chai').expect;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const { getGifEmbed, getGifURL } = require('../../utils/Pokemon/CreateGifmonEmbed.js');

describe('CreateGifmonEmbed', function() {
    describe('#getGifURL', function() {
        it('"venusaur" is passed, expect correct link is returned', async function() {
            var pokemonURL = await getGifURL('venusaur');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/venusaur.gif');
        });
        it('"venusaur" is passed, expect 200 OK Status', async function() {
            var pokemonURL = await getGifURL('venusaur');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 200);
            }
        });
        it('"meowth-alola" is passed, expect correct link returned - variant', async function() {
            var pokemonURL = await getGifURL('meowth-alola');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/meowth-alola.gif');
        });
        it('"meowth-alola" is passed, expect 200 OK Status - variant', async function() {
            var pokemonURL = await getGifURL('meowth-alola');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 200);
            }
        });
        it('"giratina" is passed, expect correct link returned - variant forms, API naming mismatch, goes through parser', async function() {
            var pokemonURL = await getGifURL('giratina');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/giratina.gif');
        });
        it('"giratina" is passed, expect 200 OK Status - variant forms, API naming mismatch, goes through parser', async function() {
            var pokemonURL = await getGifURL('giratina');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 200);
            }
        });
        it('"meowstic" is passed, expect correct link returned - gender variant, API naming mismatch, goes through parser', async function() {
            var pokemonURL = await getGifURL('meowstic');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/meowstic.gif');
        });
        it('"meowstic" is passed, expect 200 OK Status - gender variant, API naming mismatch, goes through parser', async function() {
            var pokemonURL = await getGifURL('meowstic');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 200);
            }
        });
        it('"VenuSaur" is passed, expect correct link returned - goes through parser', async function() {
            var pokemonURL = await getGifURL('VenuSaur');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/meowth-alola.gif');
        });
        it('"VenuSaur" is passed, expect 200 OK Status - goes through parser', async function() {
            var pokemonURL = await getGifURL('VenuSaur');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 200);
            }
        });
        it('"alolan meowth" is passed, expect 200 OK Status - traditional variant semantic, goes through parser', async function() {
            var pokemonURL = await getGifURL('alolan meowth');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/meowth-alola.gif');
        });
        it('"alolan meowth" is passed, expect 200 OK Status - traditional variant semantic, goes through parser', async function() {
            var pokemonURL = await getGifURL('alolan meowth');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 200);
            }
        });
        it('When an "invalidPokemon" is passed, expect invalid link returned - goes through parser, error catching', async function() {
            var pokemonURL = await getGifURL('invalidPokemon');
            assert.equal(pokemonURL, 'https://projectpokemon.org/images/normal-sprite/invalidPokemon');
        });
        it('When an "invalidPokemon" is passed, expect 404 status - goes through parser, error catching', async function() {
            var pokemonURL = await getGifURL('invalidPokemon');
            var request = new XMLHttpRequest();
            request.open("GET", pokemonURL, true);
            request.send();
            request.onload  = function() {
                status = request.status;
                assert.equal(status, 404);
            }
        });
    });
    describe('#getGifEmbed', function(){
        it('Valid URL passed from getGifURL, expect correct MessageEmbed', async function(){
            embed = await getGifEmbed("venusaur");
            assert.equal(embed.image.url, 'https://projectpokemon.org/images/normal-sprite/venusaur.gif');
        });
        it('Invalid URL passed from getGifURL, expect help MessageEmbed', async function(){
            embed = await getGifEmbed(" ");
            assert.equal(embed.title, 'Pokemon Info Bot Help Page');
        });
    });
});