var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let getSourceLocation = function(sources) {
            let index = Math.floor(Math.random() * sources.length);
            return sources[index];
        };

        if(creep.carry.energy < creep.carryCapacity) {
            let source = creep.memory.source;
            if (!creep.memory.source) {
                var sources = creep.room.find(FIND_SOURCES);
                source = getSourceLocation(sources);
                creep.memory.source = source;
                console.log(creep.name + " found " + source.name);
            }

            // Harvest or move to Source
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            // Transfer to Storage or move to Storage.
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD, undefined);
                }
            }
        }
    }
};

module.exports = roleHarvester;