//=========================================================
// Sensor SelfSwitch
// Sensor SelfSwitch.js
// Version: 3.3.3
//=========================================================

var Imported = Imported || {};
Imported.LSensor = true;

var Lyson = Lyson || {};
Lyson.Sensor = Lyson.Sensor || {};
LS = Lyson.Sensor;

/*:
 * @author Lyson
 * @plugindesc Allows events to flip a self switch when a
 * player is in range.
 * <Sensor SelfSwitch>
 * 
 * @param Event Self Switch
 * @desc The self switch for event tags.
 * A, B, C, or D
 * @default D
 *
 * @param Comment Self Switch
 * @desc The self switch for comment tags.
 * A, B, C, or D
 * @default D
 *
 * @param Blackout Region
 * @desc The region number that will stop the selfswitch.
 * Number between 1 and 255
 * @default
 *
 * @param Blackout Variable
 * @desc Set Blackout Region to be the a variable number.
 * NO - false, YES - true
 * @default false
 *
 * @param Blackout Switch
 * @desc Set Blackout Region to trigger by a switch (set below).
 * NO - false, YES - true
 * @default false
 *
 * @param Blackout Switch Number
 * @desc Set the number of the switch to trigger the Blackout Region.
 * This will not be used unless Blackout Switch is set to YES.
 * @default
 *
 * @help
 * =============================================================================
 * What does it do?
 * =============================================================================
 *
 * This plugin activates a self switch when a player is in a certain proximity
 * of an event. It uses a notetag in the note of the event to set the proximity.
 *
 * =============================================================================
 * Usage
 * =============================================================================
 *
 * In the plugin parameters, set the self switch to be triggered on the event
 * when a player enters the range. Options are A, B, C, and D. Default is D.
 *
 * Event tags provide 2 way functionality, they will turn off the switch when
 * the player leaves the event tag sensor zone.
 *
 * Comment tags only provide 1 way switching, they will NOT turn off the Self
 * Switch when the player leaves the comment tag sensor zone.
 *
 * The value of Blackout Region is the number of the region where you want the
 * sensor to be ineffectual.
 * When Blackout Variable is true, Blackout Region is the variable number whose
 * value contains the desired region number, anything other than a number set 
 * to the variable will most likely cause errors.
 *
 * When Blackout Switch is true and the switch (set in Blackout Switch Number)
 * is off, the region established for Blackout Region will not alter the
 * funcitons of the sensor. When it is ON the established region will prevent
 * triggering the self switch.
 * 
 *
 * -----------------------------------------------------------------------------
 * Notetags
 * -----------------------------------------------------------------------------
 *
 * These notetags go in the note box for the event or in a comment on an event
 * page. All commas are optional.
 *    
 * Placing an exclamation mark "!" in front of any number in the following tags
 * will use the value of the variable with the ID of that number.
 * Ex: <Sensor: !3> will use the value of variable 3.
 *
 *    <Sensor: x>
 *
 * Where x is the number of tiles away that the selfswitch will be triggered.
 *
 *
 *    <SensorLV: x>
 *
 * This makes it so that the selfswitch will only be triggered in a straight
 * line in the direction the event is facing.
 * Where x is the number of tiles away that the selfswitch will be triggered.
 *
 *    <SensorCV: x>
 *
 * This makes it so that the selfswitch will be triggered in a cone, the
 * direction the event is looking.
 * Where x is the number of tiles away the cone extends.
 *
 *    <SensorRV: x, y>
 *
 * This makes it so that the selfswitch will only be triggered in a 
 * rectangular line in the direction the event is facing.
 * Where x is the number of tiles to both sides of the event's looking 
 * direction, and y is the number of tiles away that the selfswitch will be 
 * triggered.
 *
 *   <SensorCV: x L>
 *   <SensorRV: x y left>
 *   <SensorLV: x left up>
 *
 * Sensor direction can be set using d, l, r, u, down, left, right, up. This is
 * not case sensitive. The direction set is in relation to the event the tag is
 * on. x and/or y are defined as established in above tags. This works for any 
 * sensor type, except the basic sensor.
 * You may put any combinations of directions in the tag. They may be separated
 * by spaces, but this is not required
 *
 *
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * Change your sensors on the fly! Use Plugin Commands to alter any aspect of 
 * sensors on your event. You could even ADD or REMOVE sensors to/from an event.
 *
 * LSensor event property value
 * LSensor page property value
 *
 * Okay, this is the Plugin command LSensor is required, as is either event or
 * page. If you don't have at least one property and value after these, why are
 * you using the plugin command??
 *
 * You can have any number of properties and values in the Plugin command, but
 * only 1 event or page identifier.
 * The event identifier is equivilant to using/modifying the event note tag.
 * The page identifier is equivilant to using/modifying a comment tag.
 *
 * LSensor off
 * LSensor event off
 * LSensor page off
 *
 * On/Off commands turn all, event level, or comment level sensors on or off
 * respectively
 *
 * Here is the list and limits of the properties:
 *
 * Id       x
 * Type     b, cv, lv, rv, null
 * Range    x (any number)
 * RangeVar x (any number)
 * Width    x (any number)
 * WidthVar x (any number)
 * Dir      d, l, r, u, down, left, right, up
 * ThisDir  true
 *
 * Id x
 *    The Id of the event to be affected, this is not needed if the change is 
 *    to happen on the current event. Do NOT include preceding 0's.
 * Type b, cv, lv, rv, null
 *    These are basic, coneview, lineview, rectangleview, the shorthand MUST be
 *    used. Width/WidthVar will be ignored on b, cv, and lv types. The command
 *    null will prevent the sensor from working.
 * Range x (any number)
 *    Know that if you set this and then RangeVar, Range will be overwritten.
 * RangeVar x (any number)
 *    This is the variable number whose value will be used for the sensor Range.
 * Width x (any number)
 *    Know that if you set this and then WidthVar, Width will be overwritten.
 * WidthVar x (any number)
 *    This is the variable number whose value will be used for the sensor Width.
 * Dir d, l, r, u, down, left, right, up
 *    Shorthand or full word can be used with Dir. This will set the direction
 *    that the sensor will use. Multiple directions can be used, a space is
 *    required between each direction.
 * ThisDir true
 *    This will set the sensor to use the direction of the event itself.
 *    Do NOT use both this and the Dir commands. This coudl easily lead to 
 *    errors.
 *
 * ## A note about page sensor changes. The changes will only occur for the 
 *    current page, and will not persist through page changes, even if the page
 *    that was changed comes back up. The plugin will use the original tag, if
 *    there was one, to make a sensor on page changes.
 *
 * -----------------------------------------------------------------------------
 * Special Thanks to Gilles, Estriole and YOU!
 * -----------------------------------------------------------------------------
 * =============================================================================
 */

