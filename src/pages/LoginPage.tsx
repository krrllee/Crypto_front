import React,{useState,useEffect} from "react";
import httpClient from "./HttpClient";
import { ChakraProvider, Center, Stack, Button, Input } from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { Box, VStack, Heading } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import GoogleButton from 'react-google-button'
import { GoogleOAuthProvider , TokenResponse, useGoogleLogin  } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script'
import LogIn from "./LogIn";
import LogOut from "./LogOut";

const CLIENT_ID = "CLIENT-ID";


const LoginPage: React.FC = () =>{


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    

    const logInUser = async () => {
        try {
          console.log(email, password);
          
          const resp = await httpClient.post("//localhost:5000/login", {
            email,
            password,
          });   
          if(resp.data.access_token){
            const jwtToken = resp.data.access_token;
            console.log(jwtToken)
            localStorage.setItem('jwtToken',jwtToken) 
            console.log('Login successful');
            window.location.href = "/home";
          }
          else{
            console.log(resp.data)
          } 
         
         
        } catch (error: any) {
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      };

 
    
    useEffect(()=>{
      function start(){
        gapi.client.init({
          clientId:CLIENT_ID,
          scope:""
        })
      }
      gapi.load('client:auth2',start);
    })
    


    return(
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
              Login
            </Heading>
            <FormControl>
              <FormLabel marginTop="15px" color="whiteAlpha.900">Email</FormLabel>
              <Stack justify="space-between" marginBottom="10px">
                <Input
                  placeholder="email"
                  color="white"
                  type="text"
                  value={email}
                  onChange={(event:any) => setEmail(event.target.value)}
                />
              </Stack>
              <FormLabel color="whiteAlpha.900">Password</FormLabel>
              <Stack justify="space-between" marginBottom="10px">
                <Input
                  placeholder="password"
                  color="white"
                  type="password"
                  value={password}
                  onChange={(event:any) => setPassword(event.target.value)}
                />
              </Stack>
              <Stack justify="space-between" marginTop="30px" marginBottom="10px">
                <Button    
                  colorScheme="orange"
                  variant="solid"
                  type="button"
                  onClick={() => logInUser()}
                >
                  Login
                </Button>
              </Stack>
            </FormControl>
            <LogIn/>
            <Stack justify="center" color="white" spacing="3">
              <span>Dont have an account?</span>
              <a href="/register">
                <Button colorScheme="orange" variant="link">
                  Sign up
                </Button>
              </a>
            </Stack>
          </Stack>
        </Center>
      </ChakraProvider>
    )
}

export default LoginPage;