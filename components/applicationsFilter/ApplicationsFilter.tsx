import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

import Row from '../Row/Row';
import Typography from '../Typography/Typography';
import { IAutocompleteProps } from '../Autocomplete/Autocomplete';
import Select from '../Select/Select';
import TextFieldWithRef from '../TextField/TextField';
import { InputAdornmentContainer } from '../TextField/TextField.styled';

import {
  Container,
  Content,
  DropdownContainer,
  TargetContainer,
} from './ApplicationsFilter.styled';

import { VOLCANIC_SAND } from '@/constants/colors';
import { LabelValue } from '@/types';
import { noop } from '@/utils/noop';
import { ApplicationsState } from '@/redux/slices/applications.slice';
import { Target } from '@/types/applications';

export interface ApplicationsFilterProps extends ComponentPropsWithoutRef<'div'> {
  searchOptions: IAutocompleteProps['options'];
  targetOptions: LabelValue[];
  clusterSelectOptions: LabelValue[];
  onFilterChange?: (filter: ApplicationsState['filter']) => void;
  defaultCluster: string;
}

const ApplicationsFilter: FunctionComponent<ApplicationsFilterProps> = ({
  clusterSelectOptions,
  defaultCluster,
  onFilterChange = noop,
  targetOptions,
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [target, setTarget] = useState<Target>(Target.CLUSTER);
  const [cluster, setCluster] = useState(defaultCluster);

  const handleChangeTarget = (value: Target) => {
    setTarget(value);
    setCluster('');

    onFilterChange({ target: value, cluster, searchTerm });
  };

  const handleChangeCluster = (value: string) => {
    setCluster(value);
    onFilterChange({ target, cluster: value, searchTerm });
  };

  const handleOnChangeSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onFilterChange({ target, cluster, searchTerm: event.target.value });
  };

  useEffect(() => {
    if (defaultCluster && clusterSelectOptions.length) {
      onFilterChange({ target, cluster: defaultCluster, searchTerm });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container {...rest}>
      <Content>
        <DropdownContainer>
          <TargetContainer>
            <Typography variant="labelLarge" color={VOLCANIC_SAND}>
              Target:
            </Typography>
            <Select
              label=""
              options={targetOptions}
              value={target}
              onChange={(e) => handleChangeTarget(e.target.value as Target)}
              sx={{ width: '248px' }}
            />
          </TargetContainer>
          <Row>
            {defaultCluster && (
              <Select
                fullWidth
                label=""
                options={clusterSelectOptions}
                value={cluster}
                onChange={(e) => handleChangeCluster(e.target.value)}
                defaultValue={defaultCluster}
                sx={{ width: '248px' }}
              />
            )}
          </Row>
        </DropdownContainer>
        <Row>
          <TextFieldWithRef
            autoComplete="off"
            size="small"
            endAdornment={
              <InputAdornmentContainer position="end">
                <SearchIcon />
              </InputAdornmentContainer>
            }
            placeholder="Search app name"
            value={searchTerm}
            onChange={handleOnChangeSearch}
            sx={{ width: '248px' }}
          />
        </Row>
      </Content>
    </Container>
  );
};

export default styled(ApplicationsFilter)<ApplicationsFilterProps>``;
