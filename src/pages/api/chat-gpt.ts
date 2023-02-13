import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt, max_tokens, temperature } = (await req.json()) as {
    prompt?: string;
    max_tokens: number;
    temperature: number;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