// Make the plugin name independent.
Lyson.Parameters = $plugins.filter(function (plugin) { return plugin.description.indexOf('<Sensor SelfSwitch>') != -1; })[0].parameters;
Lyson.Param = Lyson.Param || {};

// Plugin Parameters
Lyson.Param.SelfSwitch = String(Lyson.Parameters['Event Self Switch']);
Lyson.Param.CommentSwitch = String(Lyson.Parameters['Comment Self Switch']);
Lyson.Param.RegionBlock = Number(Lyson.Parameters['Blackout Region']);
Lyson.Param.blockVariable = String(Lyson.Parameters['Blackout Variable']);
Lyson.Param.blockSwitch = String(Lyson.Parameters['Blackout Switch']);
Lyson.Param.blockSwitchNum = Number(Lyson.Parameters['Blackout Switch Number']);

// Event Container to keep sensors persistent
LS.events = LS.events || {};

// Global Variables for switching sensors off and on
LS.Sensors = true;
LS.EventSensors = true;
LS.PageSensors = true;

// Scene_Map alias to inject sensor building
LS.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    if (!LS.events[$gameMap._mapId]) {
        LS.events[$gameMap._mapId] = LS.events[$gameMap._mapId] || {};
        $gameMap.events().forEach(function (event) {
            LS.processSensorTags.call(event);
        });
    } else {
        console.log('no');
        $gameMap.events().forEach(function (event) {
            LS.recoverSensorEvents.call(event);
        });
    }
    LS.Scene_Map_start.call(this);
}

