var height = window.innerHeight;
var width = window.innerWidth;
var basicPanelWidth = 480;

var renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// draw main panel, (x, y, width, height)
var basicPanel = new PIXI.Graphics();
basicPanel.beginFill(0x646464, 0.6);
basicPanel.lineStyle(3, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2, -3, basicPanelWidth, height + 6);

var texture = PIXI.Texture.fromVideo('./beatmaps/26044 Wada Kouji - Butter-Fly (TV Edit)/Digimon Adventure OP.mp4');
var videoSprite = new PIXI.Sprite(texture);

videoSprite.width = renderer.width;
videoSprite.height = renderer.height;

stage.addChild(videoSprite);
stage.addChild(basicPanel);

// start animating
animate();

function animate() {

    requestAnimationFrame(animate);

    // render the root container
    renderer.render(stage);
}