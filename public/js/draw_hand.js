// Global Variables for THREE.JS
var container, camera, scene, renderer, stats;

// Global variable for leap
var frame, controller;

// Setting up how big we want the scene to be
var sceneSize = 100;

var leftHand, rightHand;


// Get everything set up
init();

// Start the frames rolling
animate();


function init() {

    controller = new Leap.Controller();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        sceneSize / 100,
        sceneSize * 4
    );

    // placing our camera position so it can see everything
    camera.position.z = sceneSize;

    // Getting the container in the right location
    container = document.createElement('div');

    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'absolute';
    container.style.top = '0px';
    container.style.left = '0px';
    container.style.background = '#000';
    container.style.filter = 'alpha(opacity=30)';
    container.style.opacity = '0.3';


    document.body.appendChild(container);


    // Getting the stats in the right position
    stats = new Stats();

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.right = '0px';
    stats.domElement.style.zIndex = '999';

    document.body.appendChild(stats.domElement);


    // Setting up our Renderer
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    // Making sure our renderer is always the right size
    window.addEventListener('resize', onWindowResize, false);



    leftHand = new ConnectedHand(controller);
    leftHand.addToScene(scene);

    rightHand = new ConnectedHand(controller);
    rightHand.addToScene(scene);


    var geo = new THREE.CubeGeometry(1, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
        color: 0xc0ffee,
        transparent: true,
        opacity: .5
    });
    var jointMesh = new THREE.Mesh(geo, mat);

    var connectionMesh = new THREE.Mesh(geo, mat);

    var centerMesh = new THREE.Mesh(geo, mat);
    centerMesh.scale.x = 10;
    centerMesh.scale.z = 10;

    leftHand.createFingers(jointMesh, connectionMesh);
    leftHand.createPalm(jointMesh, connectionMesh, centerMesh);


    controller.connect();


}


function animate() {

    // Tells us which hand to update with
    leftHand.update('left');
    rightHand.update('right');

    stats.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}

// Resets the renderer to be the proper size
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
