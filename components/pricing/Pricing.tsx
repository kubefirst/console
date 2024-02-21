import React, { FunctionComponent, useMemo } from 'react';
import Image from 'next/image';

import CheckIcon from '../../assets/check.png';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

import { Container, Features, PriceImage } from './Pricing.styled';

import { Plan } from '@/types/plan';
import { BISCAY, SALTBOX_BLUE } from '@/constants/colors';

export interface PricingProps {
  isActive?: boolean;
  onClick: () => void;
  plan: Plan;
  hideButton?: boolean;
}

const Pricing: FunctionComponent<PricingProps> = ({ hideButton, isActive, onClick, plan }) => {
  const { name, description, images, metadata, features } = plan;

  const buttonName = metadata && metadata['button'];
  const featuresTitle = metadata && metadata['featuresTitle'];
  const comingSoonTitle = metadata && metadata['comingSoonTitle'];
  const priceLabel = metadata && metadata['priceLabel'];

  const comingSoonFeatures = useMemo(
    () => features.filter(({ name }) => name.includes('SOON')),
    [features],
  );

  const availableFeatures = useMemo(
    () => features.filter(({ name }) => !name.includes('SOON')),
    [features],
  );

  return (
    <Container isActive={isActive}>
      <PriceImage src={images[0]} alt="product" width={32} height={32} />
      <Typography variant="h6" color={BISCAY} sx={{ mt: 2, mb: 2 }}>
        {name}
      </Typography>
      <Typography variant="body2" color={SALTBOX_BLUE} sx={{ mb: 2, height: '38px' }}>
        {description}
      </Typography>
      <Typography variant="subtitle1" color={BISCAY} sx={{ mb: 3 }}>
        {priceLabel}
      </Typography>
      {!hideButton && (
        <Button
          color="primary"
          variant="contained"
          sx={{ mb: 3, width: '100%' }}
          fullWidth
          disabled={isActive}
          onClick={onClick}
        >
          {isActive ? 'Current plan' : buttonName}
        </Button>
      )}
      {featuresTitle && (
        <Typography variant="body2" color={SALTBOX_BLUE} sx={{ mb: 3 }}>
          {featuresTitle}
        </Typography>
      )}
      <Features>
        {availableFeatures.map((feature) => {
          return (
            <Typography
              key={feature.name}
              variant="subtitle3"
              color={BISCAY}
              sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <Image alt="check-icon" src={CheckIcon} />
              {feature.name.includes(':') ? feature.name.split(':')[1] : feature.name}
            </Typography>
          );
        })}
        {comingSoonTitle && comingSoonFeatures.length && (
          <Typography variant="body2" color={SALTBOX_BLUE} sx={{ mb: 1 }}>
            {comingSoonTitle}
          </Typography>
        )}
        {comingSoonFeatures &&
          comingSoonFeatures.map((feature) => {
            return (
              <Typography
                key={feature.name}
                variant="subtitle3"
                color={BISCAY}
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <Image alt="check-icon" src={CheckIcon} />
                {feature.name.includes(':') ? feature.name.split(':')[1] : feature.name}
              </Typography>
            );
          })}
      </Features>
    </Container>
  );
};

export default Pricing;
