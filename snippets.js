// spawning creep
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );

// changing memory
Game.creeps['Harvester1'].memory.role = 'harvester';

// spawns creep with memory role
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',
    { memory: { role: 'builder' } } );

// log amount of energy in room to console
for(var name in Game.rooms) {
    console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
};

// outputting number of creeps with memory.role to console
var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
console.log('Harvesters: ' + harvesters.length);

//Auto spawning harvester creeps when total is less than 2
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

//killing creep in console
Game.creeps['Harvester1'].suicide()

//clearing memory of non-existing creeps
for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }
}

//safe-mode, nullify hostile creeps; using one activiation on upgradeController
//We recommend that you activate safe mode when your defenses fail
Game.spawns['Spawn1'].room.controller.activateSafeMode();

//building defense tower
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

//attacking and repairing with tower
var tower = Game.getObjectById('151dbf18d619c83a438f0b3a');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    };
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'upgrader1', {memory: {role = 'upgrader'});
