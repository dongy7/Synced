import React from 'react'
import Grid from '@material-ui/core/Grid'
import InputField from '../components/InputField'
import { parseUrl } from '../utils'
import { getId, createId } from '../api'

class Landing extends React.Component {
  handleUrl(url) {
    const { isUrl, value } = parseUrl(url)
    if (!isUrl) {
      this.props.history.push(`/channel/${value}`)
    } else {
      createId(value).then(res => {
        this.props.history.push(`/channel/${res.id}`)
      })
    }
  }

  render() {
    return (
      <div className="landing">
        <Grid container>
          <Grid item xs={12}>
            <h1 className="field-title">YouTube Sync</h1>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <InputField onEntered={url => this.handleUrl(url)} />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    )
  }
}

export default Landing
