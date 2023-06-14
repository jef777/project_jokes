# Jokes WebApp Docker Guide

## Installation Guide.

```sh
# Clone the repository
git clone  https://github.com/jef777/project_jokes.git

```

### System Setup

#### Edit .env file

```sh
cd project_jokes
cp .env.example ./.env

```

# Run using Docker compose

```sh
# Run script a the root of the project

docker compose up

# Run in detached mode
docker compose up -d

```

# Run Individual Docker Image

```sh
# Run script a the root of the project
# Build the Docker image with tag `jokes-app-image` passing the path to the .env file using the --build-arg flag
docker build --build-arg ENV_FILE=.env -t jokes-app-image .

# Check the image is created successfully
docker images | grep jokes-app-image

# Run the image by Mapping port 5000 inside the container with  80 on current host
docker run -p 3000:80 jokes-app-image

# Run the image in detached mode by Mapping port 80 inside the container with 3000 on current host
docker run -p 3000:80 -d jokes-app-image

# Get container ID
docker ps | grep jokes-app-image

# Stop the container
docker stop {id} # Replace '#{id}' with container ID

```
