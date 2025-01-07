import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Button,
  Input
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const texColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, editProduct } = useProductStore();
  const toasts = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productEdit, setEditProduct] = useState(product);


  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success)
      toasts({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    else {
      toasts({
        title: "Product Deleted",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditProduct = async (id, editedProduct) => {
    const { success, message } = await editProduct(id, editedProduct);
    if (!success)
      toasts({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    else {
      toasts({
        title: "Product Edited",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-10px)", shadow: "2xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={texColor}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="text" value={productEdit.name} onChange={(e) => setEditProduct({ ...productEdit, name: e.target.value })}>
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {handleEditProduct(productEdit._id, productEdit), onClose()}}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
