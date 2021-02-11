# base image
FROM node:12.16.1

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@9.0.4

# add app
COPY . /app

# non-root user
ENV USER=sonarscanner
ENV UID=12345
ENV GID=23456
RUN addgroup --gid $GID sonarscanner
RUN adduser \
    --disabled-password \
    --gecos "" \
    --ingroup "$USER" \
    --no-create-home \
    --uid "$UID" \
    "$USER"

ARG SCANNER_VERSION=4.5.0.2216
ENV SCANNER_FILE=sonar-scanner-cli-${SCANNER_VERSION}-linux.zip
ENV SCANNER_EXPANDED_DIR=sonar-scanner-${SCANNER_VERSION}-linux
RUN curl --insecure -o ${SCANNER_FILE} \
    -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/${SCANNER_FILE} && \
	unzip -q ${SCANNER_FILE} && \
	rm ${SCANNER_FILE} && \
	mv ${SCANNER_EXPANDED_DIR} /usr/lib/sonar-scanner && \
	ln -s /usr/lib/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner

ENV SONAR_RUNNER_HOME=/usr/lib/sonar-scanner

COPY sonar-runner.properties /usr/lib/sonar-scanner/conf/sonar-scanner.properties

# ensure Sonar uses the provided Java for musl instead of a borked glibc one
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /usr/lib/sonar-scanner/bin/sonar-scanner

# Separating ENTRYPOINT and CMD operations allows for core execution variables to
# be easily overridden by passing them in as part of the `docker run` command.
# This allows the default /app base dir to be overridden by users as-needed.
CMD ["sonar-scanner", "-Dsonar.projectBaseDir=/app"]
