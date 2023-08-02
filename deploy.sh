#/bin/bash

# コンテナビルド
docker-compose build

C=`docker-compose ls | grep flow-visu-front | wc -l | awk '{print $1}'`
if [ "$C" -ge 1 ]; then
  # コンテナが起動していた場合は再起動する
  docker-compose down
fi

docker-compose up -d
