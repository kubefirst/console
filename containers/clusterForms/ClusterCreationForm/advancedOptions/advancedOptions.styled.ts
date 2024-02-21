'use client';
import styled from 'styled-components';

import Column from '../../../../components/Column/Column';
import LearnMore from '../../../../components/LearnMore/LearnMore';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

export const InputContainer = styled(Column)`
  .MuiFormGroup-root {
    margin-left: 8px;
  }

  & ${LearnMore} {
    margin-left: 40px;
    color: ${EXCLUSIVE_PLUM};

    span,
    a {
      color: ${EXCLUSIVE_PLUM};
    }
  }
`;
