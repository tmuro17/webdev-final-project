defmodule Backend.Repo do
  use Ecto.Repo,
    otp_app: :backend_final,
    adapter: Ecto.Adapters.Postgres
end
