# Synced

## Development

You will need to have [Docker](https://www.docker.com/community-edition) installed on your system.

To run the development version:

```sh
$ docker-compose up
```

## API Key

In order to use the YouTube Data API, you will need to get an [api key](https://developers.google.com/youtube/v3/getting-started). You can then set the api key as an environment variable.

```sh
$ export YOUTUBE_API_KEY=your_api_key
```

## Deployment

You can use [Heroku](https://www.heroku.com/) to deploy the app. Before deploying, you will need to first add the [Redis](https://elements.heroku.com/addons/heroku-redis) add-on to your app.

```sh
$ heroku addons:create heroku-redis:hobby-dev -a your_app_name
```

Push the `master` branch to the `heroku` remote to deploy the app:
```sh
git push heroku master
```