// Plugin Command
LS.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    if (command.toLowerCase() === 'lsensor') {
        for (var i = 0; i < args.length; i++) {
        }
        try {
            if (args[0].toLowerCase() === 'event') { LS.eventCommand.call(this, args); };
            if (args[0].toLowerCase() === 'page') { LS.pageCommand.call(this, args); };
            if (args[0].toLowerCase() === 'off') { LS.Sensors = false; };
            if (args[0].toLowerCase() === 'on') { LS.Sensors = true; };
        }
        catch (e) { //Stop game processing and throw error if the plugin command is incorrect.
            var event = $gameMap._events[this._eventId];
            console.error("Error reading Plugin Command for Sensor Selfswitch.\nPlease check Plugin Command on Event: " + event.event().name + ", EventID: " + this._eventId);
            console.error(e.stack);
            Graphics.printError("Event Sensor Plugin Command Invalid", "EventID: " + this.event().id + ", EventName: " + event.name);
            AudioManager.stopAll();
            SceneManager.stop();
        }
    }
    LS.Game_Interpreter_pluginCommand.call(this, command, args);
}

// Handle Plugin Command for events.
LS.eventCommand = function (args) {
    if (args[1].toLowerCase() === 'off') { LS.EventSensors = false; };
    if (args[1].toLowerCase() === 'on') { LS.EventSensors = true; };
    var obj;
    var i;
    if (args[1].toLowerCase() === 'id') {
        obj = $gameMap._events[parseInt(args[2])].event();
        i = 3;
    } else {
        obj = $gameMap._events[this._eventId].event();
        i = 1;
    };
    for (; i < args.length; i += 2) {
        var value = i + 1;
        switch (args[i].toLowerCase()) {
            case 'type':
                LS.setType(obj, args[value]);
                console.log("I Ran");
                break;
            case 'range':
                LS.setRangeVar(obj, null)
                LS.setRange(obj, parseInt(args[value]));
                break;
            case 'rangevar':
                LS.setRangeVar(obj, parseInt(args[value]));
                break;
            case 'width':
                LS.setWidthVar(obj, null);
                LS.setWidth(obj, parseInt(args[value]));
                break;
            case 'widthvar':
                LS.setWidthVar(obj, parseInt(args[value]));
                break;
            case 'dir':
                var dirs = [];
                var filter = /([dlru])?(?:own|eft|p|ight)*/i
                for (var d = i + 1; d < args.length; d++) {
                    if (args[d].match(filter)[1]) {
                        dirs.push(args[d].match(filter)[1]);
                        i = d - 1;
                    } else {
                        break;
                    };
                }
                LS.setThisDir(obj, false);
                LS.setDir(obj, dirs);
                break;
            case 'thisdir':
                LS.setThisDir(obj, !!args[value]);
                break;
        }
    }
    if (args[1].toLowerCase() === 'id') {
        LS.saveSensorProperties.call($gameMap._events[parseInt(args[2])]);
    } else {
        LS.saveSensorProperties.call($gameMap._events[this._eventId]);
    };
};


