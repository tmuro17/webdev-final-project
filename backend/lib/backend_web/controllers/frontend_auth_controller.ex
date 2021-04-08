defmodule BackendWeb.FrontendAuthController do
  use BackendWeb, :controller

  def create(conn, _params) do
    request_ip = conn.remote_ip

    # Frontend should be in list in whitelist of requesting URLs
    # Currently this is only the localhost ip
    whitelist = [{127, 0, 0, 1}]
    valid_ip = Enum.member?(whitelist, request_ip)

    if valid_ip do
      secret_key = Application.get_env(:backend_final, BackendWeb.Endpoint)[:secret_key_base]

      frontend_auth = %{
        token: Phoenix.Token.sign(conn, "frontend_key", secret_key)
      }

      conn
      |> put_resp_header(
           "content-type",
           "application/json; charset=UTF-8"
         )
      |> send_resp(
           :created,
           Jason.encode!(%{frontend_auth: frontend_auth})
         )
    else
      conn
      |> put_resp_header(
           "content-type",
           "application/json; charset=UTF-8"
         )
      |> send_resp(
           :unauthorized,
           Jason.encode!(%{error: "Invalid Source IP"})
         )
    end
  end
end
