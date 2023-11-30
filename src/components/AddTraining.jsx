import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TrainingDialog from "./TrainingDialog";
import moment from 'moment';

function AddTraining( { fetchCustomers, data } ) {

    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: data.links[0].href
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveTraining = () => {
        const isoDate = moment(training.date, 'DD.MM.YYYY HH:mm').toISOString();
        const trainingInfo = {
            ...training,
            date: isoDate,
        };
    

        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trainingInfo),
        })
            .then(response => {
                if (response.ok)
                    fetchCustomers();
                else
                    throw new Error("Error when adding a training: " + response.statusText);
            })
            .catch(err => console.error(err))
        handleClose();
    };

    const handleChange = (value, field) => {
        setTraining(prevTraining => ({
            ...prevTraining,
            [field]: value,
        }));
    };

    return (
<div>
    <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <TrainingDialog training={training} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>

        </div>
    );
}

export default AddTraining;