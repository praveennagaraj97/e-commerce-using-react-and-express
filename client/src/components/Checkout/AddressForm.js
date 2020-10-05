import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm() {
  const [saveAddress, setSaveAddress] = useState(false);

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField required id='name' name='name' label='Name' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address'
            name='address'
            label='Address'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required id='city' name='city' label='City' fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='state'
            name='state'
            label='State/Province/Region'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Zip / Postal code'
            fullWidth
            autoComplete='shipping postal-code'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setSaveAddress(!saveAddress)}
                color='secondary'
                name='saveAddress'
              />
            }
            label='Use this address for future orders'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
