import {useQuery} from "@tanstack/react-query";
import {
  Center,
  Container,
  Heading,
  Spinner,
  Table,
  Td,
  Tr,
} from "@chakra-ui/react";
import {ContentData} from "./models/ContentData.tsx";


async function fetchData() {
    const response = await fetch("http://localhost:8080/api/content");
    return response.json();
}

function MainPage() {
    const {data, isLoading} = useQuery({
        queryFn: () => fetchData(),
        queryKey: ["links"],
    });

    if (isLoading)
        return (
            <Center height="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        );

    return (
        <Container>
            <Center>
                <Heading>Currently stored links:</Heading>
            </Center>
            {data?.map((data: ContentData) => {
                return (
                    <Table>
                        <Tr>
                            <Td>Title:</Td>
                            <Td>{data.title}</Td>
                        </Tr>
                    </Table>
                );
            })}
        </Container>
    );
}

export default MainPage;