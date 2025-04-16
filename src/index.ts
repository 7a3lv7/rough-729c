export default {
  async fetch(request, env) {
    let inputs: AiTextToImageInput;
    if (request.method == "GET") {
      const url = new URL(request.url);
        let prompt = url.searchParams.get("prompt");

        if (!prompt) {
          prompt = "A cat."
        }

        inputs = { prompt };
    }else if (request.method === "POST") {
      // Handle POST: Parse JSON body
      inputs = await request.json() as AiTextToImageInput;
    }else{
      return new Response("this request is not support", { status: 405, headers: { Allow: "GET, POST" } });
    }
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
