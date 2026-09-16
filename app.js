const form = document.getElementById("reportForm");
const status = document.getElementById("status");
const result = document.getElementById("result");

status.textContent = "System ready";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Submitting...";
    result.textContent = "";

    const data = {
        projectName:
            document.getElementById("projectName").value.trim(),

        description:
            document.getElementById("description").value.trim()
    };

    try {
        const response = await fetch("/api/report", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        const rawText = await response.text();

        console.log("HTTP status:", response.status);
        console.log("Response:", rawText);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${
                    rawText || "Empty response"
                }`
            );
        }

        if (!rawText.trim()) {
            throw new Error("Server returned an empty response.");
        }

        const responseData = JSON.parse(rawText);

        if (!responseData.success) {
            throw new Error(
                responseData.error || "Unknown server error"
            );
        }

        status.textContent = "Report submitted successfully";

        result.textContent =
            `Report ID: ${responseData.reportId}`;

        form.reset();

    } catch (error) {

        console.error(error);

        status.textContent = "Submission failed";
        result.textContent = error.message;
    }
});
