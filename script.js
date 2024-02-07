window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Change Model';

    renderPlaces();
};

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;

function renderPlaces() {
    let scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', function () {
        let camera = document.querySelector('a-camera');
        placeModelInFront(camera, models[modelIndex]);
    });

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        modelIndex = (modelIndex + 1) % models.length;
        let camera = document.querySelector('a-camera');
        placeModelInFront(camera, models[modelIndex]);
    });
}

function placeModelInFront(camera, model) {
    let modelEntity = document.createElement('a-entity');
    modelEntity.setAttribute('gltf-model', model.url);
    modelEntity.setAttribute('scale', model.scale);
    modelEntity.setAttribute('rotation', model.rotation);
    modelEntity.setAttribute('position', '0 0 -3'); // Place 3 meters in front of the camera
    modelEntity.setAttribute('animation-mixer', '');

    const div = document.querySelector('.instructions');
    div.innerText = model.info;

    // Remove existing models to replace with the new model
    const existingModels = document.querySelectorAll('a-entity[gltf-model]');
    existingModels.forEach(m => m.parentNode.removeChild(m));

    camera.parentNode.appendChild(modelEntity);
}
