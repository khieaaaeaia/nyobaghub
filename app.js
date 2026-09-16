const form = document.getElementById("reportForm");
const status = document.getElementById("status");
const result = document.getElementById("result");
const API_URL = "https://cobalapor.khirleynatasyahreyhandhika.workers.dev/api/report";


status.textContent = "System ready";


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    status.textContent = "Submitting...";
    result.textContent = "";

    const data = {
        projectName:
            document.getElementById("projectName").value,

        description:
            document.getElementById("description").value
    };


    try {
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Submitting...";
    result.textContent = "";

    const data = {
        projectName: document.getElementById("projectName").value,
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Read response as TEXT first
        const rawText = await response.text();

        console.log("HTTP status:", response.status);
        console.log("Response body:", rawText);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${rawText || "(empty response)"}`
            );
        }

        // Only try JSON parsing if there's actually something there
        if (!rawText.trim()) {
            throw new Error(
                "Server returned an empty response."
            );
        }

        const responseData = JSON.parse(rawText);

        if (!responseData.success) {
            throw new Error(
                responseData.error || "Unknown server error"
            );
        }

        status.textContent = "Report submitted";
        result.textContent =
            `Report ID: ${responseData.reportId}`;

        form.reset();

    } catch (error) {
        console.error(error);
        status.textContent = "Submission failed";
        result.textContent = error.message;
    }
}); } catch (error) {

        console.error(error);

        status.textContent = "Submission failed";

        result.textContent = error.message;
    }

});
