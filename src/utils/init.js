
const Scene = () => new THREE.Scene();
const camera = () => new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = () => new THREE.WebGLRenderer({alpha:false});

export default function createWaveAssets(width = 400, height = 400) {
    const SceneInstance = Scene();
    const cameraInstance = camera();
    const rendererInstance = renderer();
    rendererInstance.setSize(width, height);
    return {
        Scene: SceneInstance,
        camera: cameraInstance,
        renderer: rendererInstance,
    };
}