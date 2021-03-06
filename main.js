// Screeting Artificial intelligence - SAI
// [Coded by Hermann Hans]
// Version 1.1a

//INIT

//USE THIS ONLY IF HAVE ERRORS
var FORCE_PAUSE = false;
if (FORCE_PAUSE !== true) {

    //LIBS
    //require('screeps-perf')();
    var gc = require('lib.gc');
    var gf = require('lib.gf');
    var _ = require('lib.lodash');
    require('lib.sai');


    //INIT
    require('init.system');
    var initCreeps = require('init.creeps');
    var initRooms = require('init.rooms');
    var initSpawns = require('init.spawns');


    //START LOOP
    module.exports.loop = function () {

        //CPU CHECK
        if (Game.cpu.limit > 100 || Game.cpu.tickLimit < 100 || Game.cpu.bucket < 100) {
            console.log('CPU: ' + Game.cpu.getUsed() + '%');
        }

        //REMOVE DEAD CREEPS FROM MEMORY
        for (var name in Memory.creeps) {
            if (!Game.creeps[name] || Memory.creeps[name] == undefined) {
                delete Memory.creeps[name];
                console.log('Creep ' + name + ' died.');
            }
        }

        //CHECK BUCKET
        if (Game.cpu.bucket > 100) {

            //PULSE ROOMS
            for (var roomName in Game.rooms) {
                initRooms(Game.rooms[roomName]);
            }

            //PULSE SPAWNS
            for (var spawnName in Game.spawns) {
                initSpawns(Game.spawns[spawnName]);
            }

        }

        //PULSE CREEPS
        for (var creepName in Game.creeps) {
            //load creep
            var creep = Game.creeps[creepName];
            //load main
            initCreeps(creep);
            //load types
            var initCreep = require('creeps.type.' + creep.memory.type);
            initCreep(creep);
        }

    };
    //END LOOP

}
