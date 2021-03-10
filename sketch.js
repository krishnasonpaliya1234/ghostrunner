var tower, towerI;
var door, doorI, doorG;
var climber, climberI, climberG;
var ghost, ghostI;
var spooky;
var gameState = "play";
var invisibleblockG;

function preload() {
    towerI = loadImage("tower.png")
    doorI = loadImage("door.png")
    climberI = loadImage("climber.png")
    ghostI = loadImage("ghost-standing.png")
    spooky = loadSound("spooky.wav")
}
function setup() {
    createCanvas(600, 600);

    tower = createSprite(300, 300, 50, 50);
    tower.addImage(towerI);
    tower.velocityY = 1;

    ghost = createSprite(300, 300, 40, 40);
    ghost.addImage(ghostI);
    ghost.scale = 0.5;

    doorG = createGroup()
    climberG = createGroup()
    invisibleBlockG = createGroup()
}
function draw() {
background("black")

    //spooky.play()

    if (gameState === "play") {

        if (tower.y > 600) {
            tower.y = 300;
        }
        if (keyDown("left_arrow")) {
            ghost.x = -3;
        }
        if (keyDown("right_arrow")) {
            ghost.x = 3;
        }
        if (keyDown("space")) {
            ghost.velocityY = -2;
        }
        ghost.velocityY = ghost.velocityY + 0.3;


        spawnDoors()

        if (climberG.isTouching(ghost)) {
           //ghost.velocityY = 0;
        ghost.setVelocity(0,0)
        }
        if (invisibleBlockG.isTouching(ghost) || ghost.y > 600) {
            ghost.destroy()
            gameState = "end"
        }
        drawSprites();
    }
    if (gameState === "end") {
        fill("yellow")
        textSize(30)
        text("Game Over", 270, 300)
    }

    
}
function spawnDoors() {
    if (frameCount % 240 === 0) {
        door = createSprite(200, -50)
        door.x = Math.round(random(120, 400))


        climber = createSprite(200, 10);
        climber.x = door.x
        var invisibleBlock = createSprite(200, 15, climber.width, 2)
        invisibleBlock.x = door.x

        door.addImage(doorI)
        climber.addImage(climberI)
        door.velocityY = 1;
        climber.velocityY = 1;
        invisibleBlock.velocity = 1;

        ghost.depth = door.depth;
        ghost.depth += 1;

        door.lifetime = 800;
        climber.lifetime = 800;
        invisibleBlock.lifetime = 800;

        doorG.add(door)
        climberG.add(climber)
        invisibleBlockG.add(invisibleBlock)
    }
}
