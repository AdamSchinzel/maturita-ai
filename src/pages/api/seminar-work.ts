const generateSeminarWork = async ({ about, language, type }: any) => {
  try {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Napiš ${type} na téma ${about} v jazyce ${language} v rozsahu minimálně 300 slov (zobraz v HTML kódu a místo /n dávej <br>), text rozděl do odstavců a nahoru napiš tučným písmem téma práce. Na konci práce udelěj dva prádzné řádky a napiš co je typické pro tento slohý útvar`,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });
    const data = await response.json();

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req: any, res: any) {
  const { about, language, type } = req.body;

  const seminarWork = await generateSeminarWork({
    about,
    language,
    type,
  });

  res.status(200).json({
    seminarWork,
  });
}
