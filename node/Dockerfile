# EXCEPTION: Candidate repositories cannot rely on access to Avature's internal ECR registry.
FROM node:24.20.0-alpine3.24@sha256:e67514e5d0f6c46656005e1b693b2ec9d52e80b641307de684d4a015ba7a4eaf

LABEL maintainer="Avature Engineering" \
      version="1.0.0"

ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_IGNORE_SCRIPTS=true

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci \
    && npm cache clean --force \
    && mkdir -p /app/data /tmp/job-notifier \
    && chown -R node:node /app /tmp/job-notifier

COPY --chown=node:node --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY --chown=node:node . .
RUN find / -xdev -type f \( -perm -4000 -o -perm -2000 \) -exec chmod a-s {} +

USER node

EXPOSE 3000

HEALTHCHECK --interval=5s --timeout=3s --start-period=30s --retries=30 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(response => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1));"]

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
