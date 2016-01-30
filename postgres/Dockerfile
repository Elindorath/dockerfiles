FROM elindorath/alpine
MAINTAINER Joachim Westphal "elindorath@gmail.com"

ENV PG_APP_HOME="/etc/docker-postgresql" \
  PG_VERSION=9.4 \
  PG_USER=postgres \
  PG_HOME=/var/lib/postgresql \
  PG_RUNDIR=/run/postgresql \
  PG_LOGDIR=/var/log/postgresql \
  PG_CERTDIR=/etc/postgresql/certs

ENV PG_BINDIR=/usr/bin \
  PG_DATADIR=${PG_HOME}/${PG_VERSION}/main

RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk update \
  && apk add --update \
    shadow \
    acl \
    sudo \
    bash \
    "postgresql<9.5" \
    "postgresql-contrib<9.5" \
    "postgresql-client<9.5" \
  # && ln -sf ${PG_DATADIR}/postgresql.conf /var/lib/postgresql/${PG_VERSION}/main/postgresql.conf \
  && ln -sf ${PG_DATADIR}/pg_hba.conf /var/lib/postgresql/${PG_VERSION}/main/pg_hba.conf \
  && ln -sf ${PG_DATADIR}/pg_ident.conf /var/lib/postgresql/${PG_VERSION}/main/pg_ident.conf \
  && rm -rf ${PG_HOME}
  # && apk del \
    # shadow \
    # acl \
    # bash \
    # sudo

COPY runtime/ ${PG_APP_HOME}/
COPY entrypoint.sh /sbin/entrypoint.sh
RUN chmod 755 /sbin/entrypoint.sh

EXPOSE 5432/tcp
VOLUME ["${PG_HOME}", "${PG_RUNDIR}"]
WORKDIR ${PG_HOME}
ENTRYPOINT ["/sbin/entrypoint.sh"]
