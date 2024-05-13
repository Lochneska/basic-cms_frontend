import { useQuery } from "@tanstack/react-query";
import {
    Center,
    Container,
    Spinner,
    Table,
    Tbody,
    Td,
    Tr,
} from "@chakra-ui/react";


import { useParams } from "react-router-dom";

function ContentView() {

    const {contentId} = useParams();

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/api/content/${contentId}`);
        return response.json();
    };

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

            <Table>
                <Tbody>
                    <Tr>
                        <Td>Title:</Td>
                        <Td>{data.title}</Td>
                    </Tr>
                    <Tr>
                        <Td>Thumbnail:</Td>
                        <Td><img src={data.thumbnail}></img></Td>
                    </Tr>
                    <Tr>
                        <Td>Description:</Td>
                        <Td>{data.description}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Container>
    );
}

export default ContentView;