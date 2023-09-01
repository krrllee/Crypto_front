import React, { useState } from "react";
import HttpClient from "./HttpClient";
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
import RegistrationModal from "./RegistrationModal";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [adress, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState(false);


  const registerUser = async () => {
    console.log(username, email, password);
    try {
      const resp = await HttpClient.post("http://127.0.0.1:5000/registration", {
        username,
        first_name,
        last_name,
        adress,
        city,
        state,
        phone_number,
        email,
        password,
      });
      setShowModal(true);
      window.location.href = "/login";
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
            Register your account
          </Heading>
          <FormControl>
            <Grid templateColumns="repeat(2,1fr)" gap={5} marginTop="15px">
              <Grid templateColumns="repeat(2,1fr)" gap={2} marginTop="15px">
                <FormLabel color="whiteAlpha.900">Username</FormLabel>
                <Input
                  placeholder="username"
                  color="white"
                  type="text"
                  value={username}
                  onChange={(event:any) => setUsername(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">First name</FormLabel>
                <Input
                  placeholder="first name"
                  color="white"
                  type="text"
                  value={first_name}
                  onChange={(event:any) => setFirstName(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">Last name</FormLabel>
                <Input
                  placeholder="last name"
                  color="white"
                  type="text"
                  value={last_name}
                  onChange={(event:any) => setLastName(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">Address</FormLabel>
                <Input
                  placeholder="address"
                  color="white"
                  type="text"
                  value={adress}
                  onChange={(event:any) => setAddress(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">City</FormLabel>
                <Input
                  placeholder="city"
                  color="white"
                  type="text"
                  value={city}
                  onChange={(event:any) => setCity(event.target.value)}
                />
              </Grid>
              <Grid templateColumns="repeat(2,1fr)" gap={2} marginTop="15px">
                <FormLabel color="whiteAlpha.900">State</FormLabel>
                <Input
                  placeholder="state"
                  color="white"
                  type="text"
                  value={state}
                  onChange={(event:any) => setState(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">Phone number</FormLabel>
                <Input
                  placeholder="phone number"
                  color="white"
                  type="text"
                  value={phone_number}
                  onChange={(event:any) => setPhoneNumber(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">Email</FormLabel>
                <Input
                  placeholder="email"
                  color="white"
                  type="text"
                  value={email}
                  onChange={(event:any) => setEmail(event.target.value)}
                />
                <FormLabel color="whiteAlpha.900">Password</FormLabel>
                <Input
                  placeholder="password"
                  color="white"
                  type="password"
                  value={password}
                  onChange={(event:any) => setPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <Stack justify="space-between" marginTop="50px">
              <Button
                colorScheme="orange"
                variant="solid"
                type="button"
                onClick={() => registerUser()}
              >
                Register
              </Button>
              {showModal && (
        <RegistrationModal onClose={() => setShowModal(false)} />
      )}
            </Stack>
          </FormControl>
          <Stack justify="center" color="white" spacing="3">
            <span >Already have an account?</span>
            <a href="/login">
              <Button colorScheme="orange" variant="link">
                Login
              </Button>
            </a>
          </Stack>
        </Stack>
      </Center>
    </ChakraProvider>
  );
};

export default RegisterPage;