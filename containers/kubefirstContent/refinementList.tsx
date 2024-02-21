import React, { FunctionComponent } from 'react';
import { useRefinementList } from 'react-instantsearch';
import sortBy from 'lodash/sortBy';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox from '../../components/Checkbox/Checkbox';
import Typography from '../../components/Typography/Typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import { RefinementContainer } from './KubefirstContent.styled';

const RefinementList: FunctionComponent = () => {
  const { items, refine } = useRefinementList({ attribute: 'categories' });

  return (
    <RefinementContainer>
      {items &&
        sortBy(items, 'label').map((category) => (
          <FormGroup key={category.label} sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox sx={{ mr: 2 }} onClick={() => refine(category.value)} />}
              label={
                <Typography variant="body2" color={VOLCANIC_SAND}>
                  {category.label}
                </Typography>
              }
              sx={{ ml: 0 }}
            />
          </FormGroup>
        ))}
    </RefinementContainer>
  );
};

export default RefinementList;
