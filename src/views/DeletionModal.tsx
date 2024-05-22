import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure,
} from '@chakra-ui/react'
import React from "react";

function DeletionModal({ contentId }: { contentId: string}) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const finalRef = React.useRef(null)

    function deleteContent(contentId: string) {
        fetch(`http://localhost:8080/api/delete/${contentId}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.status === 200) {
                onClose();
                window.location.href = '/';
            }
        });
    }

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>
                Delete
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Warning</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <p>Are you sure you want to delete this content?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={() => deleteContent(contentId)} colorScheme="red">Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeletionModal;