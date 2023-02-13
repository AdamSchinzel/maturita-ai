import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

const Home = () => {
  const [title, setTitle] = useState<string>("");
  const [autor, setAutor] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [type, setType] = useState<string>("");

  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);
  const [loadingSeminarWork, setLoadingSeminarWork] = useState<boolean>(false);

  const [bookDescription, setbookDescription] = useState<string>("");
  const [questionDescription, setQuestionDescription] = useState<string>("");
  const [seminarWork, setSeminarWork] = useState<string>("");

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const bookPrompt = `Popiš detailně tyto body o knize ${title} od ${autor} (zobraz v HTML kódu a místo /n dávej <br>, všechny názvy knih piš česky, začátek každého bodu napiš tučným písmem, na konec dej dvakrát za sebou <br>): Autor, Doba vydání, Literární druh, Literární žánr, Forma vyprávění, Téma a motiv, Tématicky podobná díla, Časoprostor, Kompoziční výstavba, Související autoři (mají podobnou tvorbu a žili v dané době).`;
  const autorPrompt = `Sepiš mi na maximálně 200 slov životopis autora ${autor} (zobraz v HTML kódu a místo /n dávej <br>, názvy piš v češtině, na konec dej dvakrát za sebou <br>, začni tučným textem Autor: a pokračuj v textu).`;
  const charactersPrompt = `Vypiš mi stručně a v odrážkách hlavní postavy (kdo byly a jejich charakteristiku) knihy ${title} od ${autor} (zobraz v HTML kódu a místo /n dávej <br>, na konec dej dvakrát za sebou  <br>, názvy piš v češtině, začni na novém řádku tučným textem Hlavní postavy:).`;
  const storyPrompt = `Sepiš mi na maximálně 400 slov děj knihy ${title} od ${autor} (zobraz v HTML kódu a místo /n dávej <br>, názvy piš v češtině, na konec dej dvakrát za sebou  <br>, začni na novém řádku tučným textem Příběh:).`;
  const questionPrompt = `Sepiš mi v těchto bodech maturitní otázku na téma ${question} (zobraz v HTML kódu a místo /n dávej <br>, všechny odkazy se budou otevírat v novém okně a budou mít podtržení): Úvod do otázky, Obsah rozepiš obsáhle a do detailu, Odkazy na zajímavé a relavantní zdroje na internetu s českým obsahem, Závěr.`;
  const seminarWorkPrompt = `Napiš ${type} na téma ${about} v jazyce ${language} v rozsahu minimálně 300 slov (zobraz v HTML kódu a místo /n dávej <br>, text rozděl do odstavců, na konci práce dej dvakrát za sebou <br> a poté napiš tučně ${type} - prvky slohového útvaru:, pod to napiš v bodech co je typické pro tento slohý útvar).`;

  const fetchBook = async () => {
    setbookDescription("");
    setLoadingBook(true);

    const responseBook = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: bookPrompt,
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    const dataBook = responseBook.body;
    if (!dataBook) {
      return;
    }

    const readerBook = dataBook.getReader();
    const decoderBook = new TextDecoder();
    let doneBook = false;

    while (!doneBook) {
      const { value, done: doneReading } = await readerBook.read();
      doneBook = doneReading;
      const chunkValue = decoderBook.decode(value);
      setbookDescription((prev) => prev + chunkValue);
    }

    const responseAutor = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: autorPrompt,
        max_tokens: 800,
        temperature: 0.1,
      }),
    });

    const dataAutor = responseAutor.body;
    if (!dataAutor) {
      return;
    }

    const readerAutor = dataAutor.getReader();
    const decoderAutor = new TextDecoder();
    let doneAutor = false;

    while (!doneAutor) {
      const { value, done: doneReading } = await readerAutor.read();
      doneAutor = doneReading;
      const chunkValue = decoderAutor.decode(value);
      setbookDescription((prev) => prev + chunkValue);
    }

    const responseCharacters = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: charactersPrompt,
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    const dataCharacters = responseCharacters.body;
    if (!dataCharacters) {
      return;
    }

    const readerCharacters = dataCharacters.getReader();
    const decoderCharacters = new TextDecoder();
    let doneCharacters = false;

    while (!doneCharacters) {
      const { value, done: doneReading } = await readerCharacters.read();
      doneCharacters = doneReading;
      const chunkValue = decoderCharacters.decode(value);
      setbookDescription((prev) => prev + chunkValue);
    }

    const responseStory = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: storyPrompt,
        max_tokens: 800,
        temperature: 0.1,
      }),
    });

    const dataStory = responseStory.body;
    if (!dataStory) {
      return;
    }

    const readerStory = dataStory.getReader();
    const decoderStory = new TextDecoder();
    let doneStory = false;

    while (!doneStory) {
      const { value, done: doneReading } = await readerStory.read();
      doneStory = doneReading;
      const chunkValue = decoderStory.decode(value);
      setbookDescription((prev) => prev + chunkValue);
    }

    setTitle("");
    setAutor("");
    setLoadingBook(false);
  };

  const fetchQuestion = async () => {
    setQuestionDescription("");
    setLoadingQuestion(true);

    const response = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: questionPrompt,
        max_tokens: 2000,
        temperature: 0.2,
      }),
    });

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setQuestionDescription((prev) => prev + chunkValue);
    }

    setQuestion("");
    setLoadingQuestion(false);
  };

  const fetchSeminarWork = async () => {
    setSeminarWork("");
    setLoadingSeminarWork(true);

    const response = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: seminarWorkPrompt,
        max_tokens: 2000,
        temperature: 0.6,
      }),
    });

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setSeminarWork((prev) => prev + chunkValue);
    }

    setAbout("");
    setLanguage("");
    setType("");
    setLoadingSeminarWork(false);
  };

  return (
    <Flex direction="column" alignItems="center" height="100vh">
      <Heading size="xl" pt={16} pb={3} px={3}>
        Maturita AI (👨‍🎓, 🧠)
      </Heading>
      <Flex alignItems="center" px={3}>
        <Text fontSize="lg" textAlign="center" mr={2}>
          Umělá inteligence pro vypracování knih, otázek k maturitě nebo napsání písemné práce.
        </Text>
      </Flex>
      <Tabs colorScheme="cyan" mt={10} w={["90%", "85%", "75%"]}>
        <TabList>
          <Tab>Knihy</Tab>
          <Tab>Otázky</Tab>
          <Tab>Písemná práce</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDir="column">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Název díla"
                mb={3}
                isDisabled={loadingBook}
                colorScheme="cyan"
              />
              <Input
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Autor"
                mb={5}
                isDisabled={loadingBook}
                colorScheme="cyan"
              />
              <Button
                variant="solid"
                colorScheme="cyan"
                onClick={fetchBook}
                isDisabled={loadingBook || !title || !autor}>
                Vypracovat knihu
              </Button>
            </Flex>
            {isOpen && (
              <Alert status="warning" mt={5} rounded={6}>
                <AlertIcon w={30} />
                <VStack width="100%" align="left" spacing={1} ml={2}>
                  <AlertTitle textAlign="left">Možné chyby v textu</AlertTitle>
                  <AlertDescription textAlign="left">
                    Vygenerovaný text si pro jistotu překontrolujte s ostatními zdroji na internetu o dané knize.
                  </AlertDescription>
                </VStack>
                <CloseButton alignSelf="flex-start" position="relative" right={0} top={-1} onClick={onClose} />
              </Alert>
            )}
            {bookDescription && (
              <>
                <Text fontSize="2xl" fontWeight="bold" mt={10}>
                  Výsledek
                </Text>
                <div style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: bookDescription }}></div>
              </>
            )}
          </TabPanel>
          <TabPanel>
            <Flex flexDir={["column"]}>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Název otázky"
                mb={5}
                isDisabled={loadingQuestion}
                colorScheme="cyan"
              />
              <Button
                variant="solid"
                colorScheme="cyan"
                onClick={fetchQuestion}
                isDisabled={loadingQuestion || !question}>
                Vypracovat otázku
              </Button>
            </Flex>
            {questionDescription ? (
              <>
                <Text fontSize="2xl" fontWeight="bold" mt={10}>
                  Výsledek
                </Text>
                <div style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: questionDescription }}></div>
              </>
            ) : (
              loadingQuestion && (
                <Flex justifyContent="center">
                  <Spinner size="lg" color="cyan" mt={20} />
                </Flex>
              )
            )}
          </TabPanel>
          <TabPanel>
            <Flex flexDir={["column"]}>
              <Input
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Téma seminární práce"
                mb={3}
                isDisabled={loadingSeminarWork}
                colorScheme="cyan"
              />
              <Select
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                colorScheme="cyan"
                mb={3}
                isDisabled={loadingSeminarWork}
                placeholder="Vyberte jazyk">
                <option value="Čeština">Čestina</option>
                <option value="Angličtina">Angličtina</option>
                <option value="Španělština">Španělština</option>
                <option value="Francouzština">Francouzština</option>
                <option value="Ruština">Ruština</option>
              </Select>
              <Select
                onChange={(e) => setType(e.target.value)}
                value={type}
                colorScheme="cyan"
                mb={5}
                isDisabled={loadingSeminarWork}
                placeholder="Vyberte slohový útvar">
                <option value="zpráva a oznámení">Zpráva a oznámení</option>
                <option value="vyprávění">Vyprávění</option>
                <option value="popis">Popis</option>
                <option value="charakteristika">Charakteristika</option>
                <option value="formální dopis">Výklad</option>
                <option value="úvaha">Úvaha</option>
              </Select>
              <Button
                variant="solid"
                colorScheme="cyan"
                onClick={fetchSeminarWork}
                isDisabled={loadingSeminarWork || !about || !language || !type}>
                Napsat práci
              </Button>
            </Flex>
            {seminarWork ? (
              <>
                <Text fontSize="2xl" fontWeight="bold" mt={10}>
                  Výsledek
                </Text>
                <div style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: seminarWork }}></div>
              </>
            ) : (
              loadingSeminarWork && (
                <Flex justifyContent="center">
                  <Spinner size="lg" color="cyan" mt={20} />
                </Flex>
              )
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Home;
