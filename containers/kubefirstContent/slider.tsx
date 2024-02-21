import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import SliderMui from '@mui/material/Slider';
import moment from 'moment';
import { RangeInputProps, useRange } from 'react-instantsearch';
import { RangeBoundaries } from 'instantsearch.js/es/connectors/range/connectRange';

import { PORT_GORE, PRIMARY, SALTBOX_BLUE } from '../../constants/colors';

import { SliderContainer, SliderTitle } from './KubefirstContent.styled';

const Slider = styled(SliderMui)(({ theme }) => ({
  'color': PRIMARY,
  'height': 4,
  'padding': '13px 0',
  '& .MuiSlider-thumb': {
    'height': 20,
    'width': 20,
    'backgroundColor': '#fff',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    height: 4,
  },
  '& .MuiSlider-rail': {
    color: PORT_GORE,
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 4,
  },
}));

const RangeSlider: FunctionComponent<RangeInputProps> = (props: RangeInputProps) => {
  const { range, refine } = useRange(props);
  const { min, max } = range;

  const [value, setValue] = useState([min as number, max as number]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    refine(value as RangeBoundaries);
  };

  const start = useMemo(() => Math.floor(moment.duration(value[0]).asMinutes()), [value]);
  const end = useMemo(() => Math.floor(moment.duration(value[1]).asMinutes()), [value]);

  useEffect(() => {
    if (range.min && range.max) {
      setValue([range.min, range.max]);
    }
  }, [range.max, range.min]);

  return (
    <SliderContainer>
      <SliderTitle variant="body3" color={SALTBOX_BLUE}>{`${start} - ${end} min`}</SliderTitle>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        defaultValue={value}
        min={range.min}
        max={range.max}
      />
    </SliderContainer>
  );
};

export default RangeSlider;
