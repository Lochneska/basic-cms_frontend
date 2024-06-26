import { useQuery } from "@tanstack/react-query";
import {
    Center,
    Container,
    Heading,
    Spinner,
    Table,
    Tbody,
    Td,
    Tr,
    Button,
} from "@chakra-ui/react";
import { ContentData } from "../models/ContentData.tsx";
import DeletionModal from "./DeletionModal.tsx";


async function fetchData() {
    const response = await fetch("http://localhost:8080/api/content");
    return response.json();
}

function MainView() {
    const { data, isLoading } = useQuery({
        queryFn: () => fetchData(),
        queryKey: ["content"],
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
                <Heading>Currently stored content:</Heading>
            </Center>
            <Center>
                <a href="/createcontent">
                    <Button>Create new content</Button>
                </a>
            </Center>
            {data?.map((data: ContentData) => {
                return (
                    <Table>
                        <Tbody>
                            <Tr>
                                <Td>Title:</Td>
                                <Td>{data.title}</Td>
                            </Tr>
                            <Tr>
                                <Td>Actions: </Td>
                                <Td>
                                    <a href={"/content/" + data.id}>
                                        <Button>View</Button>
                                    </a>
                                    <a href={"/updatecontent/" + data.id}>
                                        <Button>Update</Button>
                                    </a>
                                    <DeletionModal contentId={data.id + ''}/>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                );
            })}
        </Container>
    );
}

export default MainView;