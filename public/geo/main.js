document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("downloadBtn").addEventListener("click", () => {
        // Wierd way to trigger download in JS
        const link = document.createElement("a");

        link.href = "../assets/minderheiten_china.pptx";
        link.download = "minderheiten_china.pptx";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});