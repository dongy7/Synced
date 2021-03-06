import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Alert from './Alert'
import { getVideoInfo } from '../api'

class VideoInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      alertOpen: false
    }
  }

  componentDidMount() {
    getVideoInfo(this.props.id).then(res => {
      this.setState({
        title: res.title
      })
    })
  }

  render() {
    return (
      <div className="player-info">
        <Card>
          <CardHeader
            title={this.state.title}
            action={
              <CopyToClipboard text={this.props.id}>
                <IconButton
                  onClick={() => {
                    this.setState({
                      alertOpen: true
                    })
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </CopyToClipboard>
            }
          />
        </Card>
        <Alert
          open={this.state.alertOpen}
          message="Code copied to clipboard"
          onClose={() =>
            this.setState({
              alertOpen: false
            })
          }
        />
      </div>
    )
  }
}

export default VideoInfo
