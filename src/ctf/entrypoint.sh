#!/bin/bash
# L'agent de telemetrie tourne desormais dans le conteneur 'telemetry' (netns
# partagee) : le heartbeat reste capturable sur 'lo' mais hors de portee ptrace.
exec /usr/sbin/sshd -D
