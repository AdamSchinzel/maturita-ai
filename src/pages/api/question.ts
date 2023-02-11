const generateQuestionDescription = async ({ question }: any) => {
  try {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Sepiš mi v těchto bodech (minimálně 400 slov) maturitní otázku na téma ${question} (zobraz v HTML kódu a místo /n dávej <br> a všechny odkazy se budou otevírat v novém okně): Úvod do otázky, Obsah rozepiš obsáhle a do detailu, Odkazy na zajímavé a relavantní zdroje na internetu s českým obsahem, Závěr. Všechny odborné pojmy v textu přitom vysvětli.`,
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
  const { question } = req.body;

  const questionDescription = await generateQuestionDescription({
    question,
  });

  res.status(200).json({
    questionDescription,
  });
}
