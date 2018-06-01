let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let getSourceLocation = function(sources) {
            let index = Math.floor(Math.random() * sources.length);
            console.log("source index: " + index + " / " + sources.length);
            if (index > sources.length - 1) {
                console.log("Index out of range trying to find a source. Random number failed us somehow. Falling back to 0.");
                index = 0;
            }

            return sources[index];
        };

        // If less than full of energy
        if (creep.carry.energy < creep.carryCapacity) {
            let source = creep.memory.source;

            if (source === undefined) {
                //console.log(creep.name + "'s source was null");
                let sources = creep.room.find(FIND_SOURCES);

                console.log("sources found: " + sources.length);
                source = getSourceLocation(sources);
                //source = sources[0];
                creep.memory.source = source;
                console.log(creep.name + " found " + source.id);
            }
            //console.log(creep.name + "'s source is now " + source.id);

            // Harvest or move to Source
            let errorCode = creep.harvest(creep.memory.source);
            if (errorCode == ERR_NOT_IN_RANGE) {
                console.log(creep.name + " is moving to " + creep.memory.source.id + " to harvest");
                creep.moveTo(creep.memory.source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else {
                if (errorCode === ERR_INVALID_TARGET) {
                    console.log("ERR_INVALID_TARGET");
                    console.log("This doesn't make sense.");
                }
                else {
                    console.log("error code: " + errorCode);
                }
                console.log("energy: " + creep.carry.energy);
            }
        }
        else {
            console.log("full of energy or sumthin");
            // Transfer to Storage or move to Storage.
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            let unbuiltRoads = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
                filter: (site) => {
                    return site.structureType == STRUCTURE_ROAD;
                }
            });

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    if (unbuiltRoads.length < 5) {
                        console.log("Placing a road");
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD, undefined);
                    }
                }
            } else {
                // Go home if you can't harvest or build.
                console.log("Trying to go home");
                creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0], {visualizePathStyle: {stroke: '#aaddff'}});
            }
        }
    }
};

module.exports = roleHarvester;