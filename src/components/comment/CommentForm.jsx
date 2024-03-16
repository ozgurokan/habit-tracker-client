import {Flex,Box,Button,FormControl, Textarea} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createNewComment,fetchCommentsByHabitId} from '../../api/commentsMethods';
import {commentCreationValidation} from "../../validation/validation"

import {useState} from 'react'






function CreateHabitForm({habit}) {


    const userId = useSelector((state) => state.auth.userData.id)

    const habitId = habit.id;
    
    
    const formik = useFormik({
        initialValues:{
            commentText: "",
        },
        validationSchema : commentCreationValidation,
        onSubmit : async(values,bag) => {   
            try{ 
                const createCommentRequest = {
                    commentText: values.commentText,
                    habitId : habitId,
                    userId : userId
                }
                console.log(createCommentRequest)
                const response = await createNewComment(createCommentRequest);
            }catch(e){  
                console.log(e)
                console(bag.errors.general)
            }
        }
    })
  return (
    <Flex w={"full"} p="2" background={"gray.500"} rounded="5" mt="2" className='commentForm'>
        <form  onSubmit={formik.handleSubmit} style={{width : "100%"}}>
            <FormControl w={"full"} maxH={"100px"} >
                <Textarea maxH={"50px"}  type="text" w={"full"} background="#fff" placeholder={"Comment"} name={"commentText"} id={"commentText"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.commentText}>
                </Textarea>
            </FormControl>
            {<Box  my={2}>{formik.errors.general && (<Alert justifyContent={"center"} textColor="black" status='error'>{formik.errors.general}</Alert>)}</Box>}
            <Button mb="1%" colorScheme={"teal"} type={"submit"}>Comment</Button>
            <hr /> 
        </form>
    </Flex>
  )
}

export default CreateHabitForm