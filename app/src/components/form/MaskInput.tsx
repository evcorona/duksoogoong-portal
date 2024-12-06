import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

interface MaskedInputProps {
  onChange: (event: { target: { value: string } }) => void
  maskoptions: {
    mask: string
    blocks?: any
    unmask?: boolean
  }
  [key: string]: any
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (props, ref) => {
    const { onChange, maskoptions, ...other } = props

    if (!maskoptions?.mask) return null

    return (
      <IMaskInput
        {...other}
        mask={maskoptions.mask}
        blocks={maskoptions.blocks}
        unmask={maskoptions.unmask}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { value } })}
      />
    )
  },
)

MaskedInput.displayName = 'MaskedInput'
export default MaskedInput
