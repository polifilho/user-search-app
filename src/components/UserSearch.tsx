import { UserSearchType } from '../types';
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
          label="GitHub Username"
          variant="outlined"
          value={username}
          onChange={(e) => handleChangeUserName(e.target.value)}
        />
      </Grid>
      {errorMessage && (
        <Grid item xs={12}>
          <Alert severity="error">Please, set username!</Alert>
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
          {loadingUsers ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserSearch;
