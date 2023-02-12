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
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Home = () => {
  const [title, setTitle] = useState<string>("");
  const [autor, setAutor] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);
  const [bookDescription, setbookDescription] = useState<string>("");
  const [questionDescription, setQuestionDescription] = useState<string>("");

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const toast = useToast();

  const fetchBook = async () => {
    setLoadingBook(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          autor,
        }),
      });
      const data = await response.json();

      setbookDescription(data?.bookDescription);
    } catch (err) {
      console.log("error: ", err);
      toast({
        title: "Stala se chyba",
        description: "Umělá intelegence neposkytla odpoveď na otázku.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    setTitle("");
    setAutor("");
    setLoadingBook(false);
  };

  const fetchQuestion = async () => {
    setLoadingQuestion(true);

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });
      const data = await response.json();

      setQuestionDescription(data?.questionDescription);
    } catch (err) {
      console.log("error: ", err);
      toast({
        title: "Stala se chyba",
        description: "Umělá intelegence neposkytla odpoveď.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    setQuestion("");
    setLoadingQuestion(false);
  };

  return (
    <Flex direction="column" alignItems="center" height="100vh">
      <Heading size="xl" pt={16} pb={3} px={3}>
        Maturita AI (👨‍🎓, 🧠)
      </Heading>
      <Flex alignItems="center" px={3}>
        <Text fontSize="lg" textAlign="center" mr={2}>
          Umělá inteligence pro vypracování knih nebo otázek k maturitě.
        </Text>
        <Tooltip label="Otázky vypracovává OpenAI" placement="bottom">
          <InfoOutlineIcon />
        </Tooltip>
      </Flex>
      <Tabs colorScheme="cyan" mt={10} w="75%">
        <TabList>
          <Tab>Knihy</Tab>
          <Tab>Otázky</Tab>
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
                  <AlertTitle textAlign="left">Možné chyby v dílech české literatury</AlertTitle>
                  <AlertDescription textAlign="left">
                    Tento model umělé inteligence někdy postrádá informace o knihách z české literatury.
                  </AlertDescription>
                </VStack>
                <CloseButton alignSelf="flex-start" position="relative" right={0} top={-1} onClick={onClose} />
              </Alert>
            )}
            {loadingBook ? (
              <>
                <Flex justifyContent="center">
                  <Spinner size="lg" color="cyan" mt={20} />
                </Flex>
                <Text textAlign="center" mt={5}>
                  Tato operace může nějakou dobu trvat...
                </Text>
              </>
            ) : (
              bookDescription && (
                <>
                  <Text fontSize="2xl" fontWeight="bold" mt={10}>
                    Výsledek
                  </Text>
                  <div style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: bookDescription }}></div>
                </>
              )
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
            {loadingQuestion ? (
              <>
                <Flex justifyContent="center">
                  <Spinner size="lg" color="cyan" mt={20} />
                </Flex>
                <Text textAlign="center" mt={5}>
                  Tato operace může nějakou dobu trvat...
                </Text>
              </>
            ) : (
              questionDescription && (
                <>
                  <Text fontSize="2xl" fontWeight="bold" mt={10}>
                    Výsledek
                  </Text>
                  <div style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: questionDescription }}></div>
                </>
              )
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Home;
