/*:
@plugindesc |V1.0.0.0| This allows you to customize items a little more by allowing
you to customize the hue of the items icon
@author Mutation Engine (MuteDay)
@help
------------------------------------------------------------------------
youtube Video
------------------------------------------------------------------------
-NONE-

========================================================================
Important
========================================================================
Always check the Website Changelog mutationengine.altervista.org/changelog.html 
For updates

========================================================================
Info
========================================================================
This allows you to customize items a little more by allowing
you to customize the hue of the items icon

========================================================================
Required Plugins
========================================================================
----------------------
Layout
----------------------
Plugin Name +Link
Reason it is Required
----------------------
MUE_GraphicsAdvanced: 
with IconFix enabled WIthout it this plugin will not work

MUE_MainCore:
Notetag Reading event

========================================================================
Optinal Plugins
========================================================================
----------------------
Layout
----------------------
Plugin Name +Link
Features added
----------------------

========================================================================
Plugin Params
========================================================================
----------------------
Layout
----------------------
Param Name
Default
Description
Note ID
----------------------

------------------------------------------------------------------------
Plugin Param Notes
------------------------------------------------------------------------

========================================================================
Updates History
========================================================================
1.0.0.0:
Initial Release

========================================================================
Note Tag Data
========================================================================
Items/armor/weapons/skills
IconHue: value
replace value with the new hue you wish to use

------------------------------------------------------------------------
NoteTag Data Notes
------------------------------------------------------------------------
When using the note tags always surround with a opening < bracket
then the note tag
then the closing >

========================================================================
Plugin Commands
========================================================================
----------------------
Layout
----------------------
Plugin Command
Variables will be surrounded
By | |'s replace the all 
|+variable+| with your varaible
----------------------

========================================================================
Script Calls
========================================================================
----------------------
Layout
----------------------
Script Call
Variables will be surrounded
By | |'s replace the all 
|+variable+| with your varaible
----------------------

========================================================================
Extra Data
========================================================================

========================================================================
ScreenShots
========================================================================

========================================================================
Important Links and Notes
========================================================================
Patreon: https://www.patreon.com/MutationIndustries?ty=h

Notes: If you like any of the mutation engine plugins
consider supporting me, your support will allow me to
 build you more of what you want

========================================================================
Credits and Inportant info
========================================================================
Credits:
Myself
The rpg maker team for creating mv


Info:
Feel free to use this for any type of project some limits apply
1) Do not claim the work as your own
2) Do not post anywhere without my constent
3) Do not Make edits and then post anywhere
========================================================================
*/

//#region import and namespace
var Imported=Imported||{};
var MUE=MUE||{};
MUE.IconHue=MUE.IconHue||{};
Imported.MUE_ItemIconHue=true;
//#endregion

(function($) {
    //#region variables
    var para=PluginManager.parameters('MUE_ItemIconHue');
    //#endregion

    //#region MenuBase
    Window_Base.prototype.drawItemName=function(item,x,y,width) {
        width=width||312;
        if(item) {
            var iconBoxWidth=Window_Base._iconWidth+4;
            this.resetTextColor();
            if(!item._hue)
                this.drawIcon(item.iconIndex,x+2,y+2,0);
            else {
                this.drawIcon(item.iconIndex,x+2,y+2,item._hue);
            }
            this.drawText(item.name,x+iconBoxWidth,y,width-iconBoxWidth);
        }
    };
        //#endregion
    //#region notesProccessing
    var MUE_OLD_Notes=MUE.onDatabaseFinishedLoading;
    MUE.onDatabaseFinishedLoading=function() {
        MUE_OLD_Notes.call(this);
        processNotes($dataItems);
        processNotes($dataSkills);
        processNotes($dataWeapons);
        processNotes($dataArmors);
    }
    processNotes=function(group) {
        for(var x=1;x<group.length;x++) {
            var item=group[x];
            if(!item) continue;
            item._hue=Number(item.meta.IconHue||0);
        }
    };
    //#endregion
})(MUE.IconHue)