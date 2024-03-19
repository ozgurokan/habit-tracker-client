import {useState} from 'react'
import {Flex,Box,Button,FormControl, Textarea, useToast} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createNewActivitiy} from '../../api/fetchingActivitiesMethods';
import {activitiyCreationValidation} from "../../validation/validation"







function ActivityForm({habit,refreshActivities}) {

    const toast = useToast();

    const toastStyle = {
        title: 'Activity submitted.',
        description: "We've sumbit your activity.",
        status: 'success',
        duration: 2500,
        isClosable: true
    } 

    const userId = useSelector((state) => state.auth.userData.id)

    const habitId = habit.id;
    

    const formik = useFormik({
        initialValues:{
            name: "",
        },
        validationSchema : activitiyCreationValidation,
        onSubmit : async(values,bag) => {   
            try{ 
                const activityRequest = {
                    name: values.name,
                    habitId : habitId,
                    userId : userId
                }
                createNewActivitiy(activityRequest)
                    .then(
                        (res) => {
                            formik.resetForm();
                            toast(toastStyle);
                        },(error) => {
                            console.log("error " + error);
                        })
                    .then((res) => {
                        refreshActivities();
                    })
            }catch(e){  
                console.log(e)
                console(bag.errors.general)
            }
        }
    })
  return (
    <Flex w={"full"} p="2" background={"gray.500"} textColor="black" rounded="5" mt="2" className='activityForm'>
        <form  onSubmit={formik.handleSubmit} style={{width : "100%"}}>
            <FormControl w={"full"} maxH={"100px"} >
                <Textarea maxH={"50px"}  type="text" w={"full"} background="#fff" placeholder={"Activity"} name={"name"} id={"name"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}>
                </Textarea>
            </FormControl>
            {<Box  my={2}>{formik.errors.general && (<Alert justifyContent={"center"} textColor="black" status='error'>{formik.errors.general}</Alert>)}</Box>}
            <Button mb="1%" colorScheme={"teal"} type={"submit"}>Add Activity</Button>
            <hr /> 
        </form>
    </Flex>
  )
}

export default ActivityForm