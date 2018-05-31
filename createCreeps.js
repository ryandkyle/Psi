let createCreeps = function(allCreeps) {

    const parts = {
        harvester: [WORK, WORK, CARRY, MOVE],
        upgrader: [WORK, CARRY, MOVE],
        builder: [WORK, WORK, CARRY, MOVE],
    };

    const maxCounts = {
        harvester: 5,
        upgrader: 2,
        builder: 2,
    }

   let spawnCreep = function (role) {
        let number = Math.floor(Math.random()*10000);
        let canSpawnThingStatusCode = mainSpawn.spawnCreep(parts[role],
            role + number,
            { dryRun: true });

        if (canSpawnThingStatusCode < 0)
        {
            if (canSpawnThingStatusCode !== -6) {
                console.log("error: " + canSpawnThingStatusCode);
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

    let creepsCount = allCreeps.length;
    console.log("There are " + creepsCount + " creeps!");

    let mainSpawn = Game.spawns['Spawn1'];

    let harvesters = allCreeps.filter( (t) => {
        return t.creep.memory.role === 'harvester'});
    let upgraders = allCreeps.filter( (t) => {
        return t.creep.memory.role === 'upgrader'});
    let builders = allCreeps.filter( (t) => {
        return t.creep.memory.role === 'builder'});

    console.log("harvester count: " + harvesters.length);
    console.log("upgrader count: " + upgraders.length);

    if (harvesters.length < maxCounts["harvester"]) {
        spawnCreep("harvester");
    } else if (upgraders.length < maxCounts["upgrader"]) {
        spawnCreep("upgrader");
    } else if (builders.length < maxCounts["builder"]) {
        spawnCreep("builder");
    }
};

module.exports = createCreeps;
