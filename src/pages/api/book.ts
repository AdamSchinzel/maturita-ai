const generateBookDescription = async ({ title, author }: any) => {
  try {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Popiš detailně tyto body (minimálně 400 slov celkem) o knížce ${title} od ${author} (zobraz v HTML kódu a místo /n dávej <br>): Autor, Doba vydání, Literární druh, Literární žánr, Forma vyprávění, Téma a motiv, Tématicky podobná díla, Časoprostor, Kompoziční výstavba, O autorovi a jeho životě, Další autoři z jeho země a stejné doby, Hlavní postavy a jejich charakteristika, Děj a obsah příběhu`,
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
  const { title, author } = req.body;

  const bookDescription = await generateBookDescription({
    title,
    author,
  });

  res.status(200).json({
    bookDescription,
  });
}
