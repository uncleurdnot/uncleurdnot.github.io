//=============================================================================
// TDW More State SV Motions
// TDW_MoreStateSVMotions.js
//=============================================================================

var Imported = Imported || {};
Imported.TDW_MoreStateSVMotions = true;

var TDW = TDW || {};
TDW.MoreStateSVMotions = TDW.MoreStateSVMotions || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Adds the ability to have different motions on SV
 * Actors other than just Normal, Abnormal, Sleep, and Dead.
 * @author wrigty12
 *
 *
 * @help
 * Place under YEP_BattleEngineCore if you are using it.
 *
 * This plugin lets you have different motions for your actors while affected
 * by a state. For instance, you can have a "Charging" state what puts the
 * actor in the Chanting motion while it's charging. It expands the current
 * motion options given in the database.
 *
 * Notetag (Place in State Note Box):
 *  <SV Motion: x>
 *  Where x is the value of the motion you wish to have.
 *
 * Motion Values:
 * 0 - Idle
 * 1 - Abnormal (Used in Database too)
 * 2 - Sleeping (Used in Database too)
 * 3 - Dead  (Used in Database too)
 * 4 - Ready/Physical
 * 5 - Ready/Magical
 * 6 - Guard 
 * 7 - Damage
 * 8 - Evade
 * 9 - Stabbing
 * 10 - Swinging
 * 11 - Shooting
 * 12 - Use Physical Skill
 * 13 - Use Magical Skill 
 * 14 - Use Item
 * 15 - Escape
 * 16 - Victory
 * 17 - Crisis/Danger
 *
 * Notetag value will take priority over the Database value.
 *
 * 
//=============================================================================
 */

SV_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!SV_DataManager_isDatabaseLoaded.call(this)) return false;
  if (!TDW.loadedMoreStateMotions) {
	this.processTDWStateNotetags($dataStates);
    TDW.loadedMoreStateMotions = true;
  }
  return true;
};

DataManager.processTDWStateNotetags = function(group) {
	var note1 = /<(?:SV MOTION):[ ](\d+)>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.svMotion = -1;
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.svMotion = parseInt(RegExp.$1);
			}
		}
	}
};

var TDW_Game_BattlerBase_stateMotionIndex = Game_BattlerBase.prototype.stateMotionIndex;
Game_BattlerBase.prototype.stateMotionIndex = function() {
	var index = TDW_Game_BattlerBase_stateMotionIndex.call(this);
/*     var states = this.states();
    if (states.length > 0) {
        return states[0].motion;
    } else {
        return 0;
    } */
	var states = this.states();
	if (states.length > 0) {
		if (states[0].svMotion >=0) { return states[0].svMotion;}
	}
	return index;
};

var TDW_Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
		var actor = this._actor;
	if (Imported.YEP_BattleEngineCore){
		if (!actor) return;
		var motionGuard = Sprite_Actor.MOTIONS['guard'];
		if (this._motion === motionGuard && !BattleManager.isInputting()) return;
		var stateMotion = actor.stateMotionIndex();
		if (actor.isInputting() || actor.isActing()) {
		  this.startMotion(actor.idleMotion());
		} else if (stateMotion === 3) {
		  this.startMotion(actor.deadMotion());
		} else if (stateMotion === 2) {
		  this.startMotion(actor.sleepMotion());
		} else if (actor.isChanting()) {
		  this.startMotion(actor.chantMotion());
		} else if (actor.isGuard() || actor.isGuardWaiting()) {
		  this.startMotion(actor.guardMotion());
		} else if (stateMotion === 1) {
		  this.startMotion(actor.abnormalMotion());
		 //added section
		} else if (stateMotion === 0) {
		  this.startMotion('walk'); //Idle
		} else if (stateMotion === 4) {
		  this.startMotion('wait'); //physicalReady
		} else if (stateMotion === 5) {
		  this.startMotion('chant'); //magicalReady
		} else if (stateMotion === 6) {
		  this.startMotion('guard'); //Guard
		} else if (stateMotion === 7) {
		  this.startMotion('damage'); //Damage
		} else if (stateMotion === 8) {
		  this.startMotion('evade'); //Evade	  
		} else if (stateMotion === 9) {
		  this.startMotion('thrust'); //Stabbing
		} else if (stateMotion === 10) {
		  this.startMotion('swing'); //Swinging
		} else if (stateMotion === 11) {
		  this.startMotion('missile'); //Shooting
		} else if (stateMotion === 12) {
		  this.startMotion('skill'); //UsePhysicalSkill
		} else if (stateMotion === 13) {
		  this.startMotion('spell'); //UseMagicalSkill	
		} else if (stateMotion === 14) {
		  this.startMotion('item'); //UseItem
		} else if (stateMotion === 15) {
		  this.startMotion('escape'); //Escape
		} else if (stateMotion === 16) {
		  this.startMotion('victory'); //Victory
		} else if (stateMotion === 17) {
		  this.startMotion('dying'); //Danger
		 //end added section
		} else if (actor.isDying()) {
		  this.startMotion(actor.dyingMotion());
		} else if (actor.isUndecided()) {
		  this.startMotion(actor.idleMotion());
		} else {
		  this.startMotion(actor.waitMotion());
		}
	} else{
		var motionGuard = Sprite_Actor.MOTIONS['guard'];
		if (actor) {
			if (this._motion === motionGuard && !BattleManager.isInputting()) {
					return;
			}
			var stateMotion = actor.stateMotionIndex();
			if (actor.isInputting() || actor.isActing()) {
				this.startMotion('walk');
			} else if (stateMotion === 3) {
				this.startMotion('dead');
			} else if (stateMotion === 2) {
				this.startMotion('sleep');
			} else if (actor.isChanting()) {
				this.startMotion('chant');
			} else if (actor.isGuard() || actor.isGuardWaiting()) {
				this.startMotion('guard');
			} else if (stateMotion === 1) {
				this.startMotion('abnormal');
			 //added section
			} else if (stateMotion === 0) {
			  this.startMotion('walk'); //Idle
			} else if (stateMotion === 4) {
			  this.startMotion('wait'); //physicalReady
			} else if (stateMotion === 5) {
			  this.startMotion('chant'); //magicalReady
			} else if (stateMotion === 6) {
			  this.startMotion('guard'); //Guard
			} else if (stateMotion === 7) {
			  this.startMotion('damage'); //Damage
			} else if (stateMotion === 8) {
			  this.startMotion('evade'); //Evade	  
			} else if (stateMotion === 9) {
			  this.startMotion('thrust'); //Stabbing
			} else if (stateMotion === 10) {
			  this.startMotion('swing'); //Swinging
			} else if (stateMotion === 11) {
			  this.startMotion('missile'); //Shooting
			} else if (stateMotion === 12) {
			  this.startMotion('skill'); //UsePhysicalSkill
			} else if (stateMotion === 13) {
			  this.startMotion('spell'); //UseMagicalSkill	
			} else if (stateMotion === 14) {
			  this.startMotion('item'); //UseItem
			} else if (stateMotion === 15) {
			  this.startMotion('escape'); //Escape
			} else if (stateMotion === 16) {
			  this.startMotion('victory'); //Victory
			} else if (stateMotion === 17) {
			  this.startMotion('dying'); //Danger
			 //end added section
			} else if (actor.isDying()) {
				this.startMotion('dying');
			} else if (actor.isUndecided()) {
				this.startMotion('walk');
			} else {
				this.startMotion('wait');
			}
		}
	}
};

