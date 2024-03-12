import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {
    Box, Typography,
    List, ListItem, ListItemText

} from "@mui/material"



const FileField = (props) => {
    const { label, type, files, setFiles, field, isMultiple, ...rest } = props;
    const { form: { setTouched, setFieldValue } } = props;
    //console.log(files)


    const changeFiles =  async (event) => {

        setFieldValue(field.name, [...event.target.files]);
        await setFiles([...event.target.files]);
        console.log(files)

    }


    
    return (
        <Box>
            <input
                id={field.name}
                type={type}
                name={field.name}
                onChange={(e) => { changeFiles(e) }}
                multiple={isMultiple}
               
            />
            <Box sx={{ display: 'flex', my: 2, border: '1px dashed grey', backgroundColor: '#2532600f', borderRadius:3 }}>

                {files.length === 0 ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 2 }}>
                        <Typography variant="subtitle2">
                            Ningun archivo seleccionado
                        </Typography>
                    </Box>
                    :
                    <List dense>
                        {files.map((file) => { 
                            return (
                                <ListItem key={file.name} >
                                    <ListItemText>
                                        {file.name}
                                    </ListItemText>
                                </ListItem>
                            )})
                        }
                        
                    </List>
                }

            </Box>

           

        </Box>

        

    )

};


const FileInput = (props) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
            <Field
                {...props}
                variant="outlined"
                component={FileField}
                style={{
                    display: "flex",

                }}



            />
            <ErrorMessage name={props.name} component={TextError} />
        </Box>


    )


}




export default FileInput;