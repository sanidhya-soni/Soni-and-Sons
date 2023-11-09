# FROM bitnami/jenkins
# USER root
# RUN apt-get update
# RUN apt-get install -y nodejs
# RUN apt-get install -y npm

# Use the official Jenkins LTS image as a base
# FROM jenkins/jenkins:lts

# # Switch to the root user
# USER root

# # Install Node.js and npm (Replace "14.x" with your desired LTS version)
# RUN apt-get update && apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
# RUN apt-get install -y nodejs
# RUN curl -sL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

# # Install the Angular CLI (if needed)
# RUN npm install -g @angular/cli

# # Switch back to the Jenkins user
# USER jenkins

FROM node:20 as nodejs

FROM jenkins/jenkins:lts

COPY --from=nodejs /usr/local/bin/node /usr/local/bin/node

# Switch to the root user
USER root

# Install Node.js and npm (Replace "14.x" with your desired LTS version)
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN curl -sL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

# Install the Angular CLI (if needed)
RUN npm install -g @angular/cli

# Switch back to the Jenkins user
USER jenkins

# FROM jenkins/jenkins:lts-jdk17
# # if we want to install via apt
# USER root
# RUN apt-get update
# # drop back to the regular jenkins user - good practice
# USER jenkins