'use client'

import {
  CheckboxButtonProps,
  CheckboxFeature,
} from '@/src/types/table/CheckboxFeature'
import {
  DeleteOutline,
  EditOutlined,
  FileDownloadOutlined,
} from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

import { Fragment } from 'react'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'next-i18next'

export default function CheckboxMenuBar(props: CheckboxFeature) {
  const { t } = useTranslation()

  const count = props.rowsChecked.length

  const buttonSettings = [
    {
      ...props.editProps,
      icon: EditOutlined,
      defaultText: 'edit',
      hide: !props.editProps,
    },
    {
      ...props.exportProps,
      icon: FileDownloadOutlined,
      defaultText: 'export',
      hide: !props.exportProps,
    },
    {
      ...props.deleteProps,
      icon: DeleteOutline,
      defaultText: 'delete',
      hide: !props.deleteProps,
    },
  ] as CheckboxButtonProps[]

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: '100%',
        backgroundColor: count > 0 ? '#E6F2ED' : 'transparent',
        padding: 2,
        paddingX: 4,
        display: 'flex',
      }}
    >
      <Typography
        sx={{
          color: count > 0 ? 'black' : 'GrayText',
        }}
      >
        {t('selected_counting', { count })}
      </Typography>
      <Stack
        direction="row"
        gap={2}
      >
        {buttonSettings.map((settings, i) => (
          <Fragment key={`checkBoxBarButton-${i}`}>
            {!settings.hide && (
              <LoadingButton
                loading={settings.isLoading}
                loadingPosition="start"
                startIcon={<settings.icon />}
                variant="outlined"
                onClick={settings.onClick}
                disabled={settings.isLoading || count === 0}
                sx={{
                  color: '#141414',
                  borderColor: '#141414',
                }}
              >
                {t(settings.buttonText ?? settings.defaultText)}
              </LoadingButton>
            )}
          </Fragment>
        ))}
      </Stack>
    </Stack>
  )
}
