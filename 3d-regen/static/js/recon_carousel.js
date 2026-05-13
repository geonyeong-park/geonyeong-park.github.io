// recon.js

const samples = [
    {
        img: "assets/image_grid/sink_grid.png",
        viser: "http://localhost:8080/assets/viser-client/?playbackPath=http://localhost:8080/assets/recordings/sink.viser&initialCameraPosition=-0.244,-0.305,-0.633&initialCameraLookAt=0.016,-0.027,0.006&initialCameraUp=0.024,-0.948,-0.318",
        mesh: "assets/image_to_3d/ours/3D_Dollhouse_Sink.glb",
        sideImages: [
            "assets/image_grid/sink_side1.png",
            "assets/image_grid/sink_side2.png"
        ]
    },
    {
        img: "assets/image_grid/baking_grid.png",
        viser: "http://localhost:8080/assets/viser-client/?playbackPath=http://localhost:8080/assets/recordings/baking.viser&initialCameraPosition=0.409,-0.591,0.267&initialCameraLookAt=0.070,-0.061,0.139&initialCameraUp=-0.000,-0.917,-0.400",
        mesh: "assets/image_to_3d/ours/BAKING_UTENSILS.glb",
        sideImages: [
            "assets/image_grid/baking_side1.png",
            "assets/image_grid/baking_side2.png"
        ]
    },
    {
        img: "assets/image_grid/rubbermaid_grid.png",
        viser: "http://localhost:8080/assets/viser-client/?playbackPath=http://localhost:8080/assets/recordings/rubbermaid.viser&initialCameraPosition=-0.490,-0.541,0.181&initialCameraLookAt=-0.065,-0.016,0.092&initialCameraUp=-0.000,-0.950,-0.314",
        mesh: "assets/image_to_3d/ours/Rubbermaid_Large_Drainer.glb",
        sideImages: [
            "assets/image_grid/rubbermaid_side1.png",
            "assets/image_grid/rubbermaid_side2.png"
        ]
    }
    // add more samples as needed
];

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

function updateSideImages(index) {
    const side1 = document.getElementById("sideImage1");
    const side2 = document.getElementById("sideImage2");
    side1.src = samples[index].sideImages[0];
    side2.src = samples[index].sideImages[1];
}

function updateViewers(index) {
    currentIndex = index;
    updateActiveThumbnail(index);

    document.getElementById("viserFrame").src = samples[index].viser;
    document.getElementById("meshViewer").src = samples[index].mesh;
    updateSideImages(index);
}

document.addEventListener("DOMContentLoaded", () => {
    buildCarousel();
    updateViewers(0);
});
