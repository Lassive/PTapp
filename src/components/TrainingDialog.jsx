import { DialogContent, TextField } from "@mui/material";


function TrainingDialog({ training, handleChange }) {

    return (
        <DialogContent>
            <TextField 
                margin="dense"
                label="Date"
                fullWidth
                variant="standard"
                value={training.date}
                onChange={(e) => handleChange(e.target.value, 'date')}
            />
            <TextField
                margin="dense"
                label="Duration"
                fullWidth
                variant="standard"
                value={training.duration}
                onChange={(e) => handleChange(e.target.value, 'duration')}
            />
            <TextField
                margin="dense"
                label="Activity"
                fullWidth
                variant="standard"
                value={training.activity}
                onChange={(e) => handleChange(e.target.value, 'activity')}
            />
        </DialogContent>
    );
}

export default TrainingDialog;