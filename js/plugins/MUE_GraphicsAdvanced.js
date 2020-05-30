/*:
@plugindesc |V1.5.1.0| This allows for editing most of the graphics based things that applies to windows
@author MutationIndustries(MuteDay)

@param Use Window Tone
@desc Setting this to false allows you to completely turn off
the window's tones (Default true)
@default true

@param Default Window Skin
@desc Setting this allows you to load the custom window
skin from your img/system folder(default Window)
@default Window

@param Default Line Height
@desc Setting this Allows you to Customize the height of
each line(default 36)
@default 36

@param Default Font Size
@desc Allows you to customize the font size you wish to
use(Default 28)
@default 28

@param Default Padding
@desc Allows you to customize the Padding between the edge of
window and the first text you see (default 18)
@default 18

@param Default Text Padding
@desc Allows you to customize the default Padding between the 
text and the top of the window and bottom(default 6)
@default 6

@param Default Opac
@desc Allows to set how seethrough whole window is (default -1)
@default -1

@param Default Back Opac
@desc Allows to to set how see through the window is(default 192)
@default 192

@param Use Icon to Font Size
@desc makes it so when you draw an icon it is auto resized to the
size of the font (default true)
@default true

@param Use Face to Content Height
@desc Makes it so when the face image is larger then the current
content Height it is resized
@default true

@help
------------------------------------------------------------------------
youtube Video
------------------------------------------------------------------------

========================================================================
Important
========================================================================
Always check the Website Changelog mutationengine.altervista.org/changelog.html 
For updates

========================================================================
Info
========================================================================
This allows for editing most of the graphics based things that applies 
to windows

========================================================================
Required Plugins
========================================================================
----------------------
Layout
----------------------
Plugin Name +Link
Reason it is Required
----------------------
-NONE-

========================================================================
Optinal Plugins
========================================================================
----------------------
Layout
----------------------
Plugin Name +Link
Features added
----------------------
MUE_OptionsEnhanced
Allows for more customization of options

MUE_TitleEnhanced
Allows for More Customization of Title screen

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

Use Window Tone
true
Setting this to false allows you to completely turn off the window's tones
-

Default Window Skin
Window
Setting this allows you to load the custom window skin from your 
img/system folder
-

Default Line Height
36
Setting this Allows you to Customize the height of each line
-

Default Font Size
28
Allows you to customize the font size you wish to use
-

Default Padding
18
Allows you to customize the Padding between the edge of window and 
the first text you see
-

Default Text Padding
6
Allows you to customize the default Padding between the text and 
the top of the window and bottom
-

Default Opac
-1
Allows to set how seethrough whole window is
-

Default Back Opac
192
Allows to to set how see through the window is
-

Use Icon to Font Size
true
makes it so when you draw an icon it is auto resized to the size of 
the font
2

Use Face to Content Height
true
Makes it so when the face image is larger then the current content 
Height it is resized
3
------------------------------------------------------------------------
Plugin Param Notes
------------------------------------------------------------------------
1:
-1 to use default

2:
this is only needed if you want the icons to be same size as the font

3:
This makes it so the face images are not squished if you change
the line height

========================================================================
Updates History
========================================================================
1.0:
Initial Release

V1.1.0.0:
Removed Yanfly Check
Fixed a bug with Text showing grey when using non default skin

V1.2.0.0:
-Normalized files

V1.3.0.0:
-Added feature for fixing bug with face graphics
-Security update for browser games

V1.4.0.0
-Added features for upcoming New Plugins

V1.5.0.0
-Added features for another new plugin

V1.5.1.0
-fixed feature for use with another plugin

========================================================================
Note Tag Data
========================================================================
-NONE-

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
-NONE-

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
-NONE-

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
var Imported=Imported||{};
var MUE=MUE||{};
MUE.GraphicsEX=MUE.GraphicsEX||{};
Imported.MUE_GraphicsEX=true;
(function($) {
    //============================================================================================
    //Variables
    //============================================================================================
    var param=PluginManager.parameters('MUE_GraphicsAdvanced');
    var UseTone=eval(param['Use Window Tone']||"true");
    var WinSkin=String(param['Default Window Skin']||"Window");
    var LineHight=Number(param['Default Line Height']||"36");
    var FontSize=Number(param['Default Font Size']||"28");
    var Padding=Number(param['Default Padding']||"18");
    var TextPad=Number(param['Default Text Padding']||"6");
    var BackOpac=Number(param['Default Back Opac']||"192");
    var Opac=Number(param['Default Opac']||-1);
    var UseIconFix=eval(param['Use Icon to Font Size']||"true");
    var UseFaceFix=eval(param['Use Face to Content Height']||"true");
    param=null;
    //============================================================================================
    //Window_Base Overrides
    //============================================================================================
    Window_Base.prototype.updateTone=function() {
        if(UseTone) {
            var tone=$gameSystem.windowTone();
            this.setTone(tone[0],tone[1],tone[2]);
        }
        if(this instanceof Window_TitleCommand) {
            this.refresh();
        }
    };

    Window_Base.prototype.lineHeight=function() {
        return LineHight;
    };
    Window_Base.prototype.standardFontSize=function() {
        return FontSize;
    };

    Window_Base.prototype.standardPadding=function() {
        return Padding;
    };

    Window_Base.prototype.textPadding=function() {
        return TextPad;
    };

    Window_Base.prototype.standardBackOpacity=function() {
        if(Opac>-1)
            this.opacity=Opac;
        return BackOpac;
    };
    Window_Base.prototype.loadWindowskin=function() {
        this.windowskin=ImageManager.loadSystem(WinSkin);
    };
    if(UseIconFix) {
        Window_Base.prototype.processDrawIcon=function(iconIndex,textState,hue) {
            var size=this.standardFontSize();
            this.drawIcon(iconIndex,textState.x+(size/4)-1,textState.y+(size/4)-1,hue);
            textState.x+=size+((size/4)*2)-2;
        };
        Window_Base.prototype.drawIcon=function(iconIndex,x,y,hue) {
            var size=this.standardFontSize();
            var bitmap=ImageManager.loadSystem('IconSet');
            var pw=Window_Base._iconWidth;
            var ph=Window_Base._iconHeight;
            var sx=iconIndex%16*pw;
            var sy=Math.floor(iconIndex/16)*ph;
            this.contents.blt(bitmap,sx,sy,pw,ph,x,y,size,size);
            if (hue)
                this.contents.rotateHue(hue);
        };
    }
    if(UseFaceFix) {
        Window_Base.prototype.drawFace=function(faceName,faceIndex,x,y,width,height,hue,offset) {
            width=width||Window_Base._faceWidth;
            height=height||Window_Base._faceHeight;
            var offset=offset||0;
            if(height>this.contentsHeight()||width>this.contentsWidth()) {
                if(this.contentsHeight()<this.contentsWidth()) {
                    offset=this.contentsHeight();
                }
                else if(this.contentsHeight()>this.contentsWidth()) {
                    offset=this.contentsWidth();
                }
            }
            var bitmap=ImageManager.loadFace(faceName,hue);
            var pw=Window_Base._faceWidth;
            var ph=Window_Base._faceHeight;
            var sw=Math.min(width,pw);
            var sh=Math.min(height,ph);
            var dx=Math.floor(x+Math.max(width-pw,0)/2);
            var dy=Math.floor(y+Math.max(height-ph,0)/2);
            var sx=faceIndex%4*pw+(pw-sw)/2;
            var sy=Math.floor(faceIndex/4)*ph+(ph-sh)/2;
            if(offset>0) {
                this.contents.blt(bitmap,sx,sy,sw,sh,dx,dy,offset,offset);
            }
            else
                this.contents.blt(bitmap,sx,sy,sw,sh,dx,dy);
        };
        Window_Message.prototype.newLineX=function() {
            return $gameMessage.faceName()===''?0:this.contentsHeight()+5;
        };
    }
    $.CalcTextOffset=function(text,window) {
        if((/I\[\d+\]/g.test(text))) {
            if(UseIconFix) {
                return window.standardFontSize();
            }
            else
                return Window_Base._iconWidth;
        }
        return 0;
    };
})(MUE.GraphicsEX)