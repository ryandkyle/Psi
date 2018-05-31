var buildingsDomain = function(){

    var getMaxExtensionsForLevel = function(level){
        if (level == 2){
            return 5;
        }
        
        if (level >= 3){
            return ((level - 2) * 10);
        }
        
        return 0;
    };
    
    var findExtensionLocation = function(targetRoom, buildings){
        //build the extension near the spawn, but not on it
        
        if(buildings.spawns.length <= 0){
            return
        }
        
        var sources = targetRoom.find(FIND_SOURCES);
        if(sources.length <= 0){
            return
        }
        
        for(var sourceId in sources){
            var source = sources[sourceId];
            var path = PathFinder.search(buildings.spawns[0].pos, source.pos)
            var shift = 2
            while(shift < 12){
                if(shift % 4 == 0){
                    // hack for some space
                    shift += 2;
                }
                for(var pathId in path.path){
                    var loc = path.path[pathId];
                    var potentialBuilding = {
                        x: loc.x,
                        y: loc.y,
                        type: STRUCTURE_EXTENSION,
                        name: "Extension_" + targetRoom.name + "_" + Math.floor(Math.random() * 100000)
                    }
                    
                    // try up?
                    potentialBuilding.y  = potentialBuilding.y + shift
                    console.log(potentialBuilding.x + "," + potentialBuilding.y);
                    var result = targetRoom.createConstructionSite(potentialBuilding.x, potentialBuilding.y, potentialBuilding.type, potentialBuilding.name);
                    if(result >= 0)
                        return true;
                    
                    // try down?
                    potentialBuilding.y = potentialBuilding.y - (shift * 2);
                    var result = targetRoom.createConstructionSite(potentialBuilding.x, potentialBuilding.y, potentialBuilding.type, potentialBuilding.name);
                    if(result >= 0)
                        return true;
                    
                }
                shift++;
            }
        }
        
    }
    
    var ret = {
        getNextBuilding : function(targetRoom){
            var things = targetRoom.find(FIND_MY_STRUCTURES);
            
            var buildings = {
                extensions: [],
                spawns: []
            };
            
            for(var thingId in things){
                var thing = things[thingId];
                
                switch(thing.structureType){
                    case STRUCTURE_EXTENSION: 
                        buildings.extensions.push(thing);
                        break;
                    case STRUCTURE_SPAWN: 
                        buildings.spawns.push(thing);
                        break;
                    default:
                        //console.log("not found:" + thing.structureType)
                }
            }
            
            if(buildings.extensions.length < getMaxExtensionsForLevel(targetRoom.controller.level)){
                // then build an extension
                return findExtensionLocation(targetRoom, buildings);
            }

        }
    }
    return ret;
    
}();

module.exports = buildingsDomain;