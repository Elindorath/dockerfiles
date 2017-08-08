FROM alpine:3.6
MAINTAINER Joachim Westphal "elindorath@gmail.com"

ENV NODE_VERSION=v6.11.2 \
  NPM_VERSION=3.10.10 \
  NODE_PATH=/usr/lib/node_modules

RUN apk add --no-cache -t build-dependencies \
    curl \
    python \
    make \
    gcc \
    g++ \
    paxctl \
    linux-headers \
  && curl \
    -o node-${NODE_VERSION}.tar.gz \
    -sSL https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}.tar.gz \
  && tar -xzf node-${NODE_VERSION}.tar.gz \
  && cd /node-${NODE_VERSION} \
  && export GYP_DEFINES="linux_use_gold_flags=0" \
  && ./configure --prefix=/usr --fully-static --without-snapshot \
  && make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) -C out mksnapshot BUILDTYPE=Release \
  && paxctl -cm out/Release/mksnapshot \
  && make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) \
  && make install \
  && paxctl -cm /usr/bin/node \
  && cd / \
  && npm install -g npm@${NPM_VERSION} \
  && find /usr/lib/node_modules/npm -name test -o -name .bin -type d | xargs rm -rf \
  && apk del \
    build-dependencies \
  && rm -rf \
    /etc/ssl \
    /node-${NODE_VERSION} \
    /node-${VERSION}.tar.gz \
    /root/.node-gyp \
    /root/.npm \
    /tmp/* \
    /usr/include \
    /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html \
    /usr/lib/node_modules/npm/man \
    /usr/share/man \
    /var/cache/apk/*

CMD ["/usr/bin/node"]
