/*:
@plugindesc |V1.2.0.0| This gives special features to the game by allowing things to do special things
@author MutationIndustries(MuteDay)
@param --Debug Features--
*/

var Imported=Imported||{};
Imported.MUE_MainCore=true;
var MUE=MUE||{};
(function($){
    DataManager.isDatabaseLoaded=function() {
        this.checkError();
        for(var i=0;i<this._databaseFiles.length;i++) {
            if(!window[this._databaseFiles[i].name]) {
                return false;
            }
        }
        $.onDatabaseFinishedLoading();
        return true;
    };

    $.onDatabaseFinishedLoading=function(){
    
    };
})(MUE)