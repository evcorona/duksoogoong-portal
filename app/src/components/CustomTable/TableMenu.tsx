/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client'

import { DeleteOutline, EditOutlined, MoreVert } from '@mui/icons-material'
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material'
import CustomDialog from 'src/components/CustomDialog'
import { useTranslation } from 'next-i18next'
import { MouseEvent, useState } from 'react'
import { TableMenuProps } from '@/src/types/table/Table'

interface Props extends TableMenuProps {
  data: any
}

export default function TableMenu(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const { t } = useTranslation()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'menu-popover' : undefined

  const menuItems = [
    {
      icon: <EditOutlined />,
      label: 'Editar',
      action: props.editAction,
    },
    {
      icon: <DeleteOutline />,
      label: 'Remover',
      requireConfirmation: true,
      action: props.deleteAction,
      color: 'red',
    },
  ]

  if (props.extraButton) menuItems.splice(1, 0, props.extraButton)

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          color: 'text.secondary',
        }}
      >
        <MoreVert />
      </Button>
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuList dense>
          {menuItems.map((item, index) => (
            <Box key={index}>
              <MenuItem
                sx={{ color: item.color }}
                onClick={() => {
                  if (item.requireConfirmation) setOpenDialog(true)
                  else {
                    item.action(props.data)
                    handleClose()
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{t(item.label)}</ListItemText>
              </MenuItem>
              <CustomDialog
                open={openDialog}
                setOpen={setOpenDialog}
                item={props.name ?? ''}
                itemName={`${props.data?.name ?? ''} ${
                  props.data?.last_name ?? ''
                }`}
                isLoading={false}
                type="delete"
                onClick={() => {
                  item.action(props.data)
                  handleClose()
                }}
              />
            </Box>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
