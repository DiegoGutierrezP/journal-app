import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views";
import { NothingSelectedView } from "../views/NothingSelectedView";

export const JournalPage = () => {

  const dispatch = useDispatch();

  const onClickNewNote = ()=>{
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView/> */}

      <IconButton
      onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position:'fixed',
          right:50,
          bottom:50
        }}
      >
        <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>
  );
};
