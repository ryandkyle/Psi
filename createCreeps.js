let createCreeps = function(allCreeps) {

    let harvesterMax = 6;

    let creepsCount = allCreeps.length;

    var mainSpawn = Game.spawns['Spawn1'];

    let canSpawnCreep = mainSpawn.spawnCreep([WORK, CARRY, MOVE],
        "harvester" + creepsCount, { dryRun: true });

    //console.log("canSpawnCreep: " + canSpawnCreep);
    if (!(canSpawnCreep < 0))
    {
        console.log("Can spawn a creep");
        console.log(allCreeps.length);
        if (allCreeps.length < harvesterMax)
        {
            let c = mainSpawn.spawnCreep([WORK, CARRY, MOVE], "harvester" + creepsCount, {
                memory: {role: 'harvester'}
            });
            console.log("Created a harvester");
            console.log(c);
        }
    }
};

module.exports = createCreeps;