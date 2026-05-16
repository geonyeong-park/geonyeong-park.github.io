const samples = [
    {
        img: "assets/image_grid/sink_grid.png",
        viser: "http://localhost:8080/assets/viser-client/?playbackPath=http://localhost:8080/assets/recordings/sink.viser&initialCameraPosition=-0.244,-0.305,-0.633&initialCameraLookAt=0.016,-0.027,0.006&initialCameraUp=0.024,-0.948,-0.318",
        mesh: "assets/image_to_3d/ours/3D_Dollhouse_Sink.glb",
        left: ["assets/image_grid/sink_1.png","assets/image_grid/sink_2.png"]
    },
    {
        img: "assets/image_grid/baking_grid.png",
        viser: "http://localhost:8080/assets/viser-client/?playbackPath=http://localhost:8080/assets/recordings/baking.viser&initialCameraPosition=0.409,-0.591,0.267&initialCameraLookAt=0.070,-0.061,0.139&initialCameraUp=-0.000,-0.917,-0.400",
        mesh: "assets/image_to_3d/ours/BAKING_UTENSILS.glb",
        left: ["assets/image_grid/baking_1.png","assets/image_grid/baking_2.png"]
    }
];

let currentIndex = 0;

function buildCarousel() {
    const carousel = document.getElementById("carousel");
    const leftCol = document.getElementById("leftColumn");

    samples.forEach((sample, idx) => {
        // Carousel images
        const imgEl = document.createElement("img");
        imgEl.src = sample.img;
        imgEl.id = `thumb-${idx}`;
        imgEl.onclick = () => updateViewers(idx);
        carousel.appendChild(imgEl);

        // Left column images
        const leftImgs = sample.left.map(src => {
            const i = document.createElement("img");
            i.src = src;
            return i;
        });
        leftCol.appendChild(document.createElement("div")).append(...leftImgs);
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

    document.getElementById("viserFrame").src = samples[index].viser;
    document.getElementById("meshViewer").src = samples[index].mesh;

    // Update left column images
    const leftCol = document.getElementById("leftColumn");
    leftCol.innerHTML = "";
    samples[index].left.forEach(src => {
        const imgEl = document.createElement("img");
        imgEl.src = src;
        leftCol.appendChild(imgEl);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    buildCarousel();
    updateViewers(0);
});