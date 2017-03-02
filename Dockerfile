from nginx:1.11.10-alpine
ARG LISTEN="8080"
ARG REFRESH="10s"
ARG TIMEOUT="30"
ARG MAX_FSIZE="20m"
ENV LISTEN=$LISTEN
ENV REFRESH=$REFRESH
ENV TIMEOUT=$TIMEOUT
ENV MAX_FSIZE=$MAX_FSIZE

RUN rm /etc/nginx/conf.d/*
COPY proxy.template /etc/nginx/conf.d/
RUN envsubst '$$LISTEN $$REFRESH $$TIMEOUT $$MAX_FSIZE' < /etc/nginx/conf.d/proxy.template > /etc/nginx/conf.d/proxy.conf
RUN mkdir /www/
COPY ldracquisitions/ /www/
