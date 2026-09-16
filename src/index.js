export default {
    async fetch(request, env) {

        const url = new URL(request.url);

        // API endpoint
        if (url.pathname === "/api/report") {

            if (request.method !== "POST") {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "Method not allowed"
                    }),
                    {
                        status: 405,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }

            try {
                const body = await request.text();

                const response = await fetch(env.GAS_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body
                });

                const result = await response.text();

                return new Response(result, {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            } catch (error) {

                return new Response(
                    JSON.stringify({
                        success: false,
                        error: error.message
                    }),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }
        }

        // Everything else → static website
        return env.ASSETS.fetch(request);
    }
};
