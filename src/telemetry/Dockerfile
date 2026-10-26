# Agent de telemetrie Datalys.
# Tourne dans SON propre conteneur et partage la netns du conteneur 'ctf'
# (voir docker-compose: network_mode "service:ctf"). Le heartbeat circule donc
# sur le 'lo' partage (capturable via tcpdump depuis ctf), mais le PROCESS vit
# dans une autre PID/mount namespace : un root dans 'ctf' ne peut ni le voir
# (ps), ni l'attacher (ltrace/strace/gdb), ni lire ce binaire.

# --- build stage -------------------------------------------------------------
FROM debian:bullseye AS build

# bullseye est archive : rebasculer apt sur archive.debian.org
RUN cp /etc/apt/sources.list /etc/apt/sources.list.tmp && \
    sed -i 's/\/deb\./\/archive\./g' /etc/apt/sources.list && \
    cat /etc/apt/sources.list.tmp >> /etc/apt/sources.list

RUN apt-get update && apt-get install -y build-essential

COPY datalys-agent.c /tmp/datalys-agent.c
RUN gcc -O2 -s -o /datalys-agent /tmp/datalys-agent.c

# --- runtime stage -----------------------------------------------------------
FROM debian:bullseye-slim

# agent non-root (defense en profondeur ; le port 8080 ne requiert pas root)
RUN groupadd -r telemetry && useradd -r -g telemetry -s /usr/sbin/nologin telemetry

COPY --from=build /datalys-agent /usr/local/bin/datalys-agent
RUN chmod 755 /usr/local/bin/datalys-agent

USER telemetry
CMD ["/usr/local/bin/datalys-agent"]
