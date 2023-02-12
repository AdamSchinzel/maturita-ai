import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, author } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Popiš detailně tyto body (minimálně 400 slov celkem) o knížce ${title} od ${author} (zobraz v HTML kódu a místo /n dávej <br>): Autor, Doba vydání, Literární druh, Literární žánr, Forma vyprávění, Téma a motiv, Tématicky podobná díla, Časoprostor, Kompoziční výstavba, Životopis autora, Další autoři z jeho země a stejné doby, Hlavní postavy a jejich charakteristika, Děj a obsah příběhu`,
        max_tokens: 2000,
        temperature: 0,
      }),
    });
    const data = await response.json();
    const bookDescription = data.choices[0].text;

    res.status(200).json({
      bookDescription,
    });
  } catch (err) {
    console.error(err);
  }
}
