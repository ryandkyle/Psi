let createCreeps = function(allCreeps) {

    const harvesterMax = 6;
    //let upgraderMax = 2;
    //let builderMax = 2;

    let creepsCount = allCreeps.length;
    console.log("There are " + creepsCount + " creeps!");

    var mainSpawn = Game.spawns['Spawn1'];

    let harvesters = allCreeps.filter( (t) => {
        return t.creep.memory.role === 'harvester'});

    let shouldSpawnMoreHarvesters = harvesters.length < harvesterMax;
    console.log("make another harvesters? " + shouldSpawnMoreHarvesters);
    if (shouldSpawnMoreHarvesters)
    {
        let canSpawnHarvesterStatusCode = mainSpawn.spawnCreep([WORK, WORK, CARRY, MOVE],
            "harvester" + creepsCount, { dryRun: true });

        if (!(canSpawnHarvesterStatusCode < 0))
        {
            console.log("Can spawn a harvester");
            console.log(allCreeps.length);
                let c = mainSpawn.spawnCreep([WORK, WORK, CARRY, MOVE], "harvester" + creepsCount, {
                    memory: {role: 'harvester'}
                });
            console.log("Spawned a harvester");
            console.log(c);
        }
    } else {
        let canSpawnUpgrader = mainSpawn.spawnCreep([WORK, CARRY, MOVE],
            "upgrader" + creepsCount, { dryRun: true });

        if (!(canSpawnUpgrader < 0))
        {
            console.log("Can spawn an upgrader");
            console.log(allCreeps.length);
                let c = mainSpawn.spawnCreep([WORK, CARRY, MOVE], "upgrader" + creepsCount, {
                    memory: {role: 'upgrader'}
                });
            console.log("Spawned an upgrader");
            console.log(c);
        }
    }
};

module.exports = createCreeps;