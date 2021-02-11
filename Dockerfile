# base image
FROM node:15.8.0

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

ENV SONAR_SCANNER_VERSION=4.3.0.2102
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk/jre
ENV SONAR_SCANNER_OPTS="-Xmx512m -Dsonar.host.url=https://8080-06cd0fab-2ba3-45d4-accd-40d5f4cf86d8.asia-southeast1.cloudshell.dev"
ENV PATH $PATH:/sonar-scanner/bin:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

ADD "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip" /

RUN set -x \
        && apk add --no-cache unzip openjdk8-jre \
        && unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip \
        && ln -s /sonar-scanner-${SONAR_SCANNER_VERSION} /sonar-scanner \
        && rm -f sonar-scanner-cli-*.zip

CMD ["sonar-scanner", "-Dsonar.projectBaseDir=/app"]