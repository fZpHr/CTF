FROM debian:bullseye

ARG ROOT_PASS
ARG INTERN_USER
ARG INTERN_PASS

ENV ROOT_PASS=${ROOT_PASS}
ENV INTERN_USER=${INTERN_USER}
ENV INTERN_PASS=${INTERN_PASS}

# Keep the original sources.list pointing to deb.debian.org, rewrite the first ones to point to archive.debian.org, and append back the original
RUN cp /etc/apt/sources.list /etc/apt/sources.list.tmp
RUN sed -i 's/\/deb\./\/archive\./g' /etc/apt/sources.list
RUN cat /etc/apt/sources.list.tmp >> /etc/apt/sources.list

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y ssh wget build-essential libpam0g-dev libselinux1-dev vim tcpdump iproute2 && \
    apt-get remove -y sudo

RUN wget https://www.sudo.ws/dist/sudo-1.9.0.tar.gz && \
    tar -xzf sudo-1.9.0.tar.gz && \
    cd sudo-1.9.0 && \
    ./configure && \
    make && \
    make install && \
    cd .. && \
    rm -rf sudo-1.9.0 sudo-1.9.0.tar.gz

RUN echo "root:${ROOT_PASS}" | chpasswd

RUN groupadd -r intern && useradd -r -g intern -m -s /bin/bash ${INTERN_USER}

RUN mkdir /var/run/sshd && \
    echo 'PermitRootLogin no' >> /etc/ssh/sshd_config && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && \
    echo "AllowUsers root ${INTERN_USER}" >> /etc/ssh/sshd_config

RUN echo "${INTERN_USER}:${INTERN_PASS}" | chpasswd

RUN usermod -aG sudo ${INTERN_USER} && \
    echo "${INTERN_USER} ALL=(ALL) /usr/bin/sudoedit /home/hints/flag2_hint" >> /etc/sudoers

RUN mkdir /home/hints && \
    chmod 755 /home/hints && \
    chown root:root /home/hints

COPY /flag/flag2_hint /home/hints/flag2_hint
RUN chmod 660 /home/hints/flag2_hint && \
chown root:root /home/hints/flag2_hint
    
RUN ln -s /home/hints/flag2_hint /home/${INTERN_USER}/flag2_hint
COPY /flag/flag1 /home/${INTERN_USER}/flag1
COPY /flag/flag2 /root/flag2

RUN chmod 600 /root/flag2 && \
    chown root:root /root/flag2


COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY NOTES.txt /root/NOTES.txt
RUN chmod 700 /usr/local/bin/entrypoint.sh && \
    chmod 600 /root/NOTES.txt && \
    chown root:root /root/NOTES.txt

CMD ["/usr/local/bin/entrypoint.sh"]
