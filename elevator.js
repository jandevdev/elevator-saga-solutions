{
    init: function(elevators, floors) {
        // Keep track of rotating through elevators
        var rotator = 0;
        
        _.each(elevators, function(elevator) {
            elevator.on("idle", function() { 
                elevator.goToFloor(0);                
            });

            elevator.on("floor_button_pressed", function(floorNum) { 
                elevator.goToFloor(floorNum);
            } );
            
            elevator.on("passing_floor", function(floorNum) {
                // going up
                if(elevator.destinationDirection() === "up") {
                    if(floors[floorNum].buttonStates.up === "activated") {
                        elevator.goToFloor(floorNum, true);
                    }
                }
                
                // going down
                if(elevator.destinationDirection() === "down") {
                    if(floors[floorNum].buttonStates.down === "activated") {
                        elevator.goToFloor(floorNum, true);
                    }
                }
            });
        });

        _.each(floors, function(floor) {
 
            floor.on("up_button_pressed", function() { 
                // Next elevator in rotation
                var elevator = elevators[(rotator++) % elevators.length];
                elevator.goToFloor(floor.level);
            });
            
            floor.on("down_button_pressed", function() { 
                var elevator = elevators[(rotator++) % elevators.length];
                elevator.goToFloor(floor.level);
            })
        });
    
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
