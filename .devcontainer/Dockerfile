FROM node:25-bookworm

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        ca-certificates \
        curl \
        git \
        zsh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm

COPY ./src/headscale /etc/headscale
COPY ./src/bootstrap /usr/bin/bootstrap

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && chsh -s $(which zsh)

# Install Headscale
ARG HEADSCALE_VERSION="0.27.0"
ARG HEADSCALE_URL="https://github.com/juanfont/headscale/releases/download/v${HEADSCALE_VERSION}/headscale_${HEADSCALE_VERSION}_linux_amd64"

RUN wget -O /usr/bin/headscale "${HEADSCALE_URL}" \
    && chmod +x /usr/bin/headscale
