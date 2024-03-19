import React from 'react'
import {Flex,FormControl,Textarea,Button,Box,Alert,useToast} from "@chakra-ui/react";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import { habitCreationValidation } from '../../validation/validation';
import {createNewHabit} from "../../api/fetchingHabitsMethods";



function HabitForm({refreshHabits}) {

    const toast = useToast();
    const toastStyle = {
        title: 'Habit Post created.',
        description: "We've created your habit for you.",
        status: 'success',
        duration: 2000,
        isClosable: true
    } 

    const {id} = useSelector((state) => state.auth.userData)

    const formik = useFormik({
        initialValues:{
            name: "",
        },
        validationSchema : habitCreationValidation,
        onSubmit : (values,bag) => {   
            const request = {
                name: values.name,
                userId : id
            }
            createNewHabit(request).then(
                (res) => {
                formik.resetForm();
                toast(toastStyle);
            }).then(
                (res) =>{ 
                    refreshHabits();
                },
                (error) => {
                    console.log(error)
            }
            )
        }
    }) 
    return (
    <Flex alignItems={"center"} background="gray.500" p={5}  m={10} w="30%" border={"1px solid whitesmoke"}>
        <form  onSubmit={formik.handleSubmit} style={{width : "100%"}}>
            <FormControl w={"full"} maxH={"200px"} >
                <Textarea maxH={"200px"}  type="text" w={"full"} background="#fff" placeholder={"Habit Desc (Min 5 letter)"} mt="1rem" name={"name"} id={"name"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} isInvalid={formik.touched.name && formik.errors.name}>
                </Textarea>
            </FormControl>
            {<Box  my={4}>{formik.errors.general && (<Alert justifyContent={"center"} textColor="black" status='error'>{formik.errors.general}</Alert>)}</Box>}
            <Button my={"1rem"} colorScheme={"teal"} type={"submit"}>Publish</Button>
            <hr /> 
        </form>
    </Flex>
    )
    }

export default HabitForm