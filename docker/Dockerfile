FROM debian:10
COPY install_required_packages.sh /tmp/

ARG UNAME=dev
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME

RUN /bin/bash /tmp/install_required_packages.sh --linux --windows

USER $UNAME

CMD /bin/bash /home/dev/volume/build.sh