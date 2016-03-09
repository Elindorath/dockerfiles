FROM elindorath/alpine
MAINTAINER Joachim Westphal "elindorath@gmail.com"

# Choose node and npm version
ENV NODE_VERSION=v4.2.6 \
  NPM_VERSION=3

# Install build dependencies
RUN apk add --no-cache -t build-dependencies \
    curl \
    python \
    make \
    gcc \
    g++ \
    linux-headers

# Install node and npm
RUN curl -sSL https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}.tar.gz | tar -xz \
  && cd /node-${NODE_VERSION} \
  && ./configure --prefix=/usr --without-snapshot --fully-static \
  && make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) \
  && make install \
  && cd / \
  && npm install -g npm@${NPM_VERSION}

# Clean unnecessary packages
RUN apk del \
    build-dependencies \
  && rm -rf \
    /etc/ssl \
    /usr/include \
    /usr/share/man \
    /tmp/* \
    /node-${NODE_VERSION} \
    /root/.npm \
    /root/.node-gyp \
    /usr/lib/node_modules/npm/man \
    /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html

# Set NODE_PATH
ENV NODE_PATH=/usr/lib/node_modules

CMD ["/usr/bin/node"]
