import React, { FunctionComponent, useMemo } from 'react';
import moment from 'moment';
import { Box, CircularProgress } from '@mui/material';
import { FieldValues, useFormContext } from 'react-hook-form';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { BottomFormContainer, CancelContainer, FormContainer, UList } from './License.styled';

import { COAL_MINE, EXCLUSIVE_PLUM, ORANGEALICIOUS, VOLCANIC_SAND } from '@/constants/colors';
import Button from '@/components/Button/Button';
import LearnMore from '@/components/LearnMore/LearnMore';
import Typography from '@/components/Typography/Typography';
import { useAppSelector } from '@/redux/store';
import ControlledPassword from '@/components/controlledFields/ControlledPassword';
import { selectHasLicenseKey, selectRequestByType } from '@/redux/selectors/subscription.selector';

export interface LicenseProps {
  handleActivateLicense: (licenseKey: string) => void;
  handleCancelSubscription: () => void;
}

const License: FunctionComponent<LicenseProps> = ({
  handleActivateLicense,
  handleCancelSubscription,
}) => {
  const { isLoading, license, error } = useAppSelector(({ subscription }) => subscription);

  const hasLicenseKey = useAppSelector(selectHasLicenseKey());
  const cancelRequest = useAppSelector(selectRequestByType('cancel'));

  const formattedLicenseKey = useMemo<string | undefined>(
    () =>
      license?.licenseKey &&
      `${license?.licenseKey.slice(0, 4).toUpperCase()}************************************`,
    [license?.licenseKey],
  );

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<FieldValues>();

  const onSubmit = async ({ licenseKey }: FieldValues) => {
    handleActivateLicense(licenseKey);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer
        footerContent={
          <BottomFormContainer>
            <LearnMore href="" description="Learn more about" linkTitle="your license key" />
            {!hasLicenseKey && (
              <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
                Activate
              </Button>
            )}
          </BottomFormContainer>
        }
      >
        <Typography variant="subtitle2" color={VOLCANIC_SAND} sx={{ mb: 1 }}>{`You are on a ${
          license?.plan?.name || 'Community'
        } Plan`}</Typography>
        {hasLicenseKey ? (
          <>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM} sx={{ mt: 1, mb: 1 }}>
              License key
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {formattedLicenseKey}
            </Typography>
          </>
        ) : (
          <ControlledPassword
            rules={{ required: true }}
            control={control}
            label="License key"
            name="licenseKey"
            required
            error={!!error}
            onErrorText={error}
            data-test-id="license-key"
          />
        )}
      </FormContainer>
      {hasLicenseKey && (
        <>
          <FormContainer
            hasMargin
            footerContent={
              <BottomFormContainer>
                <LearnMore
                  href=""
                  description="If you’re having any issues with kubefirst, "
                  linkTitle="please reach out to us."
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelSubscription}
                  disabled={!!cancelRequest?.id}
                >
                  {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
                  Cancel subscription
                </Button>
              </BottomFormContainer>
            }
          >
            <Typography variant="subtitle2" color={VOLCANIC_SAND} sx={{ mb: 1 }}>
              Cancel my subscription
            </Typography>
            {!!cancelRequest?.id && (
              <CancelContainer>
                <InfoOutlinedIcon fontSize="small" htmlColor={ORANGEALICIOUS} />
                <Typography variant="body2" color={COAL_MINE}>
                  {`Your request to cancel your subscription was submitted ${moment(
                    cancelRequest.createdAt,
                  ).format('DD MMM YYYY, HH:MM:SS')}`}
                </Typography>
              </CancelContainer>
            )}

            <Typography variant="body2" color={VOLCANIC_SAND}>
              What to expect:
              <UList>
                <li>You will be downgraded to a Free Plan.</li>
                <li>
                  You will no longer be able to view and manage any physical clusters you may have
                  provisioned, this will only by possible via the kubefirst CLI.
                </li>
                <li>We will send you an email confirming that your account has been downgraded.</li>
                <li>You will still have access until the end of your current billing cycle.</li>
              </UList>
            </Typography>
          </FormContainer>
        </>
      )}
    </Box>
  );
};

export default License;
