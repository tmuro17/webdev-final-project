# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :backend_final,
  ecto_repos: [Backend.Repo]

# Configures the endpoint
config :backend_final, BackendWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "VJfKlRP1VffPGOjURDvfqKV3AAzdngJQ35bp/MKhjrSRiGENk/VRUnyqKIqND1fW",
  render_errors: [view: BackendWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Backend.PubSub,
  live_view: [signing_salt: "450qxGR+"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
