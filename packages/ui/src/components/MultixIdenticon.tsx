import { useCallback, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { ICON_SIZE, ICON_THEME } from '../constants'
import Identicon from '@polkadot/react-identicon'
import { IconButton } from '@mui/material'
import { IconTheme } from '@polkadot/react-identicon/types'

const DEFAULT_PLACEMENT = 'top'
const DEFAULT_TITLE = 'Address copied!'
const DEFAULT_AUTO_HIDE_DURATION = 2000

interface Props {
  value?: string
  theme?: IconTheme
  size?: number
  className?: string
}
const MultixIdenticon = ({ value, theme = ICON_THEME, size = ICON_SIZE, className }: Props) => {
  const [open, setOpen] = useState(false)
  const handleTooltipClose = useCallback(() => setOpen(false), [])
  const handleTooltipOpen = useCallback(() => setOpen(true), [])

  return (
    <Tooltip
      PopperProps={{ disablePortal: true }}
      onClose={handleTooltipClose}
      open={open}
      title={DEFAULT_TITLE}
      placement={DEFAULT_PLACEMENT}
      leaveDelay={DEFAULT_AUTO_HIDE_DURATION}
    >
      <IconButton>
        <Identicon
          onCopy={handleTooltipOpen}
          value={value}
          theme={theme}
          size={size}
          className={className}
        />
      </IconButton>
    </Tooltip>
  )
}

export default MultixIdenticon
