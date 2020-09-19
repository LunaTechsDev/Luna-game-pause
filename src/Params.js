/*:
@author LunaTechs - Kino
@plugindesc This plugin allows you to open up a picture window Phoenix Wright style<LunaPicWindow>.

@target MV MZ

* @param x
* @text Window X Position
* @desc Picture window x position.
* @default 283
*
* @param y
* @text Window Y Position
* @desc Picture window y position.
* @default 150
*
* @param width
* @text Window Width
* @desc Picture window width.
* @default 250
*
* @param height
* @text Window Height
* @desc Picture window height.
* @default 250

@command showPicWindow
@text Show Picture Window
@desc Shows the picture window with the designated image file from your picture folder.
@arg fileName

@command showWindow
@text Show Picture Window
@text Show Window
@desc Shows the picture window without updating the image file.

@command closeWindow
@text Close Window
@desc Closes the picture window.


@help
This plugin allows you to have a press start button before the title screen information.

=====Script Calls=====

Shows the picture by name in the picture window.
LunaPictureWindow.showPic(imageName);

Shows the window without updating the picture.
LunaPictureWindow.show();


Hides the picture window by 
LunaPictureWindow.hide();

MIT License
Copyright (c) 2020 LunaTechsDev
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
*/




