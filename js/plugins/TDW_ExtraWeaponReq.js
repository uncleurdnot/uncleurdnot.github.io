//=============================================================================
// TDW_ExtraWeaponReq.js
//=============================================================================

/*:
 * @plugindesc v1.01 Allows you to have more than 2 Weapon Requirements for Skills.
 * @author Tyler Wright (wrigty12)
 *
 * @help 
 * ============================================================================
 * ■ Extra Weapon Requirements
 * ============================================================================
 *	To gain extra weapon requirements for a Skill, put one of the
 *	following tags in that Skill's Note Box:
 *	
 *	<requireEx: x>
 *	Where x is the weapon type ID.
 *
 *	<requireEx: x x x>
 *	Where x are weapon type IDs.
 *
 *  You can place as many ID's in the tag, as long as they are all integers and
 *  have spaces between them.
 *	
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Calls back to previous aliases of isSkillWtypeOk to accommodate any other plugins
 *   that may also alias it.
 * - Changed an unintended bug: Now you can have the requiredEx tag and list of ID's WITHOUT
 *   any listed weapons in the editor itself (Previously, at least 1 weapon had to be defined
 *   in the editor in order for the tag to actually be effective).
 *
 * Version 1.00:
 * - Initial Release
 *	
 */


(function() {

	var _Game_Actor_isSkillWtypeOk = Game_Actor.prototype.isSkillWtypeOk;
	Game_Actor.prototype.isSkillWtypeOk = function(skill) {
		//console.log(skill.name);
		var wtypeId1 = skill.requiredWtypeId1;
		var wtypeId2 = skill.requiredWtypeId2;
		var wtypeId3 = [];
		//console.log("Does it have it? " + skill.meta.requireEx);
		if (skill.meta.requireEx){
		//console.log("Has is");
		wtypeId3 = String(skill.meta.requireEx).split(" ");
		}
		//console.log(wtypeId3);
		//console.log(wtypeId3.length);
		var wtypeId3Check = false;
		for (i=0; i<wtypeId3.length; i++) { 
		//console.log(this.isWtypeEquipped(Number(wtypeId3[i])) + " " + wtypeId3[i]);
			if (this.isWtypeEquipped(Number(wtypeId3[i]))){
				wtypeId3Check = true;
			}
		}
		//console.log("Check: " + wtypeId3Check);
		if ((wtypeId1 === 0 && wtypeId2 === 0 && wtypeId3.length ===0) ||
				(wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
				(wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2)) ||
				(wtypeId3Check)) {
			return true;
		} else {
			//return false;
			_Game_Actor_isSkillWtypeOk.call(this, skill); //1.01 added
		}
	};
  
})();