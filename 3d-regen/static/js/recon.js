// Viser embed: see https://github.com/viser-project/viser/issues/220
// The viser client + recordings must be served from the same origin as the page,
// and `playbackPath` must be an absolute URL. We build both from window.location
// so the page works both locally (python http.server) and on GitHub Pages.

const samples = [
    {
        img: "assets/image_grid/sink_4view_grid.png",
        recording: "assets/recordings/sink.viser",
        camera: "initialCameraPosition=-0.244,-0.305,-0.633&initialCameraLookAt=0.016,-0.027,0.006&initialCameraUp=0.024,-0.948,-0.318",
        mesh: "assets/image_to_3d/ours/3D_Dollhouse_Sink.glb"
    },
    {
        img: "assets/image_grid/baking_4view_grid.png",
        recording: "assets/recordings/baking.viser",
        camera: "initialCameraPosition=0.409,-0.591,0.267&initialCameraLookAt=0.070,-0.061,0.139&initialCameraUp=-0.000,-0.917,-0.400",
        mesh: "assets/image_to_3d/ours/BAKING_UTENSILS.glb"
    },
    {
        img: "assets/image_grid/rubbermaid_3view_grid.png",
        recording: "assets/recordings/rubbermaid.viser",
        camera: "initialCameraPosition=-0.490,-0.541,0.181&initialCameraLookAt=-0.065,-0.016,0.092&initialCameraUp=-0.000,-0.950,-0.314",
        mesh: "assets/image_to_3d/ours/Rubbermaid_Large_Drainer.glb"
    },
    {
        img: "assets/image_grid/creative_2view_grid.png",
        recording: "assets/recordings/creative_2view.viser",
        camera: "initialCameraPosition=0.234,-0.727,0.107&initialCameraLookAt=0.000,0.000,0.000&initialCameraUp=-0.000,-0.831,-0.557",
        mesh: "assets/image_to_3d/mesh_from_2view/CREATIVE_BLOCKS_35_MM.glb"
    },
    {
        img: "assets/image_grid/alligator_2view_grid.png",
        recording: "assets/recordings/alligator_2view.viser",
        camera: "initialCameraPosition=0.529,-0.237,-0.197&initialCameraLookAt=-0.033,0.074,0.020&initialCameraUp=-0.066,-0.931,-0.359",
        mesh: "assets/image_to_3d/mesh_from_2view/DANCING_ALLIGATOR_zoWBjc0jbTs.glb"
    },
    {
        img: "assets/image_grid/castle_2view_grid.png",
        recording: "assets/recordings/castle_2view.viser",
        camera: "initialCameraPosition=-0.142,-0.305,0.718&initialCameraLookAt=-0.055,0.046,0.139&initialCameraUp=0.007,-0.974,0.228",
        mesh: "assets/image_to_3d/mesh_from_2view/CASTLE_BLOCKS.glb"
    },
];

function buildViserUrl(sample) {
    const base = new URL("./", window.location.href).href;
    const playbackPath = base + sample.recording;
    const clientPath = base + "assets/viser-client/";
    return `${clientPath}?playbackPath=${playbackPath}&${sample.camera}`;
}

let currentIndex = 0;

function buildCarousel() {
    const carousel = document.getElementById("carousel");
    samples.forEach((sample, idx) => {
        const imgEl = document.createElement("img");
        imgEl.src = sample.img;
        imgEl.id = `thumb-${idx}`;
        imgEl.onclick = () => updateViewers(idx);
        carousel.appendChild(imgEl);
    });
}

function updateActiveThumbnail(index) {
    samples.forEach((_, i) => {
        document.getElementById(`thumb-${i}`).classList.remove("active");
    });
    document.getElementById(`thumb-${index}`).classList.add("active");
}

function updateViewers(index) {
    currentIndex = index;
    updateActiveThumbnail(index);

    document.getElementById("viserFrame").src = buildViserUrl(samples[index]);
    document.getElementById("meshViewer").src = samples[index].mesh;
}

document.addEventListener("DOMContentLoaded", () => {
    buildCarousel();
    updateViewers(0);
});
