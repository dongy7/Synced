import React from 'react'
import Grid from '@material-ui/core/Grid'
import InputField from '../components/InputField'
import {parseUrl} from '../utils'

class Landing extends React.Component {
  render() {
    return (
      <div className="landing">
        <Grid container>
          <Grid item xs={12}>
            <h1 className="field-title">YouTube Sync</h1>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <InputField
              onEntered={(url) => this.props.history.push(`/channel/${parseUrl(url)}`)}
            />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    )
  }
}

export default Landing