// By default, RPG Maker MV simply returns 0 and pretends nothing wrong happened.
// We allow it to continue to return 0, but it should print out a stacktrace.

Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var value = Math.max(eval(item.damage.formula), 0) * sign;
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.log(e.stack)
        return 0;
    }
};