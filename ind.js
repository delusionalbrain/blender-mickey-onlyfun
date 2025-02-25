//check 123
console.log("hello");

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting 
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let model;

// Load GLTF Model
const loader = new THREE.GLTFLoader();
loader.load('plswork2.glb', function (gltf) {
    model = gltf.scene;
    console.log("Model Loaded:", model);
    
    model.position.set(0, 0, 0);
    model.scale.set(2, 2, 2);

    model.traverse((child) => {
        if (child.isMesh) {
            if (!child.material) {
                child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
            }
            child.material.needsUpdate = true;
        }
    });

    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    camera.position.set(center.x, center.y, box.max.z * 2);
    camera.lookAt(center);
    controls.target.copy(center);
});

//clicks
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (model) {
        const intersects = raycaster.intersectObject(model, true);
        if (intersects.length > 0) {
            const clickedPart = intersects[0].object;
            console.log("Clicked on:", clickedPart.name);
            handleClickOnModel(clickedPart.name);
        }
    }
});

// interesting things happen when clicked
function handleClickOnModel(partName) {
    switch (partName) {
        case "Cube":
            window.location.href = "https://open.spotify.com/playlist/08C88U4cZcLultMbqtDaKd?si=rKFh_q6ESoWXnL_Bv3oR-A&pi=EMX3oy5VQ0akS";
            break;
        case "Cube001":
            alert("meri minnie kaha gai dhundh do");
            break;
        case "Cube002":
            alert("im a barbie girl");
            break;
        case "Cube003":
            alert("tainu leke mai java");
            break;
        case "Cube004":
            alert("milke bhi hum milte nhi");
            break;
        case "Cube005":
            alert("jashn-e-baharaa");
            break;
        case "Cube006":
            window.location.href = "https://github.com/delusionalbrain";
            break;
        case "Cube007":
            document.getElementById("popup").style.display = "block";
            break;
        default:
            console.log("No action set for", partName);
    }
}

//animate 
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

//  resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none";
    } else {
        console.log("Popup element not found!");
    }
}

window.closePopup = closePopup;