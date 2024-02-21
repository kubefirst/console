import React, { FunctionComponent, useMemo } from 'react';
import moment from 'moment';
import Image from 'next/image';

import { Content } from '../../types/algolia/content';
import { BISCAY } from '../../constants/colors';

import { CardDetails, CardImage, CardStats, Container, Duration, Title } from './ContentHit.styled';

import Typography from '@/components/Typography/Typography';

export interface ContentHitProps {
  hit: Content;
}

const ContentHit: FunctionComponent<ContentHitProps> = ({ hit }) => {
  const { duration, id, title, imageUrl, publishedAt, viewCount } = hit;

  const handleClickHit = () => {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  };

  const formattedDuration = useMemo(() => {
    const fullDuration = moment.duration(duration);

    const durationHours = fullDuration.hours();
    const durationMinutes = fullDuration.minutes();
    const durationSeconds = fullDuration.seconds();

    const validateValue = (value: number) => {
      if (value < 9) {
        return `0${value}`;
      }

      return value;
    };

    if (durationHours > 0) {
      return `${durationHours}:${validateValue(durationMinutes)}:${validateValue(durationSeconds)}`;
    }

    return `${validateValue(durationMinutes)}:${validateValue(durationSeconds)}`;
  }, [duration]);

  return (
    <Container onClick={handleClickHit}>
      <CardImage>
        <Image alt={title} src={imageUrl} height={110} width={208} />
        <Duration>
          <Typography variant="labelSmall" color="secondary">
            {formattedDuration}
          </Typography>
        </Duration>
      </CardImage>
      <CardDetails>
        <Title variant="labelMedium" color={BISCAY} sx={{ textTransform: 'capitalize' }}>
          {title}
        </Title>
        <CardStats>
          <Typography variant="body3">{viewCount} views</Typography>
          <Typography variant="body3">{`•  ${moment(publishedAt).fromNow()}`}</Typography>
        </CardStats>
      </CardDetails>
    </Container>
  );
};

export default ContentHit;
