import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({

  canvas: document.querySelector( '#bg' )

});

renderer.setPixelRatio( window.devicePixelRatio );

renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ( 30 );
camera.position.setX( -3 );

renderer.render( scene, camera );

const tylerTexture = new THREE.TextureLoader().load('https://i.imgur.com/pdP41R6.jpg');

const geometry =  new THREE.TorusGeometry( 10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial( { map: tylerTexture } );

const torus = new THREE.Mesh( geometry, material );

scene.add( torus )


const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 5, 5, 5 );

const ambientLight = new THREE.AmbientLight( 0xffffff );

scene.add( pointLight, ambientLight );


function addStarYellow() {

  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffd729 } );
  const star = new THREE.Mesh( geometry, material );

  const [ x, y, z ] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 200 ) );

  star.position.set( x, y, z );

  scene.add( star )

}

Array( 333 ).fill().forEach( addStarYellow );

function addStarWhite() {

  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial( { color: 0xfafdeb } );
  const star = new THREE.Mesh( geometry, material );

  const [ x, y, z ] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 200 ) );

  star.position.set( x, y, z );

  scene.add( star )

}

Array( 333 ).fill().forEach( addStarWhite );


const spaceTexture = new THREE.TextureLoader().load( 'Space.jpeg' );
scene.background = spaceTexture;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.00666;
  torus.rotation.y += 0.000666;
  torus.rotation.z += 0.00666;

  renderer.render( scene, camera );
}

animate();