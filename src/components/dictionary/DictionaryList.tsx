import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Card, Grid, List, Typography } from '@material-ui/core'
import { Dictionary } from '../../types/Dictionary'
import { useSelector } from 'react-redux'
import { State } from '../../redux/State'
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab'
import { DictionaryListItem } from './DictionaryListItem'

interface Props {
    dictionaries: Dictionary[]
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
          <Typography variant='h3'>Dictionaries</Typography>
          {props.dictionaries.length > 0 ? (
            <Card classes={{ root: styles.card }} elevation={3}>
              <List>
                {props.dictionaries.map(item => (
                  <DictionaryListItem key={item.id} dictionary={item} />
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
  const dictionaries = useSelector((state: State) => state.dictionaries)
  return <DictionaryList {...props} dictionaries={dictionaries} />
}
