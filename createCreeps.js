let createCreeps = function(allCreeps) {

    const parts = {
        harvester: [WORK, WORK, CARRY, MOVE], // 300
        upgrader: [WORK, CARRY, MOVE], // 200
        builder: [WORK, WORK, CARRY, MOVE], // 300
    };

    const maxCounts = {
        harvester: 3,
        upgrader: 4,
        builder: 5,
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

    //let creepsCount = allCreeps.length;
    //console.log("There are " + creepsCount + " creeps!");

    let mainSpawn = Game.spawns['Spawn1'];

    let roles = ["harvester", "upgrader", "builder"];
    for (let i in roles) {
        let role = roles[i];
        let things = allCreeps.filter((t) => t.creep.memory.role === role);
        //console.log(role + " count: " + things.length);
        if (things.length < maxCounts[role]) {
            spawnCreep(role);
            break;
        }
    }
};

module.exports = createCreeps;
