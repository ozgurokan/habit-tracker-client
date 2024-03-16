import React from 'react'
import {Flex,FormControl,Textarea,Box,Button,Alert} from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { createNewComment,fetchCommentsByHabitId} from '../../api/commentsMethods';
import {commentCreationValidation} from "../../validation/validation"
import CommentCard from './CommentCard';



function CommentList({habit,commentList}) {
        
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
<Flex flexDir={"column"} justifyContent={"center"} width="full" background={"gray.500"} rounded="5" p="5%" mt={2}>
    <Flex mb={"1%"} flexDir="column" >
            {commentList.map((e) => {
                return  <CommentCard key={e.id} comment={e} />
            })}
    </Flex>
    <Flex className='commentForm'>
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
</Flex>
  )
}

export default CommentList