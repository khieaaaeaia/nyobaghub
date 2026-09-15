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
            document.getElementById("projectName").value,

        description:
            document.getElementById("description").value
    };


    try {

        const response = await fetch("/api/report", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        const responseData = await response.json();


        if (!responseData.success) {
            throw new Error(
                responseData.error || "Unknown error"
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

});
