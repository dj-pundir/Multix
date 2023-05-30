import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useMultiProxy } from '../../contexts/MultiProxyContext'
import { AccountNames, useAccountNames } from '../../contexts/AccountNamesContext'
import AccountEditName, { OnChangeArgs } from '../AccountEditName'

interface Props {
  onClose: () => void
  className?: string
}

const EditNames = ({ onClose, className }: Props) => {
  const { selectedMultiProxy } = useMultiProxy()
  const { addNames } = useAccountNames()
  const [newNames, setNewNames] = useState<AccountNames>({})
  const signatories: string[] = useMemo(() => {
    if (!selectedMultiProxy) return []

    const sig = new Set<string>()
    selectedMultiProxy?.multisigs.forEach(({ signatories }) => {
      signatories?.forEach((signatory) => {
        sig.add(signatory)
      })
    })

    return Array.from(sig.values())
  }, [selectedMultiProxy])

  const onSave = useCallback(async () => {
    addNames(newNames)
    onClose()
  }, [addNames, newNames, onClose])

  const onNameChange = useCallback(
    ({ name, address }: OnChangeArgs) => {
      const toBePersisted = {
        ...newNames,
        [address]: name
      }
      setNewNames(toBePersisted)
    },
    [newNames]
  )

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      open
      onClose={onClose}
      className={className}
    >
      <DialogTitle>Edit names</DialogTitle>
      <DialogContent className="generalContainer">
        <Grid container>
          <Grid
            item
            xs={12}
          >
            {!!selectedMultiProxy?.proxy && (
              <>
                <h4>Proxy</h4>
                <AccountEditName
                  className="accountEdition"
                  address={selectedMultiProxy.proxy || ''}
                  onNameChange={onNameChange}
                />
              </>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <h4>
              {!!selectedMultiProxy && selectedMultiProxy.multisigs.length > 1
                ? 'Multisigs'
                : 'Multisig'}
            </h4>
            {selectedMultiProxy?.multisigs.map(({ address }) => (
              <AccountEditName
                key={address}
                className="accountEdition"
                address={address}
                onNameChange={onNameChange}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <h4>Signatories</h4>
            {signatories.map((signatory) => (
              <AccountEditName
                key={signatory}
                className="accountEdition"
                address={signatory}
                onNameChange={onNameChange}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            className="buttonContainer"
          >
            <Button onClick={onSave}>Save</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default styled(EditNames)`
  .buttonContainer {
    text-align: right;
  }

  .accountEdition {
    margin-bottom: 1rem;
    align-items: center;
  }
`
