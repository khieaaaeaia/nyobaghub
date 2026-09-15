export async function onRequestPost(context) {

    const body = await context.request.text();

    const GAS_URL = context.env.GAS_URL;

    const response = await fetch(GAS_URL, {
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
}
