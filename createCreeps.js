let createCreeps = function(allCreeps) {

    let spawnCreep = function (role) {
        let number = Math.random(1, 100000);
        let canSpawnHarvesterStatusCode = mainSpawn.spawnCreep(parts[role],
            role + number,
            { dryRun: true });

        if (canSpawnHarvesterStatusCode < 0)
        {
            if (canSpawnHarvesterStatusCode !== -6) {
                "error: " + canSpawnHarvesterStatusCode
            }
        } else {
            console.log("Can spawn a " + role);
            console.log(allCreeps.length);
                let c = mainSpawn.spawnCreep(parts[role],
                    role + number, {
                    memory: {role: role}
                });
            console.log("Spawned a " + role);
        }
    };

    const harvesterMax = 6;
    //let upgraderMax = 2;
    //let builderMax = 2;

    const parts = {
        harvester: [WORK, WORK, CARRY, MOVE],
        upgrader: [WORK, CARRY, MOVE]
    };

    let creepsCount = allCreeps.length;
    console.log("There are " + creepsCount + " creeps!");

    var mainSpawn = Game.spawns['Spawn1'];

    let harvesters = allCreeps.filter( (t) => {
        return t.creep.memory.role === 'harvester'});

    console.log("harvester count: " + harvesters.length);
    let shouldSpawnMoreHarvesters = harvesters.length < harvesterMax;
    //console.log("make another harvesters? " + shouldSpawnMoreHarvesters);
    if (shouldSpawnMoreHarvesters)
    {
        spawnCreep("harvester");
    } else {
        let canSpawnUpgrader = mainSpawn.spawnCreep(parts["upgrader"],
            "upgrader" + creepsCount, { dryRun: true });

        if (!(canSpawnUpgrader < 0))
        {
            console.log("Can spawn an upgrader");
            console.log(allCreeps.length);
                let c = mainSpawn.spawnCreep(parts["upgrader"], "upgrader" + creepsCount, {
                    memory: {role: 'upgrader'}
                });
            console.log("Spawned an upgrader");
        }
    }
};

module.exports = createCreeps;