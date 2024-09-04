import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { getUserRepos } from '../services/github-web-api';
import { ReposType, UserRepositoriesTypes } from '../types';
import {
  Button,
  Typography,
  CircularProgress,
  AccordionDetails,
  Card,
  CardContent,
  Box,
  IconButton,
} from '@mui/material';
import { CONTENT } from '../communs';

const UserRepositories = ({
  user,
  setRepos,
  loadingRepos,
  repos,
  page,
  setPage,
}: UserRepositoriesTypes) => {
  const [loadingMoreRepos, setLoadingMoreRepos] = useState(false);

  const loadMoreRepos = async (userName: string) => {
    setLoadingMoreRepos(true);
    const userRepos = await getUserRepos(userName, page + 1);

    setRepos((repos: ReposType[]) =>
      repos.map((repo: ReposType) => {
        if (repo.userName === userName) {
          return {
            ...repo,
            loadMore: userRepos.length >= 20,
            repositories: [...repo.repositories, ...userRepos],
          };
        }
        return repo;
      })
    );

    setPage(page + 1);
    setLoadingMoreRepos(false);
  };

  return (
    <AccordionDetails>
      {loadingRepos ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={24} />
        </div>
      ) : (
        repos.map(({ userName, repositories }, key) => {
          if (userName === user && repositories.length === 0) {
            return (
              <Typography
                key={`${key}-error-message-${user}`}
                variant="body2"
                color="text.secondary"
              >
                {CONTENT.user.repositories.errorMessage}
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
                    <Typography variant="body2" sx={{ marginRight: 0.5 }}>
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
      {repos.map(({ userName, loadMore }) => {
        if (loadMore && userName === user) {
          return (
            <Button
              style={{ margin: '0 auto', display: 'flex' }}
              onClick={() => loadMoreRepos(user)}
              variant="contained"
              key={`${user}-button`}
              endIcon={
                loadingMoreRepos ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  ''
                )
              }
            >
              {CONTENT.commons.loadMore}
            </Button>
          );
        }
      })}
    </AccordionDetails>
  );
};

export default UserRepositories;
