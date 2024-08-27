import React, { useState, useMemo } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { searchUsers, getUserRepos } from '../services/github-web-api';

const GitHubSearch: React.FC = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  const [repos, setRepos] = useState<any[]>([]);

  const [loadingUsers, setUsersLoading] = useState(false);
  const [loadingRepos, setReposLoading] = useState(false);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSearch = async () => {
    setUsersLoading(true);
    const result = await searchUsers(username);
    setUsers(result);
    setRepos([]);
    setUsersLoading(false);
  };

  const handleUserClick = async (userName: any) => {
    const hasUserRepo = repos.some((e) => e.userName === userName);
    if (!hasUserRepo) {
      setReposLoading(true);
      const userRepos = await getUserRepos(userName);
      setRepos((repos) => [
        ...repos,
        { userName, repositories: [...userRepos] },
      ]);
      setReposLoading(false);
    }
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="GitHub Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
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

      <List>
        {users.map((user, key) => (
          <Accordion
            key={`${key}-accordion-${user}`}
            expanded={expanded === `panel${key + 1}`}
            onChange={handleChange(`panel${key + 1}`)}
            style={{ marginBottom: 5 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
              onClick={() => handleUserClick(user)}
            >
              <Typography
                variant="subtitle1"
                component="p"
                key={`${key}-usernme-${user}`}
              >
                {user}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loadingRepos ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={24} />
                </div>
              ) : (
                repos.map(({ userName, repositories }) => {
                  if (userName === user && repositories.length === 0) {
                    return (
                      <Typography
                        key={`${key}-error-message-${user}`}
                        variant="body2"
                        color="text.secondary"
                      >
                        Sorry! Repositories not found from this user.
                      </Typography>
                    );
                  }

                  return (
                    userName === user &&
                    repositories.length > 0 &&
                    repositories.map((repository: any, index: number) => (
                      <Card
                        key={`${index}-item-${repository.name}`}
                        sx={{ marginBottom: 2, backgroundColor: '#e0e0e0' }}
                      >
                        <CardContent
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Box>
                            <Typography variant="h6" component="div">
                              {repository.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {repository.description}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{ marginRight: 0.5 }}
                            >
                              {repository.stargazers_count}
                            </Typography>
                            <IconButton aria-label="stars" size="small">
                              <StarIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    ))
                  );
                })
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </div>
  );
};

export default GitHubSearch;
