ONBUILD ADD . /src/app
ONBUILD RUN /usr/local/bin/npm run build:prod --prod --dir /

docker build -t lethiux/pictly .
