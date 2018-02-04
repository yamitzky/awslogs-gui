# awslogs-gui

GUI for AWS CloudWatch Logs, inspired by [awslogs](https://github.com/jorgebastida/awslogs)

![Screenshot](https://media.giphy.com/media/3ohs4hGRiuXNlaw6Oc/giphy.gif)

## Setup

It provides only GUI(HTML/JS/CSS) and needs [awslogs-api](https://github.com/yamitzky/awslogs-api) as API backend.
You need to set environment `AWS_blah_blah_blah` or mount `~/.aws` to tell your credentials to the `awslogs-api`.

```
docker run -it --rm -d -p 5000:5000 -v "$HOME/.aws:/root/.aws" -e CORS_ALLOW_ORIGIN=http://localhost:3000 yamitzky/awslogs-api
```

```
git clone https://github.com/yamitzky/awslogs-gui.git
cd awslogs-gui
docker build -t awslogs-gui --build-arg API_BASE_URL=http://localhost:5000/ .
docker run -it --rm -d -p 3000:80 awslogs-gui
```

