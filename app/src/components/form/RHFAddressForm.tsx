'use client'

import { Grid2 as Grid } from '@mui/material'
import RHFTextField from 'src/components/form/RHFTextField'
import MEXICO_STATES from 'src/constants/mexicoStates.json'
import RHFAutocomplete, { AutocompleteOption } from './RHFAutocomplete'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { orderBy } from 'lodash'
import { IState } from 'src/types/Address'
import { NUMERIC_MASK } from 'src/constants/inputMasks'

type Props = {
  fullScreen?: boolean
  disabled?: boolean
}

export default function RHFAddressForm(props: Props) {
  const [citiesOptions, setCitiesOptions] = useState<AutocompleteOption[]>([])
  const { watch } = useFormContext()

  const STATES = MEXICO_STATES as IState

  const stateSelected: string = watch(
    `address.state`,
    'Morelos' // cspell:disable-line
  )

  const statesOptions = Object.keys(MEXICO_STATES)
    .sort()
    .map((state) => ({
      value: state,
      label: state,
    }))

  useEffect(() => {
    const stateFormatted = stateSelected && stateSelected.trim()

    if (STATES[stateFormatted]) {
      const options = STATES[stateFormatted].map((state) => ({
        value: state.city,
        label: state.city,
      }))
      setCitiesOptions(orderBy(options, ['label'], ['asc']))
    } else setCitiesOptions([])
  }, [stateSelected])

  return (
    <Grid
      container
      columnSpacing={{ xs: 1, md: 2 }}
      rowSpacing={{ xs: 1, md: 1 }}
    >
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <RHFAutocomplete
          name='address.state'
          label='Estado'
          capitalize
          options={statesOptions ?? []}
          sx={{ minWidth: '100%' }}
          disabled={props.disabled}
          noOptionsText='Seleccionar estado'
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <RHFAutocomplete
          name='address.city'
          label='Ciudad'
          capitalize
          options={citiesOptions ?? []}
          sx={{ minWidth: '100%' }}
          disabled={props.disabled}
          noOptionsText='Seleccionar ciudad'
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <RHFTextField
          size='small'
          name='address.address'
          label='Domicilio'
          type='text'
          capitalize
          sx={{ minWidth: '100%' }}
          disabled={props.disabled}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <RHFTextField
          size='small'
          name='address.zipCode'
          label='Código Postal'
          type='text'
          disabled={props.disabled}
          maskoptions={{ mask: NUMERIC_MASK }}
        />
      </Grid>
    </Grid>
  )
}