// Handle Plugin Command for pages.
LS.pageCommand = function (args) {
    if (args[1].toLowerCase() === 'off') { LS.PageSensors = false; };
    if (args[1].toLowerCase() === 'on') { LS.PageSensors = true; };
    var obj;
    var i;
    if (args[1].toLowerCase() === 'id') {
        obj = $gameMap._events[parseInt(args[2])].page();
        i = 3;
    } else {
        obj = $gameMap._events[this._eventId].page();
        i = 1;
    };
    for (; i < args.length; i += 2) {
        console.log(args[i] + " " + args[i + 1])
        var value = i + 1;
        switch (args[i].toLowerCase()) {
            case 'type':
                LS.setType(obj, args[value]);
                break;
            case 'range':
                LS.setRangeVar(obj, null)
                LS.setRange(obj, parseInt(args[value]));
                break;
            case 'rangevar':
                LS.setRangeVar(obj, parseInt(args[value]));
                break;
            case 'width':
                LS.setWidthVar(obj, null);
                LS.setWidth(obj, parseInt(args[value]));
                break;
            case 'widthvar':
                LS.setWidthVar(obj, parseInt(args[value]));
                break;
            case 'dir':
                var dirs = [];
                var filter = /([dlru])?(?:own|eft|p|ight)*/i
                for (var d = i + 1; d < args.length; d++) {
                    if (args[d].match(filter)[1]) {
                        dirs.push(args[d].match(filter)[1]);
                        i = d - 1;
                    } else {
                        break;
                    };
                }
                LS.setThisDir(obj, false);
                LS.setDir(obj, args[value]);
                break;
            case 'thisdir':
                LS.setThisDir(obj, !!args[value]);
                break;
        }
    }
    if (args[1].toLowerCase() === 'id') {
        LS.saveSensorProperties.call($gameMap._events[parseInt(args[2])]);
    } else {
        LS.saveSensorProperties.call($gameMap._events[this._eventId]);
    };
};


// Clears the sensor values for a page so that they wont carry over if there is nothing overwriting them.
LS.Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
Game_Event.prototype.clearPageSettings = function () {
    LS.Game_Event_clearPageSettings.call(this);
    var page = this.page();
    this._sensorType = null;
    this._sensorDirection = null;
    this._sensorThisDir = null;
    this._sensorRange = 0;
    this._sensorRangeVar = -1;
    this._sensorWidth = 0;
    this._sensorWidthVar = -1;
};

// Alias Game_Event.prototype.setupPageSettings to check tags, and apply properties.
LS.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function () {
    if (!this.page()) { return LS.Game_Event_setupPageSettings.call(this); };
    LS.Game_Event_setupPageSettings.call(this);
    LS.processSensorTags.call(this, true);
};

//Alias Game_Event.prototype.update to add sensor checking.
LS.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
    LS.Game_Event_update.call(this);
    if (LS.Sensors) { this.updateSensor(); };
};

// Update function to check sensor zones.
Game_Event.prototype.updateSensor = function () {
    if (this._erased) return;
    if (!this.page()) return;
    if (!this.event()._sensorType && !this.page()._sensorType) return;
    if (this.event()._sensorRange <= 0 && this.page()._sensorRange <= 0) return;
    LS.checkSensorZone.call(this);
};

// Sensor Property gets
LS.getType = function (obj) {
    return obj._sensorType;
}
LS.getRange = function (obj) {
    LS.setRange(obj);
    return obj._sensorRange;
}
LS.getWidth = function (obj) {
    LS.setWidth(obj);
    return obj._sensorWidth;
}
LS.getRangeVar = function (obj) {
    return obj._sensorRangeVar;
}
LS.getWidthVar = function (obj) {
    return obj._sensorWidthVar;
}
LS.getDir = function (obj) {
    LS.setDir.call(this, obj);
    return obj._sensorDirection;
}
LS.getThisDir = function (obj) {
    return obj._sensorThisDir;
}

