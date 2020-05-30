//=============================================================================
// Maliki's Dual Weilding/Two-Handed Weapons
// MalDualWield.js
// version 1.7
//=============================================================================
/*:  
 * @plugindesc ver1.7 - Allows you to set weapons as twohanded, disallowing you from equipping weapons to the Off-hand.  
 * @author Maliki79
 * @param ShieldsArmor
 * @desc Type 1 to place Shield weapons in Menu Screens' Armor category. 
 * Default: 0
 * @default 0
 * 
 * @param OffhandAdjust
 * @desc Percentage of stats offhand weapons add to actors. (Make the number lower than 100 to lower stats and higher to raise)
 * Default: 100
 * @default 100
 * 
 * @param OffhandSlotName
 * @desc Name used for offhand weapon slot. 
 * Default: Off-Hand
 * @default Off-Hand
 *
 * @help You need two steps to use this plugin:
 * 1: Set your actor(s) up to have Dual-Wield in the Database. TRAITS => EQUIP => SLOT TYPE => DUAL WIELD
 * 2: Add the Notetag <twohand> to any two handed weapons in your Database.
 * 3: (Optional) For Shields, make them weapons in your database and add the tag <shld> to their notes
 * 4: (Optional) For one handed Actors you wish to equip shields that are considered weapons in the DB, tag <handnshld> 
 *    to the Actor's Class notes. (Those Actors still need to have the Dual Wield trait.)
 * 5: (Optional) An Actor's Class notes can be tagged with <monkeygrip> to allow two handed weapons to be dual wielded or allow a 2H weapon and shield.
 * 6: (Optional) You can tag any weapons with <OffhandAdjust: x> with x being a number. This will allow the specific weapon to use the given value instead of the default.
 */

var Mal = Mal || {}; 

Mal.Parameters = PluginManager.parameters('MalDualWield');
Mal.Param = Mal.Param || {};
 
var MalOnSlotOK = Scene_Equip.prototype.onItemOk
Scene_Equip.prototype.onItemOk = function() {
    console.log(this._itemWindow.item());
	if (this._slotWindow.index() === 0 && !(this._itemWindow.item()) && this._actor.equips()[1]) {
	SoundManager.playBuzzer();
	}else {
	SoundManager.playEquip();
    this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
	}
    this._slotWindow.activate();
    this._slotWindow.refresh();
    this._itemWindow.deselect();
    this._itemWindow.refresh();
    this._statusWindow.refresh();
};
 
var MalEquip = Window_EquipItem.prototype.includes
Window_EquipItem.prototype.includes = function(item) {
	if (item === null) {
        if (this._slotId === 0 && this._actor.equips()[1]){
		return; // false;
		} else {
		return true;
    }}	
	if (this._slotId === 0 && this._actor.equips()[1] && item.meta.twohand && !(this._actor.currentClass().meta.monkeygrip)) {
	return false;
	}
	if (this._slotId === 0 && item.meta.shld) {
	return false;
	}
	if (this._slotId === 1 && (this._actor.equips()[0]) && !(item.meta.shld) && this._actor.currentClass().meta.handnshld) {
	return false;
	}
	if (this._slotId === 1 && !(this._actor.equips()[0])) {
    return false;
	}
	if (this._slotId === 1 && (this._actor.equips()[0]) && this._actor.equips()[0].meta.twohand && !(this._actor.currentClass().meta.monkeygrip)) {
    return false;
	}
	if (this._slotId === 1 && item.meta.twohand && !(this._actor.currentClass().meta.monkeygrip)) {
    return false;
	}
    if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
        return false;
    }
	
    return this._actor.canEquip(item);
};

MalBestEquip = Game_Actor.prototype.bestEquipItem
Game_Actor.prototype.bestEquipItem = function(slotId) {
    var etypeId = this.equipSlots()[slotId];
    var items = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === etypeId && this.canEquip(item);
    }, this);
    var bestItem = null;
    var bestPerformance = -1000;
	console.log(this.actor());
    for (var i = 0; i < items.length; i++) {
        var performance = this.calcEquipItemPerformance(items[i]);
        if (performance > bestPerformance) {
	if (slotId === 0 && items[i].meta.shld) {
	continue;
	}
	if (slotId === 1 && (this.equips()[0]) && this.equips()[0].meta.twohand && !(this.currentClass().meta.monkeygrip)) {
    continue;
	}
	if (slotId === 1 && items[i].meta.twohand && !(this.currentClass().meta.monkeygrip)) {
    continue;
	}		
            bestPerformance = performance;
            bestItem = items[i];
        }
    }
    return bestItem;
};

var MalItemList = Window_ItemList.prototype.includes
Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
	    if (Mal.Parameters['ShieldsArmor'] == 1){
		return DataManager.isWeapon(item) && !item.meta.shld;
		} else{
		return DataManager.isWeapon(item);
		}
    case 'armor':
	if (Mal.Parameters['ShieldsArmor'] == 1){
        return DataManager.isArmor(item) || (item && item.meta.shld);
		} else {
		return DataManager.isArmor(item);
		}
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2 && !item.meta.sell;
	case 'sella':
		return DataManager.isItem(item) && item.itypeId === 1;
		//return DataManager.isItem(item) && item.meta.sell;
    default:
        return false;
    }
};

var MalSlotName = Window_EquipSlot.prototype.slotName
Window_EquipSlot.prototype.slotName = function(index) {
    var slots = this._actor.equipSlots();
	if (index === 1 && this._actor.isDualWield()) return this._actor ? Mal.Parameters['OffhandSlotName'] : '';
    return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
};

var MalDrawItem = Window_ItemList.prototype.drawItem
Window_ItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    } else {
		var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
		this.drawText('-UNEQUIP-', rect.x, rect.y, rect.width - numberWidth);
	}
};

var MalparamPlus = Game_Actor.prototype.paramPlus
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) {
			if (i == 1) {
			if (item.meta.OffhandAdjust) {
			value += (item.params[paramId] * item.meta.OffhandAdjust / 100) ;
			} else {
				value += (item.params[paramId] * Mal.Parameters['OffhandAdjust'] / 100) ;
				}} else {
				value += item.params[paramId];
				}
		}
    }
    return value;
};