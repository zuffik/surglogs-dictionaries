import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Breadcrumbs, Button, Card, Grid, List, Typography, Link as MuiLink } from '@material-ui/core'
import { Dictionary } from '../../types/Dictionary'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux/State'
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab'
import { DictionaryListItem } from './DictionaryListItem'
import { actions } from '../../redux/Actions'

interface Props {
    dictionaries: Dictionary[]
    onDeleteItem: (dictionary: Dictionary) => void;
}

const useStyles = makeStyles(() => ({
  card: {
    width: '30%'
  }
}))

export const DictionaryList: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const styles = useStyles(props)
  return (
        <>
          <Box mb={2}>
            <Breadcrumbs>
              <MuiLink component={Link} to='/'>Home</MuiLink>
            </Breadcrumbs>
          </Box>
          <Typography variant='h3'>Dictionaries</Typography>
          {props.dictionaries.length > 0 ? (
            <Card classes={{ root: styles.card }} elevation={3}>
              <List>
                {props.dictionaries.map(item => (
                  <DictionaryListItem key={item.id} dictionary={item} onDelete={() => props.onDeleteItem(item)} />
                ))}
              </List>
            </Card>
          ) : (
            <Alert severity='info'>
              <AlertTitle>Info</AlertTitle>
                    No dictionaries found
            </Alert>
          )}
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  data-testid='dictionary-create'
                  color='primary'
                  variant='contained'
                  component={Link}
                  to='/dictionary/create'
                >
                            Create dictionary
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
  )
}

interface ReduxInputProps extends Partial<Props> {
}

export const DictionaryListRedux: React.FC<ReduxInputProps> = (
  props: ReduxInputProps
): React.ReactElement => {
  const dispatch = useDispatch()
  const dictionaries = useSelector((state: State) => state.dictionaries)
  const onDeleteItem = (item: Dictionary) => dispatch(actions.deleteDictionary(item))
  return <DictionaryList {...props} dictionaries={dictionaries} onDeleteItem={onDeleteItem} />
}
