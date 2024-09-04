import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getUserRepos } from '../services/github-web-api';
import { UserItemType } from '../types';
import UserRepositories from './UserRepositories';
import { List, Typography, Accordion, AccordionSummary } from '@mui/material';

const UserItem = ({ users, repos, setRepos }: UserItemType) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [loadingRepos, setReposLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (repos.length === 0) {
      setExpanded(false);
    }
  }, [repos]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleUserClick = async (userName: any) => {
    if (!repos.some((e) => e.userName === userName)) {
      setReposLoading(true);
      const userRepos = await getUserRepos(userName, 1);
      setRepos((repos: any) => [
        ...repos,
        {
          userName,
          loadMore: userRepos.length >= 20,
          repositories: [...userRepos],
        },
      ]);
      setReposLoading(false);
    }
    setPage(1);
  };

  return (
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

          <UserRepositories
            user={user}
            setRepos={setRepos}
            loadingRepos={loadingRepos}
            repos={repos}
            page={page}
            setPage={setPage}
          />
        </Accordion>
      ))}
    </List>
  );
};

export default UserItem;