// Sensor Property sets
LS.setType = function (obj, args) {
    if (typeof args === 'undefined') { args = 'b' };
    obj._sensorType = args;
}
LS.setRange = function (obj, args) {
    if (typeof args === 'undefined') { args = obj._sensorRange; }
    if (obj._sensorRangeVar) { obj._sensorRange = $gameVariables.value(LS.getRangeVar(obj)); } else { obj._sensorRange = args; };
}
LS.setWidth = function (obj, args) {
    if (typeof args === 'undefined') args = obj._sensorWidth;
    if (obj._sensorWidthVar) { obj._sensorWidth = $gameVariables.value(LS.getWidthVar(obj)); } else { obj._sensorWidth = args; };
}
LS.setRangeVar = function (obj, args) {
    obj._sensorRangeVar = args;
}
LS.setWidthVar = function (obj, args) {
    obj._sensorWidthVar = args;
}
LS.setDir = function (obj, args) {
    if (typeof args === 'undefined') { obj._sensorDirection = obj._sensorDirection } else { obj._sensorDirection = LS.makeDir(args); };
    if (LS.getThisDir(obj)) { obj._sensorDirection = this.direction(); };
}
LS.setThisDir = function (obj, args) {
    obj._sensorThisDir = args;
}


// Define RegEx to be matched, sort whether its an event's note or event page's comment being checked.
LS.processSensorTags = function (pageChange) {
    if (!$dataMap) return;
    if (!LS.events[this._mapId]) return;

    var tag = /<(?:SENSOR)(LV||CV||RV)?:\s(!?)(\d+)(?:(?:,?\s)(!?)(\d+))?(?:(?:,?\s)([dlru])?(?:own|eft|p|ight)*\s?([dlru])?(?:own|eft|p|ight)*\s?([dlru])?(?:own|eft|p|ight)*\s?([dlru])?(?:own|eft|p|ight)*)>/i;
    // Prevent changing the event properties every page change
    if (!pageChange) { LS.processEventTag.call(this, tag); };
    LS.processCommentTag.call(this, tag);
};

// Save event sensor
LS.saveSensorProperties = function () {
    var map = $gameMap._mapId;
    var ev = this._eventId;
    var obj;
    if (this.event()._sensorType || this.page()._sensorType) {
        obj = this.event();
        var newEvent = {
            type: LS.getType(obj),
            range: LS.getRange(obj),
            width: LS.getWidth(obj),
            rangeVar: LS.getRangeVar(obj),
            widthVar: LS.getWidthVar(obj),
            dir: LS.getDir.call(this, obj),
            thisDir: LS.getThisDir(obj)
        };
        if (LS.events[map][ev] === newEvent) { return; };
        LS.events[$gameMap._mapId][this._eventId] = newEvent;
    }
    if (!this.page()) return;
    if (this.page()._sensorType) {
        obj = this.page();
        var newEvent = {
            index: this._pageIndex,
            type: LS.getType(obj),
            range: LS.getRange(obj),
            width: LS.getWidth(obj),
            rangeVar: LS.getRangeVar(obj),
            widthVar: LS.getWidthVar(obj),
            dir: LS.getDir.call(this, obj),
            thisDir: LS.getThisDir(obj)
        };
        if (LS.events[map][ev].currentPage === newEvent) { return; };
        LS.events[$gameMap._mapId][this._eventId].currentPage = newEvent;
    }
}

// Recover event sensor
LS.recoverSensorEvents = function () {
    if (!LS.events[$gameMap._mapId]) return;
    var obj;
    for (var ev in LS.events[$gameMap._mapId]) {
        //console.log(ev);
        if (this._eventId == ev) {
            sensor = LS.events[$gameMap._mapId][ev];
            obj = this.event()
            obj._sensorType = sensor.type;
            obj._sensorRange = sensor.range;
            obj._sensorWidth = sensor.width;
            obj._sensorRangeVar = sensor.rangeVar;
            obj._sensorWidthVar = sensor.widthVar;
            obj._sensorDirection = sensor.dir;
            obj._sensorThisDir = sensor.thisDir;
            if (!sensor.currentPage) break;
            obj = this.page()
            if (this._pageIndex == sensor.currentPage.index) {
                obj._sensorType = sensor.currentPage.type;
                obj._sensorRange = sensor.currentPage.range;
                obj._sensorWidth = sensor.currentPage.width;
                obj._sensorRangeVar = sensor.currentPage.rangeVar;
                obj._sensorWidthVar = sensor.currentPage.widthVar;
                obj._sensorDirection = sensor.currentPage.dir;
                obj._sensorThisDir = sensor.currentPage.thisDir;
            }
        }
    }
}

