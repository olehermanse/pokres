FROM nginx:stable-alpine@sha256:aed99734248e851764f1f2146835ecad42b5f994081fa6631cc5d79240891ec9
COPY index.html /usr/share/nginx/html/index.html
