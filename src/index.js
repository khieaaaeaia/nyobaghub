export default {
    async fetch(request, env) {
        return new Response("WORKER IS ACTUALLY RUNNING", {
            status: 200,
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }
};
