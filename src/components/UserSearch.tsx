import { UserSearchType } from '../types';
import { CONTENT } from '../communs';

import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Alert,
} from '@mui/material';

const UserSearch = ({
  username,
  handleChangeUserName,
  errorMessage,
  handleSearch,
  loadingUsers,
}: UserSearchType) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={CONTENT.search.placeholder}
          variant="outlined"
          value={username}
          onChange={(e) => handleChangeUserName(e.target.value)}
        />
      </Grid>
      {errorMessage && (
        <Grid item xs={12}>
          <Alert severity="error">{CONTENT.search.errorUser}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loadingUsers}
        >
          {loadingUsers ? (
            <CircularProgress size={24} />
          ) : (
            CONTENT.search.button
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserSearch;
