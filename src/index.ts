export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("This request is not supported", { status: 405, headers: { Allow: "POST" } });
    }
    const inputs = await request.json() as AiTextToImageInput;
    if (!inputs.prompt) {
      return new Response("missing prompt", { status: 400 });
    }
    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
