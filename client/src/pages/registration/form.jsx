import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from 'components/form/text-field';

const RegistrationForm = () => {
    // const [value, setValue] = React.useState(new Date());

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    rules={{ required: "Required!" }}
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    rules={{ required: "Required!" }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="birthday"
                    label="Date of birth"
                    name="birthday"
                    autoComplete="dob"
                    rules={{ required: "Required!" }}
                />
                {/* <DesktopDatePicker
                    label="Date of birth"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    /> */}
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Save
            </Button>
        </>
    );
};

export default RegistrationForm;