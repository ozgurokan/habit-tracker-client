import {Flex,Box,Input,Button,FormControl, Textarea} from "@chakra-ui/react";
import { useFormik } from "formik";
import {habitCreationValidation} from "../../validation/validation";
import {createNewHabit} from "../../api/fetchingHabitsMethods";
import { useSelector } from "react-redux";




import {useState} from 'react'






function CreateHabitForm() {


    const {id} = useSelector((state) => state.auth.userData)
    const [forceUpdate,setForceUpdate] = useState(1);



    const formik = useFormik({
        initialValues:{
            name: "",
        },
        validationSchema : habitCreationValidation,
        onSubmit : async(values,bag) => {   
            try{ 
                const request = {
                    name: values.name,
                    userId : id
                }
                const response = await createNewHabit(request);
                formik.resetForm();
                setForceUpdate(forceUpdate +1);
            }catch(e){  
                bag.setErrors({general : e.response.data.errors})
                console(bag.errors.general)
            }
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

export default CreateHabitForm