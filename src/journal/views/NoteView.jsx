import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";
import {useForm} from '../../hooks'
import { useMemo } from "react";
import { useEffect } from "react";
import { savingNewNote, setActiveNote,startDeletingNote,startSaveNote, startUploadingFiles } from "../../store/journal";
import { useRef } from "react";

const parseDate = (fecha)=>{
  var meses = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ]
  
  let date = fecha;
  var dia = date.getDate();
  var mes = date.getMonth();
  var yyy = date.getFullYear();
  return  `${dia} de  ${meses[mes]} de ${yyy}`
}

export const NoteView = () => {

  const dispatch = useDispatch();
  const {active: note,messageSaved,isSaving} = useSelector(state => state.journal);

  const {body,title,date,onInputChange,formState} = useForm(note);

  const dateString = useMemo(()=>{
    const newDate = new Date(date);
    //return newDate.toUTCString();
    return parseDate(newDate);
  },[date])

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  useEffect(() => {
    if(messageSaved.length > 0 ){
      Swal.fire('Nota actualizada',messageSaved,'success');
    }
  }, [messageSaved])
  

  const onSaveNote=()=>{
    dispatch(startSaveNote());
  }
  
  const onFileInputChange = ({target})=>{
    if(target.files === 0) return ;

    dispatch(startUploadingFiles(target.files));
  }

  const onDelete=()=>{
    dispatch(startDeletingNote());
  }

  return (
    <Grid
    className="animate__animated animate__fadeIn animat__faster"
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>

        <input 
          type="file" 
          multiple 
          onChange={onFileInputChange} 
          style={{display:'none'}}
          ref={fileInputRef}
        />

        <IconButton color="primary" disabled={isSaving} onClick={()=>fileInputRef.current.click()}  >
            <UploadOutlined/>
        </IconButton>

        <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio en el dia de hoy?"
          label=""
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
          <Button onClick={onDelete} sx={{mt:2}} color="error" >
              <DeleteOutline/> Borrar
          </Button>
      </Grid>

        {/* Image gakkery */}
       { note?.imageUrls && <ImageGallery images={note.imageUrls} />}

    </Grid>
  );
};
