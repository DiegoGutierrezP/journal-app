import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";
import {useForm} from '../../hooks'
import { useMemo } from "react";
import { useEffect } from "react";
import { setActiveNote,startSaveNote } from "../../store/journal";

export const NoteView = () => {

  const dispatch = useDispatch();
  const {active: note} = useSelector(state => state.journal);

  const {body,title,date,onInputChange,formState} = useForm(note);

  const dateString = useMemo(()=>{
    const newDate = new Date(date);
    return newDate.toUTCString();
  },[date])

  useEffect(() => {

    dispatch(setActiveNote(formState));
  }, [formState])

  const onSaveNote=()=>{
    dispatch(startSaveNote());
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
        <Button onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
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

        {/* Image gakkery */}
        <ImageGallery/>
    </Grid>
  );
};
