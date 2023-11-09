# FROM node:20 as nodejs
# FROM jenkins/jenkins:lts
# COPY --from=nodejs /usr/local/bin/node /usr/local/bin/node
# USER root
# RUN apt-get update && apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
# RUN apt-get install -y nodejs
# RUN curl -sL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
# RUN npm install -g @angular/cli
# USER jenkins

FROM node:20 as nodejs
FROM jenkins/jenkins:lts
COPY --from=nodejs /usr/local/bin/node /usr/local/bin/node
USER root
RUN apt-get update && apt-get install -y curl unzip

# Install the AWS CLI
RUN curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf aws awscliv2.zip

# Install Node.js and Angular CLI
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g @angular/cli

USER jenkins