// Check RegEx against note entries on an Event
LS.processEventTag = function (tag) {
    var event = this.event();
    if (event.note) {
        var note = event.note.split(/(?:>)[ ]/);
        for (var i = 0; i < note.length; i++) {
            if (note[i].match(tag)) {
                LS.setupSensorSettings.call(this, note[i].match(tag), false)
            }
        }
    }
};

// Check the RegEx against comment entries on an event page.
LS.processCommentTag = function (tag) {
    if (!this.page()) return;
    var note;
    var list = this.page().list;
    for (var i = 0; i < list.length; i++) {
        if (list[i].code === 108 || list[i].code === 408) {
            note = list[i].parameters[0];
            if (note.match(tag)) {
                LS.setupSensorSettings.call(this, note.match(tag), true)
            }
        }
    }
};

//Sets sensor properties to either the event object or the event's page object.
LS.setupSensorSettings = function (match, commTag) {
    var object;
    if (commTag) { object = this.page() } else { object = this.event(); }; //Set var object to page or event, to place the properties on the proper object.
    try {
        //Set range property that all sensor types, except RV use. 
        if (match[2]) { LS.setRangeVar(object, parseInt(match[3])); LS.setRange(object); } else { LS.setRange(object, parseInt(match[3])); };
        if (match[1]) {//Matches LV, CV, or RV following Sensor in the tag, indicating sensor type.
            //Set the direction of the sensor zone if indicated on tag.
            var dirs = [match[6], match[7], match[8], match[9]].join('').split('');
            if (dirs) { LS.setDir.call(this, object, dirs) } else { LS.setThisDir(object, true); LS.setDir.call(this, object); }
            switch (match[1].toLowerCase()) {//Set properties based on the sensor type.
                case "lv": //Set properties specific to Line View sensors
                    LS.setWidth(object, 0);
                    LS.setType(object, 'lv');
                    break;
                case "rv": //Set properties specific to Rectangle View sensors & overwrite _sensorRange/_sensorRangeVar properties.
                    LS.setType(object, 'rv');
                    if (match[2]) { LS.setWidthVar(object, parseInt(match[3])); LS.setWidth(object); } else { LS.setWidth(object, parseInt(match[3])); };
                    if (match[4]) { LS.setRangeVar(object, parseInt(match[5])); LS.setRange(object); } else { LS.setRange(object, parseInt(match[5])); };
                    break;
                case "cv": //Set properties specific to Cone View sensors
                    LS.setType(object, 'cv');
                    break;
                default:
                    break;
            }
        } else {//No LV, CV, RV means its a basic sensor.
            LS.setType(object, 'b');
        }
    } catch (e) { //Stop game processing and throw error if the tag is incorrect.
        console.error("Error reading Sensor SelfSwitch Tag.\nPlease check Sensor tag on Event: " + this.event().name + ", EventID: " + this.event().id);
        console.error(e.stack);
        Graphics.printError("Event Sensor Tag Invalid", "EventID: " + this.event().id + ", EventName: " + this.event().name);
        AudioManager.stopAll();
        SceneManager.stop();
    }

    if (object._sensorType) { LS.events[$gameMap._mapId][this._eventId] = { currentPage: {} }; };
    LS.saveSensorProperties.call(this);
};

