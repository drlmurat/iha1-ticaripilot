function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6HEePzEQvXj":
        Script1();
        break;
      case "5lKvvwcUgpL":
        Script2();
        break;
      case "67GJSm49fch":
        Script3();
        break;
      case "6ogRzKQOdg2":
        Script4();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  const target = object('5aH7fEjMjlw');
const duration = 750;
const easing = 'ease-out';
const id = '6lZmFfw0pko';
const growAmount = 0.2;
player.addForTriggers(
id,
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script2 = function()
{
  const target = object('5aH7fEjMjlw');
const duration = 750;
const easing = 'ease-out';
const id = '6lZmFfw0pko_reverse';
const growAmount = 0;
player.addForTriggers(
id,
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script3 = function()
{
  const target = object('6XG8BMWJ9rn');
const duration = 750;
const easing = 'ease-out';
const id = '6lZmFfw0pko';
const growAmount = 0.2;
player.addForTriggers(
id,
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script4 = function()
{
  const target = object('6XG8BMWJ9rn');
const duration = 750;
const easing = 'ease-out';
const id = '6lZmFfw0pko_reverse';
const growAmount = 0;
player.addForTriggers(
id,
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};
