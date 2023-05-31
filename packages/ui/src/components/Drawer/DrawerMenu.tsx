import IconButton from '@mui/material/IconButton'
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { Link } from 'react-router-dom'
import ListItemText from '@mui/material/ListItemText'
import { useAccounts } from '../../contexts/AccountsContext'
import { useMultiProxy } from '../../contexts/MultiProxyContext'
import { styled } from '@mui/material/styles'
import NetworkSelection from '../NetworkSelection'
import MultiProxySelection from '../MultiProxySelection'
import { ROUTES } from '../../pages/routes'
import { isEmptyArray } from '../../utils'
import { useMemo } from 'react'

interface DrawerMenuProps {
  handleDrawerClose: () => void
}

function DrawerMenu({ handleDrawerClose }: DrawerMenuProps) {
  const { ownAccountList } = useAccounts()
  const { multiProxyList } = useMultiProxy()
  const isAccountConnected = useMemo(() => !isEmptyArray(ownAccountList), [ownAccountList])
  const isAtLeastOneMultiProxy = useMemo(() => !isEmptyArray(multiProxyList), [multiProxyList])
  const { isAllowedToConnectToExtension, allowConnectionToExtension } = useAccounts()

  return (
    <>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {!isAllowedToConnectToExtension && (
          <ListItem disablePadding>
            <ListItemButton onClick={allowConnectionToExtension}>Connect</ListItemButton>
          </ListItem>
        )}
        <ListItem>
          <MultiProxySelection />
        </ListItem>
        <ListItem>
          <NetworkSelection />
        </ListItem>
        {ROUTES.map(({ path, name, isDisplayWhenNoMultiProxy, isDisplayWhenNoWallet }) =>
          (isAtLeastOneMultiProxy || isDisplayWhenNoMultiProxy) &&
          (isAccountConnected || isDisplayWhenNoWallet) ? (
            <ListItem
              key={name}
              disablePadding
            >
              <ListItemButton
                onClick={handleDrawerClose}
                component={Link}
                to={path}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ) : null
        )}
      </List>
    </>
  )
}

const DrawerHeader = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 8px;
  justify-content: flex-start;
`

export default DrawerMenu