//Process the tag direction indicator.
LS.makeDir = function (dirs) {
    var directions = [];
    for (var i = 0; i < dirs.length; i++) {
        var dir = dirs[i];
        switch (dir.toLowerCase()) {
            case "d":
                directions.push(2);
                break;
            case "l":
                directions.push(4);
                break;
            case "r":
                directions.push(6);
                break;
            case "u":
                directions.push(8);
                break;
            default:
                break;
        }
    }
    return directions;
};

// Uses the sensor type to check if player is in the sensor zone.
LS.checkSensorZone = function () {
    var object = [this.page(), this.event()];
    for (var i = 0; i < object.length; i++) {
        if (object[i]._sensorType) {
            LS.checkChanges.call(this, object[i]);
            if (i === 0 && !LS.PageSensors) return;
            if (i === 1 && !LS.EventSensors) return;
            switch (object[i]._sensorType) {
                case "lv":
                    LS.setWidth(object, 0);
                case "rv":
                    LS.rectSensor.call(this, object[i]);
                    break;
                case "cv":
                    LS.coneSensor.call(this, object[i]);
                    break;
                case "b":
                    LS.basicSensor.call(this, object[i]);
                    break;
                default:
                    break;
            }
        }
    }
};

// Update direction when using event's direction, and variable based range and width.
LS.checkChanges = function (object) {
    LS.getRange(object);
    LS.getWidth(object);
    LS.getDir.call(this, object);
    return;
}

// Check player position against basic circle sensor of event.
LS.basicSensor = function (object) {
    var selfs = LS.selfSwitch;
    if (object == this.page()) { selfs = LS.selfSwitchComment; };
    if (LS.regionBlock()) { selfs.call(this, false); return; };

    var inRange = Math.abs(this.deltaXFrom($gamePlayer.x));
    inRange += Math.abs(this.deltaYFrom($gamePlayer.y));

    if (inRange <= LS.getRange(object)) {
        selfs.call(this, true);
    } else {
        selfs.call(this, false);
    };

};

// Check player position against Rectangle View and Line View sensor of event.
LS.rectSensor = function (object) {
    //Set selfs to the appropriate selfswitch switching function.
    var selfs = LS.selfSwitch;
    if (object == this.page()) { selfs = LS.selfSwitchComment; };
    // Checks blackout region function.
    if (LS.regionBlock()) { selfs.call(this, false); return; };
    // Provides 2 way switching for event note sensors.
    var trigger = false;

    var absDeltaY = Math.abs(this.deltaYFrom($gamePlayer.y));
    var absDeltaX = Math.abs(this.deltaXFrom($gamePlayer.x));
    var sensor = LS.getRange(object);
    var sensorNeg = 0 - sensor;
    var sWidth = LS.getWidth(object);
    if (object._sensorType === 'lv') { sWidth = 0 };

    var dir = LS.getDir.call(this, object);
    for (var d = 0; d < dir.length; d++) {
        if ((dir[d] === 2 || dir[d] === 8)) {//if sensor direction is up or down
            //Positive value if player is to the down of the event, Negative value if the player is to the up of the event.
            var inFront = this.deltaYFrom($gamePlayer.y);
            if (absDeltaX <= sWidth) {
                if (dir[d] === 8) {//if sensor direction is up, check player distance against sensor range.
                    if (inFront <= sensor && inFront > 0) trigger = true;
                } else {//else sensor direction down, check player distance against sensor range.
                    if (inFront >= sensorNeg && inFront < 0) trigger = true;
                };
            };
        } else {//else sensor direction is left or right
            //Positive value if player is to the left of the event, Negative value if the player is to the right of the event.
            var inFront = this.deltaXFrom($gamePlayer.x);
            if (absDeltaY <= sWidth) {
                if (dir[d] === 4) {//if sensor direction is left, check player distance against sensor range.
                    if (inFront <= sensor && inFront > 0) trigger = true;
                } else {//else sensor direction is right, check player distance against sensor range.
                    if (inFront >= sensorNeg && inFront < 0) trigger = true;
                };
            };
        };
    }
    //if (inFront = 0) trigger = false;
    selfs.call(this, trigger);
};

