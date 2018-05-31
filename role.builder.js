var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // Build something!
                
                let highestPercent = -1.0;
                let bestTarget = undefined;
                for(var targetId in targets)
                {
                    let target = targets[targetId];
                    let percent = target.progress / target.progressTotal;
                    if(percent > highestPercent)
                    {
                        bestTarget = target
                        highestPercent = percent
                    }
                }
                
                if(bestTarget && creep.build(bestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(bestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                // No sites to complete, maybe see if we can build one?
                var buildings = require('domain.buildings');
                var potentialBuilding = buildings.getNextBuilding(creep.room);
                if(potentialBuilding){
                    return
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;