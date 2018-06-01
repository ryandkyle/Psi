let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let getSourceLocation = function(sources) {
            let index = Math.floor(Math.random() * sources.length);
            if (index > sources.length - 1) {
                console.log("Index out of range trying to find a source. Random number failed us somehow. Falling back to 0.");
                index = 0;
            }
            return sources[index];
        };

        // If less than full of energy
        if (creep.carry.energy < creep.carryCapacity) {
            let source = creep.memory.source;
            //console.log(creep.name + "'s source is " + source);

            if (source === undefined || source.id === undefined) {
                //console.log(creep.name + "'s source was null");
                let sources = creep.room.find(FIND_SOURCES);
                source = getSourceLocation(sources);
                creep.memory.source = source;
                console.log(creep.name + " found " + source.id);
            }
            //console.log(creep.name + "'s source is now " + source.name);

            // Harvest or move to Source
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                //console.log(creep.name + " is moving to " + source.name + " to harvest");
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            // Transfer to Storage or move to Storage.
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD, undefined);
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