import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog;
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
/**
 * House
 */
const house = new THREE.Group();
scene.add(house)
// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3,4,),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        roughnessMap: bricksRoughnessTexture,
        normalMap: bricksNormalTexture,
        aoMap: bricksAmbientOcclusionTexture,
    })
)
walls.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
house.add(walls)
walls.position.y = 1.5

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: 'red'})
)
roof.position.y = 3 + 0.5 ;
roof.rotation.y = Math.PI * 0.25
house.add(roof)
//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2,2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture
    })
)
door.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)

door.position.x = 2 + 0.01
door.position.y = 1
 door.rotation.y = Math.PI * .5

house.add(door)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        roughnessMap: grassRoughnessTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture
    })
)

floor.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

grassColorTexture.repeat.set(8 ,8)
grassNormalTexture.repeat.set(8 ,8)
grassRoughnessTexture.repeat.set(8 ,8)
grassAmbientOcclusionTexture.repeat.set(8 ,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping

floor.rotation.x = - Math.PI * 0.5

scene.add(floor)

//Bushes
const bushGeometry =  new THREE.SphereGeometry(0.25);
const bushMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
const bush = new THREE.Mesh(bushGeometry, bushMaterial);
bush.position.x = 2.5
bush.position.z = -1.8
scene.add(bush)


const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.x = 2.5
bush1.position.z = 1;
scene.add(bush1)


const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(2,2,2)
bush2.position.x = 2.5
bush2.position.z = 1.7;
scene.add(bush2)


const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(2,2,2)
bush3.position.x = 2.5
bush3.position.z = -1;
scene.add(bush3)


//Graves
const gravesGroup = new THREE.Group();
scene.add(gravesGroup);
const graveMaterial = new THREE.MeshStandardMaterial({ color: 'gray' });
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);


for(let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 5;
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x,0.4, z)
    grave.castShadow = true;
    grave.rotation.y = Math.PI / 2
    grave.rotation.z = (Math.random() - 0.5) * .2
    gravesGroup.add(grave)
}
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
// scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.2);
moonLight.s
const dirLightHelper = new THREE.DirectionalLightHelper(moonLight);
// scene.add(dirLightHelper);

moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

const doorLight = new THREE.PointLight('#ff7d46',1.5, 7);
const doorLightHelper = new THREE.PointLightHelper(doorLight);
doorLight.position.set(2.5, 2.5, 0)
house.add(doorLight)
// scene.add(doorLightHelper)

//Ghosts
const ghostsGroup = new THREE.Group();
scene.add(ghostsGroup)
const ghost1 = new THREE.PointLight('blue', 5 ,3);
const ghost2 = new THREE.PointLight('blue', 5 ,5);
ghostsGroup.add(ghost1, ghost2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;

walls.castShadow = true;
bush.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;

floor.receiveShadow = true;
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update Ghosts
    const ghostAngle = elapsedTime * 0.5;
    const ghostAngle2 = - elapsedTime * 0.32;
    ghost1.position.x = Math.cos(ghostAngle) * 3;
    ghost1.position.y = Math.sin(elapsedTime * 3)
    ghost1.position.z = Math.sin(ghostAngle) * 3;

    ghost2.position.x =  Math.cos(ghostAngle2) * (6 + Math.sin(elapsedTime * 0.32));
    ghost2.position.y =  Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2)
    ghost2.position.z =  Math.sin(ghostAngle2) * (6 + Math.cos(elapsedTime * 0.32));



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
