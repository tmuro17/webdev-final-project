FROM hexpm/elixir:1.12.0-erlang-22.0.1-alpine-3.12.0

COPY . .

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get

RUN apk add nodejs  \
    npm \
    python2  \
    make \
    g++ \
    python3

RUN mix compile

RUN cd assets && \
    npm install

RUN mix compile

RUN chmod +x ./docker_start.sh


CMD ["./docker_start.sh"]