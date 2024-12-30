import React from 'react'
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";

const navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={center}
          bgGradient={"linear(to-r, cyan.400, blue.400)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/"}>
              <Button>
                <PlusSquareIcon fontSize={20 }/>
              </Button>
            </Link>
            <Link to={"/create"}>Create</Link>
          </HStack>
        </Text>
      </Flex>
    </Container>
  )
}

export default navbar;
// import React from 'react'

// const navbar = () => {
//   return (
//     <div>navbar</div>
//   )
// }

// export default navbar