import React, { useState, useEffect } from "react";
import httpClient from "./HttpClient";
import {
    ChakraProvider,
    Center,
    Stack,
    Button,
    Input,
    Grid,
  } from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { Box, VStack, Heading } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";



const AddTransactionPage: React.FC = () => {
    const [user, setUser] = useState<string>("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [transaction_date, setTransactionDate] = useState("");
  
    const AddTransaction = async () => {
      try {

        const token = localStorage.getItem('jwtToken');

    
        if (!token) {
        alert('JWT token not found in local storage');
        return;
    }
        const resp = await httpClient.post("//localhost:5000/add_transaction", {
          name,
          type,
          amount,
          time_transacted:Date.parse(transaction_date)/1000,
          time_created:Date.now()/1000,
    
        },{headers:{Authorization: `Bearer ${token}`,}} 
        );
        window.location.href = "/home";
      } catch (error: any) {
        if (error.response.status === 401) {
          alert("Invalid credentials");
        }
      }
    };
  
    return (
      <ChakraProvider>
        <Center h="100vh" bg="blackAlpha.800">
          <Stack
            boxShadow="md"
            bg="#272727"
            p="20"
            rounded="md"
            marginBottom="10px"
          >
            <Heading as="h1" color="#f8910a">
              Add new transaction
            </Heading>
            <FormControl>
              <Grid templateColumns="repeat(2,1fr)" gap={5} marginTop="15px">   
                  <FormLabel color="whiteAlpha.900">Name</FormLabel>
                  <Input
                    placeholder="name"
                    color="white"
                    type="text"
                    value={name}
                    onChange={(event:any) => setName(event.target.value)}
                  />
                  <FormLabel color="whiteAlpha.900">Transaction Type</FormLabel>
                  <Input
                    placeholder="Type [1 = Purchase, 2 = Sell]"
                    color="white"
                    type="text"
                    value={type}
                    onChange={(event:any) => setType(event.target.value)}
                  />
                  <FormLabel color="whiteAlpha.900">Amount</FormLabel>
                  <Input
                    placeholder="amount"
                    color="white"
                    type="text"
                    value={amount}
                    onChange={(event:any) => setAmount(event.target.value)}
                  />
                  <FormLabel color="whiteAlpha.900">Transaction date</FormLabel>
                  <Input
                    placeholder="Transaction Date (MM-DD-YYYY)"
                    color="white"
                    type="text"
                    value={transaction_date}
                    onChange={(event:any) => setTransactionDate(event.target.value)}
                  />
                </Grid>

               <Stack justify="space-between" marginTop="50px">
                <Button
                  colorScheme="orange"
                  variant="solid"
                  type="button"
                  onClick={() => AddTransaction()}
                >
                  Add new transaction
                </Button>
              </Stack>
            </FormControl>
            <Stack justify="center" color="gray.600" spacing="3">
              <a href="/home">
                <Button colorScheme="orange" variant="link">
                  Home page
                </Button>
              </a>
            </Stack>
          </Stack>
        </Center>
      </ChakraProvider>
    );
  };
  
  export default AddTransactionPage;