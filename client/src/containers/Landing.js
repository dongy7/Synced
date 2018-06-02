import React from 'react'
import Grid from '@material-ui/core/Grid'
import InputField from '../components/InputField'
import Alert from '../components/Alert'
import { parseUrl } from '../utils'
import { createId, validateId } from '../api'

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      open: false
    }
  }

  handleUrl(url) {
    const { isUrl, value } = parseUrl(url)
    if (!isUrl) {
      validateId(value).then(res => {
        if (res.valid) {
          this.props.history.push(`/channel/${value}`)
        } else {
          this.setState({ error: true, open: true })
        }
      })
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
            <h1 className="field-title">Synced</h1>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <InputField
              error={this.state.error}
              onEntered={url => this.handleUrl(url)}
            />
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Alert
          open={this.state.open}
          message="Invalid code"
          onClose={() => this.setState({ open: false })}
        />
      </div>
    )
  }
}

export default Landing
