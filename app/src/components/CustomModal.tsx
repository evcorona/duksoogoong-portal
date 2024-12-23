import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material'

type Props = {
  handleClose: () => void
  open: boolean
  title: string
  subtitle?: string
  children: React.ReactNode
  dialogActions: {
    actionLabel: string
    handleAction: () => void
    icon?: React.ReactNode
    isLoading?: boolean
    autoFocus?: boolean
  }[]
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
  sx?: SxProps
}
export default function CustomModal(props: Props) {
  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
      sx={{
        ...props.sx,
        '.MuiPaper-root': {
          maxWidth: props.maxWidth,
        },
      }}
    >
      <IconButton
        size="small"
        onClick={props.handleClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 15,
          cursor: 'pointer',
          color: 'gray',
        }}
      >
        <Close />
      </IconButton>
      <DialogTitle>
        {props.title}
        <Typography
          sx={{
            fontSize: 'small',
            color: 'lightgray',
            marginTop: 2,
          }}
        >
          {props.subtitle}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>{props.children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
        }}
      >
        {props?.dialogActions &&
          props.dialogActions.map((action, index) => (
            <LoadingButton
              key={index}
              loading={action?.isLoading}
              autoFocus={action?.autoFocus}
              onClick={action.handleAction}
              loadingPosition="start"
              startIcon={action?.icon}
              variant={action?.autoFocus ? 'contained' : 'text'}
            >
              {action.actionLabel}
            </LoadingButton>
          ))}
      </DialogActions>
    </Dialog>
  )
}
