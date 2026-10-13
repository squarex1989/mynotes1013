FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY . /srv/

# The entry page ships under a name Caddy won't pick up as a directory index.
RUN cp "/srv/My Notes - Skills.dc.html" /srv/index.html

EXPOSE 8080
