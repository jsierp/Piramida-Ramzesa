var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.offsetWidth;
var h = canvas.offsetHeight;
var cells = 20;
var cellPx = h/20;

var centerX = w/2;
var centerY = h/2;
var leftEdge;
var topEdge;
var levelSize;
var heroX;
var heroY;

var heroId = 1;
var boxId = 2;
var wallId = 3;
var treasureId = 4;
var emptyId = 0;

var keyLeft = 37;
var keyRight = 39;
var keyUp = 38;
var keyDown = 40;

var won = false;

var levelArray;

function init() {
    levelArray = level3;
    levelSize = levelArray.length;
    leftEdge = centerX - levelSize/2*cellPx;
    topEdge = centerY - levelSize/2*cellPx;
    for (var y = 0; y < levelArray.length; y++) {
        for (var x = 0; x < levelArray.length; x++) {
            if(levelArray[y][x]==1) {
                heroX=x;
                heroY=y;
            }
        }
    }
    paint();
}

function paintBox(x, y) {
    ctx.fillStyle = "brown";
    ctx.fillRect(leftEdge+x*cellPx, topEdge+y*cellPx, cellPx, cellPx);
    ctx.strokeRect(leftEdge+x*cellPx, topEdge+y*cellPx, cellPx, cellPx);
}

function paintWall(x, y) {
    ctx.fillStyle = "grey";
    ctx.fillRect(leftEdge+x*cellPx, topEdge+y*cellPx, cellPx, cellPx);
    ctx.strokeRect(leftEdge+x*cellPx, topEdge+y*cellPx, cellPx, cellPx);
}

function paintMap() {
    for (var y = 0; y < levelArray.length; y++) {
        for (var x = 0; x < levelArray.length; x++) {
            switch(levelArray[y][x]) {
                case 1 : paintHero(x, y); break;
                case 2 : paintBox(x, y); break;
                case 3 : paintWall(x, y); break;
                case 4 : paintTreasure(x, y); break;
                default : break;
            }
        }
    }
    if(won) {
        alert("Zwycięstwo!");
        won=false;
    }
}

function paintHero(x, y) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(leftEdge+x*cellPx+cellPx/2,topEdge+y*cellPx+cellPx/2,cellPx/2-2,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

function paintTreasure(x, y) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(leftEdge+x*cellPx+cellPx/2,topEdge+y*cellPx+cellPx/2,cellPx/2-2,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

function paint() {
    ctx.fillStyle = "gold";
    ctx.fillRect(0, 0, w, h);
    paintMap();
}

function onMap(x, y) {
    return x>=0 && x<levelSize && y>=0 && y<levelSize;
}

document.addEventListener('keydown', function(e){
    var key = e.which;

    var nHeroX=heroX;
    var dHeroX=heroX;
    var nHeroY=heroY;
    var dHeroY=heroY;

    switch(key) {
        case keyUp: nHeroY--; dHeroY-=2; break;
        case keyDown: nHeroY++; dHeroY+=2; break;
        case keyLeft: nHeroX--; dHeroX-=2; break;
        case keyRight: nHeroX++; dHeroX+=2; break;
    }

    if(onMap(nHeroX, nHeroY) && levelArray[nHeroY][nHeroX] != wallId) {
        if(levelArray[nHeroY][nHeroX]==emptyId) {
            levelArray[heroY][heroX]=emptyId;
            heroX=nHeroX;
            heroY=nHeroY;
            levelArray[heroY][heroX]=heroId;
        } else if(levelArray[nHeroY][nHeroX]== treasureId) {
            levelArray[heroY][heroX]=emptyId;
            heroX=nHeroX;
            heroY=nHeroY;
            levelArray[heroY][heroX]=heroId;
            won = true;
        } else if(onMap(dHeroX, dHeroY) &&
                levelArray[nHeroY][nHeroX]==boxId &&
                levelArray[dHeroY][dHeroX]==emptyId) {
            levelArray[heroY][heroX]=emptyId;
            heroX=nHeroX;
            heroY=nHeroY;
            levelArray[heroY][heroX]=heroId;
            levelArray[dHeroY][dHeroX]=boxId;
        }
    }
    paint();
});

var level1 = [
    [ 3, 3, 3, 3, 3, 3 ],
    [ 3, 1, 2, 0, 2, 3 ],
    [ 3, 2, 2, 0, 2, 3 ],
    [ 3, 0, 2, 0, 0, 3 ],
    [ 3, 0, 0, 2, 4, 3 ],
    [ 3, 3, 3, 3, 3, 3 ],
];

var level2 = [
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
    [ 3, 1, 2, 4, 0, 2, 2, 0, 2, 3 ],
    [ 3, 0, 2, 0, 2, 0, 2, 0, 2, 3 ],
    [ 3, 2, 2, 2, 0, 2, 0, 2, 0, 3 ],
    [ 3, 0, 2, 0, 2, 2, 2, 0, 0, 3 ],
    [ 3, 0, 2, 0, 2, 2, 0, 2, 2, 3 ],
    [ 3, 2, 0, 2, 0, 0, 2, 0, 0, 3 ],
    [ 3, 0, 0, 0, 2, 2, 2, 2, 0, 3 ],
    [ 3, 0, 0, 2, 0, 0, 0, 0, 0, 3 ],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
];

var level3 = [
    [ 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3 ],
    [ 3, 0, 1, 0, 3, 0, 0, 0, 3, 0, 4, 0, 3 ],
    [ 3, 0, 2, 0, 3, 0, 0, 0, 3, 0, 0, 2, 3 ],
    [ 3, 2, 0, 0, 3, 0, 0, 0, 3, 0, 2, 0, 3 ],
    [ 3, 0, 2, 2, 3, 0, 0, 0, 3, 0, 2, 0, 3 ],
    [ 3, 2, 0, 0, 3, 0, 0, 0, 3, 2, 2, 0, 3 ],
    [ 3, 0, 2, 2, 3, 0, 0, 0, 3, 2, 2, 0, 3 ],
    [ 3, 0, 0, 2, 3, 0, 0, 0, 3, 0, 0, 2, 3 ],
    [ 3, 0, 2, 0, 3, 0, 0, 0, 3, 0, 2, 0, 3 ],
    [ 3, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 0, 3 ],
    [ 3, 0, 2, 0, 0, 2, 2, 0, 2, 0, 2, 2, 3 ],
    [ 3, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 3 ],
    [ 3, 2, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0, 3 ],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
];

init();
