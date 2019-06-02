var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
// logs energy available in room
    for(var name in Game.rooms) {
    console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
};
// clears memory of dead creeps
    for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }
}

var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
console.log('Harvesters: ' + harvesters.length);

var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
console.log('Builders: ' + builders.length);

var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
console.log('Upgraders: ' + upgraders.length);

if(harvesters.length < 2) {
    var newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
        {memory: {role: 'harvester'}});
};

if(Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8});
};

if(builders.length < 1) {
    var newName = 'builder' + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
        {memory: {role: 'builder'}});
};

if(Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8});
};

if(upgraders.length < 1) {
    var newName = 'upgrader' + Game.time;
    console.log('Spawning new upgrader: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
        {memory: {role: 'upgrader'}});
};

if(Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].posaw .y,
        {align: 'left', opacity: 0.8});
};


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if(creep.memory.role == 'builder')
         {
            roleBuilder.run(creep);
        }
    }
}