// Check player position against Cone View sensor of event.
LS.coneSensor = function (object) {
    //Set selfs to the appropriate selfswitch switching function.
    var selfs = LS.selfSwitch;
    if (object == this.page()) { selfs = LS.selfSwitchComment; };
    // Checks blackout region function.
    if (LS.regionBlock()) { selfs.call(this, false); return; };
    // Provides 2 way switching for event note sensors.
    var trigger = false;

    // The distance between the event and the player, on the X axis as absDeltaX, on the Y axis as absDeltaY.
    var absDeltaY = Math.abs(this.deltaYFrom($gamePlayer.y));
    var absDeltaX = Math.abs(this.deltaXFrom($gamePlayer.x));
    //Local variables for the page/event's sensor range and the negative of that range
    var sensor = object._sensorRange;
    var sensorNeg = 0 - sensor;

    // Math for cone shape
    var coneL = this.deltaXFrom($gamePlayer.x) - absDeltaY;
    var coneR = this.deltaXFrom($gamePlayer.x) + absDeltaY;
    var coneU = this.deltaYFrom($gamePlayer.y) - absDeltaX;
    var coneD = this.deltaYFrom($gamePlayer.y) + absDeltaX;

    var dir = LS.getDir.call(this, object);
    
    for (var d = 0; d < dir.length; d++) {
        if ((dir[d] === 2 || dir[d] === 8)) {
            //Positive value if player is to the down of the event, Negative value if the player is to the up of the event.
            var inFront = this.deltaYFrom($gamePlayer.y);
            if (coneU >= 0 && dir[d] === 8) { //If player is in cone shape upwards and the sensor zone is directed up, check player distance against sensor range.
                if (inFront <= sensor && inFront > 0) trigger = true;
            } else if (coneD <= 0 && dir[d] === 2) {//If player is in cone shape downwards and the sensor zone is directed down, check player distance against sensor range.
                if (inFront >= sensorNeg && inFront < 0) trigger = true;
            };
        } else {
            //Positive value if player is to the left of the event, Negative value if the player is to the right of the event.
            var inFront = this.deltaXFrom($gamePlayer.x);
            if (coneL >= 0 && dir[d] === 4) {//If player is in cone shape left and the sensor zone is directed left, check player distance against sensor range.
                if (inFront <= sensor && inFront > 0) trigger = true;
            } else if (coneR <= 0 && dir[d] === 6) {//If player is in cone shape right and the sensor zone is directed right, check player distance against sensor range.
                if (inFront >= sensorNeg && inFront < 0) trigger = true;
            };
        };
    }
    selfs.call(this, trigger);
};

// Returns true or false depending on if player is on a blackout region that meets all the switch/variable conditions if any exist.
LS.regionBlock = function () {
    if (Lyson.Param.RegionBlock === 0) return false;
    var blockedRegion;
    if (Lyson.Param.blockVariable === 'true') { blockedRegion = $gameVariables.value(Lyson.Param.RegionBlock) } else { blockedRegion = Lyson.Param.RegionBlock };

    if (Lyson.Param.blockSwitch === 'true') {
        if ($gameSwitches.value(Lyson.Param.blockSwitchNum) !== true) { return false; };
    };

    if ($gamePlayer.regionId() === blockedRegion) { return true; } else { return false; };
};

// Change the event note selfswitch.
LS.selfSwitch = function (selfs) {
    $gameSelfSwitches.setValue([this._mapId, this._eventId, Lyson.Param.SelfSwitch], selfs);
};

// Change the comment tag selfswitch.
LS.selfSwitchComment = function (selfs) {
    $gameSelfSwitches.setValue([this._mapId, this._eventId, Lyson.Param.CommentSwitch], selfs);
};

// End of File