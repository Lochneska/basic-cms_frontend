import {useQuery} from "@tanstack/react-query";
import {
    Box, Button,
    Center,
    Container,
    Spinner,
    Table,
    Td,
    Tr,
} from "@chakra-ui/react";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import {useParams} from "react-router-dom";
import { ContentData } from "../models/ContentData";

export default function ArchiveAccordion() {

    const { contentId } = useParams();

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/api/archive/${+contentId!}`);
        return response.json();
    };

    const {data, isLoading} = useQuery({
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
            <a href={"/updatecontent/"+contentId}><Button>Return to editing</Button></a>
            </Center>
            {data?.map((data:ContentData) => {
                return (
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        Version {+data.id}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Table>
                                    <Tr>
                                        <Td>Title:</Td>
                                        <Td>{data.title}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Picture:</Td>
                                        <Td><img src={data.thumbnail}/></Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Description:</Td>
                                        <Td dangerouslySetInnerHTML={{__html: data.description}}/>
                                    </Tr>
                                </Table>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                );
            })}
        </Container>
    );
}
