import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import {getVideoInfo} from '../api'

class VideoInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    getVideoInfo(this.props.id).then(res => {
      console.log(res)
      this.setState({
        title: res.items[0].snippet.title
      })
    })
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.state.title}
          action={
            <IconButton>
              <ShareIcon />
            </IconButton>
          }
        >
        </CardHeader>
      </Card>
    )
  }
}

export default VideoInfo