function ExecuteScript(strId)
{
  switch (strId)
  {
      case "69JdjQwQyjR":
        Script1();
        break;
      case "5WwlGZO5iAC":
        Script2();
        break;
      case "6H2dNHhUmfP":
        Script3();
        break;
      case "6ROoIAY2hC5":
        Script4();
        break;
      case "6DvQ8IxUcrw":
        Script5();
        break;
      case "6mDcsjkHq3c":
        Script6();
        break;
      case "5wRAUfJ4Vfn":
        Script7();
        break;
      case "5qJ2Vq8BXNZ":
        Script8();
        break;
      case "6Ayz5aQIyhb":
        Script9();
        break;
      case "6XE1XlXxa0t":
        Script10();
        break;
      case "5bVjw94wFZ8":
        Script11();
        break;
      case "5dTnPngwrxD":
        Script12();
        break;
      case "5l1hiBwxhDV":
        Script13();
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
  const target = object('6emrFBPspZ7');
const duration = 750;
const easing = 'ease-out';
const id = '6M8Nn1DEuJg';
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
  const target = object('6emrFBPspZ7');
const duration = 750;
const easing = 'ease-out';
const id = '6M8Nn1DEuJg_reverse';
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
  player.once(() => {
const target = object('6emrFBPspZ7');
const duration = 10000;
const easing = 'ease-out';
const id = '6UdyZDWZDdO';
const pulseAmount = 0.07;
const delay = 0;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script4 = function()
{
  const target = object('5VrZ7lCparR');
const duration = 750;
const easing = 'ease-out';
const id = '6YXAKAqlACN';
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

window.Script5 = function()
{
  const target = object('5VrZ7lCparR');
const duration = 750;
const easing = 'ease-out';
const id = '6YXAKAqlACN_reverse';
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

window.Script6 = function()
{
  player.once(() => {
const target = object('5VrZ7lCparR');
const duration = 10000;
const easing = 'ease-out';
const id = '6PxCqX2wnEU';
const pulseAmount = 0.07;
const delay = 0;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script7 = function()
{
  const target = object('6iMJ1JYKAiP');
const duration = 750;
const easing = 'ease-out';
const id = '5jlWdFzPz8B';
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

window.Script8 = function()
{
  const target = object('6iMJ1JYKAiP');
const duration = 750;
const easing = 'ease-out';
const id = '5jlWdFzPz8B_reverse';
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

window.Script9 = function()
{
  player.once(() => {
const target = object('6iMJ1JYKAiP');
const duration = 10000;
const easing = 'ease-out';
const id = '5Uvvvs9we6u';
const pulseAmount = 0.07;
const delay = 0;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script10 = function()
{
  const target = object('5chczyPyWX1');
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

window.Script11 = function()
{
  const target = object('5chczyPyWX1');
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

window.Script12 = function()
{
  const target = object('5wtBD1xGM5l');
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

window.Script13 = function()
{
  const target = object('5wtBD1xGM5l');
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
