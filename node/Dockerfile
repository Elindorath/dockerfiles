FROM elindorath/alpine
MAINTAINER Joachim Westphal "elindorath@gmail.com"

ENV NODE_VERSION=v4.2.6 NPM_VERSION=3

RUN apk add --update \
    curl \
    python \
    make \
    gcc \
    g++ \
    linux-headers \
  && curl -sSL https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}.tar.gz | tar -xz \
  && cd /node-${NODE_VERSION} \
  && ./configure --prefix=/usr --without-snapshot --fully-static \
  && make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) \
  && make install \
  && cd / \
  && npm install -g npm@${NPM_VERSION} \
  && apk del \
    curl \
    python \
    make \
    gcc \
    g++ \
    linux-headers \
  && rm -rf \
    /etc/ssl \
    /node-${NODE_VERSION} \
    /usr/include \
    /usr/share/man \
    /tmp/* \
    /var/cache/apk/* \
    /root/.npm \
    /root/.node-gyp \
    /usr/lib/node_modules/npm/man \
    /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html

CMD ["/bin/sh"]
