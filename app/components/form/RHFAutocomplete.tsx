/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  SxProps,
  TextField,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { ReactNode, useCallback, useId } from 'react'

import { useTranslation } from 'next-i18next'

export interface AutocompleteOption {
  value: string | number
  label: string
  subLabel?: string
  subLabelName?: string
  labelOptions?: any
}

type Props = {
  label: string
  name: string
  options: AutocompleteOption[]
  noOptionsText?: string
  sx?: SxProps
  loading?: boolean
  disabled?: boolean
  disableClearable?: boolean
  onChange?: (value: string) => void
}

export default function RHFAutocomplete({
  name,
  label,
  options,
  ...props
}: Props) {
  const { control } = useFormContext()
  const { t } = useTranslation()

  const id = useId()

  const getOptionLabel = (value: string) =>
    options.find((item) => item.value === value)

  const filterOptions = useCallback(
    (options: AutocompleteOption[], inputValue: string) => {
      const lowerInputValue = inputValue.toLowerCase()

      return options.filter((option) => {
        const label = option?.label?.toLowerCase()
        const subLabel = (option?.subLabel ?? '').toLowerCase()

        return (
          label.includes(lowerInputValue) || subLabel.includes(lowerInputValue)
        )
      })
    },
    []
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { error },
        formState: { defaultValues },
      }) => (
        <Autocomplete
          {...field}
          id={id}
          autoHighlight
          size='small'
          noOptionsText={props.noOptionsText}
          loading={props.loading}
          disabled={props.disabled || props.loading}
          clearOnBlur={!props.disableClearable}
          clearOnEscape={!props.disableClearable}
          disableClearable={props.disableClearable}
          sx={{ width: '100%', ...props.sx }}
          value={field.value ?? null}
          options={options}
          filterOptions={(options, { inputValue }) =>
            filterOptions(options, inputValue)
          }
          onChange={(_, item, reason) => {
            reason === 'clear'
              ? field.onChange(defaultValues ? defaultValues[name] : null)
              : field.onChange(item?.value)
            props.onChange?.(item?.value)
          }}
          renderInput={(params: any) =>
            (
              <>
                <TextField
                  {...params}
                  disabled={props.loading}
                  error={!!error}
                  label={t(label)}
                />
                <FormHelperText error={!!error} sx={{ whiteSpace: 'nowrap' }}>
                  {t(error?.message ?? ' ')}
                </FormHelperText>
              </>
            ) as ReactNode
          }
          getOptionKey={(option) => option.value}
          getOptionLabel={(option) => {
            const optionSelected = getOptionLabel(option)

            return t(
              optionSelected?.label ?? ' ',
              optionSelected?.labelOptions
            ) as string
          }}
          isOptionEqualToValue={(option, value) => option.value === value}
          renderOption={(props, option) => {
            const subLabelName = option?.subLabelName
              ? `${t(option?.subLabelName)}: `
              : ''

            const subLabel =
              option?.subLabel && `${subLabelName}${option?.subLabel}`

            const label = t(option.label, option?.labelOptions) as string

            return (
              <Box {...props} key={option.value} component='li'>
                <List dense disablePadding>
                  <ListItem disablePadding>
                    <ListItemText primary={label} secondary={subLabel} />
                  </ListItem>
                </List>
              </Box>
            )
          }}
        />
      )}
    />
  )
}
