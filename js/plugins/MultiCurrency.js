//=============================================================================
//MultiCurrency.js
//=============================================================================
 
/*:
* @plugindesc Multi Currency
* @author Shiggy
*
* @param Gold-Silver Ratio
* @desc Ratio gold to silver
* @default 100

* @param Silver-Copper Ratio
* @desc Ratio silver to copper
* @default 100


* @param Icon gold
* @desc Ratio silver to copper
* @default 100

  @param Icon silver
* @desc Ratio silver to copper
* @default 101

* @param Icon copper
* @desc Ratio silver to copper
* @default 102

* @help 
* --------------------------------------------------------------------------------
* Terms of Use
* --------------------------------------------------------------------------------
* 
* --------------------------------------------------------------------------------
 
*/

(function() {

	var gsRatio = parseInt(PluginManager.parameters("MultiCurrency")['Gold-Silver Ratio']);
	var scRatio = parseInt(PluginManager.parameters("MultiCurrency")['Silver-Copper Ratio']);
	var goldIcon = parseInt(PluginManager.parameters("MultiCurrency")['Icon gold']);
	var silverIcon = parseInt(PluginManager.parameters("MultiCurrency")['Icon silver']);
	var copperIcon = parseInt(PluginManager.parameters("MultiCurrency")['Icon copper']);
		
	
	
	Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
		var positive_price = true;
		if (isNaN(value) == true) {
			console.log('NaN error')
			console.log(value)
		}
		if (value < 0) {
			positive_price = false;
			value *= -1;
		}
		var gold = Math.floor(value/(gsRatio*scRatio));
		var silver = Math.floor((value%(gsRatio*scRatio)) / scRatio);
		var copper = (value%gsRatio) % scRatio;
		if (positive_price == false) {
			gold *= -1;
			silver *= -1
			copper *= -1
		}
			
		var silWidth = this.textWidth(silver);
		var copWidth = this.textWidth(copper);
		
		this.drawText(gold, x, y, width - silWidth - copWidth - 3*Window_Base._iconWidth - 20, 'right');
		this.drawIcon(goldIcon,x + width - silWidth - copWidth - 3*Window_Base._iconWidth - 16,y );
		this.drawText(silver, x, y, width - copWidth - 2*Window_Base._iconWidth - 12, 'right');
		this.drawIcon(silverIcon,x + width - copWidth - 2*Window_Base._iconWidth - 8,y );
		this.drawText(copper, x, y, width - Window_Base._iconWidth - 4, 'right');
		this.drawIcon(copperIcon,x + width - Window_Base._iconWidth ,y );
	
	Window_ShopBuy.prototype.drawItem = function(index) {
		var item = this._data[index];
		var rect = this.itemRect(index);
		
		rect.width -= this.textPadding();
		this.changePaintOpacity(this.isEnabled(item));
		this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
		
		var value = parseInt(this.price(item))
		if (isNaN(value) == true) {
			console.log('NaN error')
			console.log(value)
		}
		var positive_price = true;
		if (value < 0) {
			positive_price = false;
			value *= -1;
		}
		var gold = Math.floor(value/(gsRatio*scRatio));
		var silver = Math.floor((value%(gsRatio*scRatio)) / scRatio);
		var copper = (value%gsRatio) % scRatio;
		if (positive_price == false) {
			gold *= -1;
			silver *= -1
			copper *= -1
		}
		var silWidth = this.textWidth(silver);
		var copWidth = this.textWidth(copper);
		var goldWidth = this.textWidth(gold);
		var priceWidth = goldWidth + silWidth + copWidth + 3*Window_Base._iconWidth + 20;
		var x = rect.x + rect.width - priceWidth
		
		this.drawText(gold, x, rect.y, priceWidth - silWidth - copWidth - 3*Window_Base._iconWidth - 20, 'right');
		this.drawIcon(goldIcon,x + priceWidth - silWidth - copWidth - 3*Window_Base._iconWidth - 16,rect.y );
		this.drawText(silver, x,rect.y, priceWidth - copWidth - 2*Window_Base._iconWidth - 12, 'right');
		this.drawIcon(silverIcon,x + priceWidth - copWidth - 2*Window_Base._iconWidth - 8,rect.y );
		this.drawText(copper, x, rect.y, priceWidth - Window_Base._iconWidth - 4, 'right');
		this.drawIcon(copperIcon,x + priceWidth - Window_Base._iconWidth ,rect.y );
		
		this.changePaintOpacity(true);
	};
	
	BattleManager.displayGold = function() {
    var value = this._rewards.gold;
    if (value > 0) {
	
		var gold = Math.floor(value/(gsRatio*scRatio));
		var silver = Math.floor((value%(gsRatio*scRatio)) / scRatio);
		var copper = (value%gsRatio) % scRatio;
		
        $gameMessage.add('\\.' + gold.toString() + " Gold  " + silver.toString() + " Silver  " + copper.toString() + " Copper");
    }
};
};


})();