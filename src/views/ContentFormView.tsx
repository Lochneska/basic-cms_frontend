import { useState, useEffect } from "react";
import {
    useFormContext,
    FormProvider,
    useForm,
    useController,
} from "react-hook-form";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Center,
    Fade,
    Input,
    Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Editor from "react-simple-wysiwyg";
import DeletionModal from "./DeletionModal";
import { ContentData } from "../models/ContentData";

const HtmlEditorComponent = ({ name }: { name: string }) => {
    const { control } = useFormContext();
    const {
        field: { onChange, ...field },
    } = useController({ control, name });

    return (
        <>
            <Editor value={field.value} onChange={onChange} />
        </>
    );
};

export default function ContentFormView() {
    const methods = useForm<ContentData>({
        defaultValues: {
            description: "",
        },
    });
    const [alertVisible, setAlertVisible] = useState(false);
    const { contentId } = useParams();

    const fetchData = async () => {
        let response = await fetch(`http://localhost:8080/api/content/${contentId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to fetch data");
        }
    };

    const { data, isLoading } = useQuery({
        enabled: !!contentId,
        queryFn: () => fetchData(),
        queryKey: ["content"],
    });

    console.log(data)

    useEffect(() => {
        if (data) {
            methods.setValue("title", data.title);
            methods.setValue("thumbnail", data.thumbnail);
            methods.setValue("description", data.description);
        }
    }, [data]);

    const onSubmit = methods.handleSubmit((data: ContentData) => {
        if (contentId) {
            data.id = +contentId;
            console.log(data);
            fetch(`http://localhost:8080/api/updatecontent/${contentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status === 200) {
                    turnOnAlert();
                }
            });
        } else {
            fetch("http://localhost:8080/api/addcontent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status === 201) {
                    turnOnAlert();
                }
            });
        }
    });

    function turnOnAlert() {
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    }

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
        <Box padding="1rem">
            <a href="/">
                <Button mb="0.5rem">Return to main page</Button>
            </a>
            {contentId && <a href={"/viewarchive/" + data.id}>
                <Button mb="0.5rem">View Archive</Button>
            </a>}
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <Input
                        {...methods.register("title")}
                        placeholder="Title"
                    ></Input>
                    <Input
                        {...methods.register("thumbnail")}
                        placeholder="Thumbnail (a link to one)"
                    ></Input>
                    <HtmlEditorComponent name="description" />
                    <Box mt="0.5rem">
                    </Box>
                    <Box mt="0.5rem">
                        <Button mr="0.5rem" colorScheme="green" type="submit">
                            Save
                        </Button>
                        {contentId && <DeletionModal contentId={contentId} />}
                    </Box>
                </form>
            </FormProvider>
            <Fade in={alertVisible}>
                <Alert status="success">
                    <AlertIcon />
                    Content has been sucessfully saved.
                </Alert>
            </Fade>
        </Box>
    );
}
