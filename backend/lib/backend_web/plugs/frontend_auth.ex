defmodule BackendWeb.Plugs.FrontendAuth do
  import Plug.Conn

  def init(args), do: args

  def call(conn, _args) do
    token = Enum.at(get_req_header(conn, "x-auth"), 0)
    IO.inspect token
    case Phoenix.Token.verify(conn, "frontend_key", token, max_age: 86400) do
      {:ok, secret} ->
        secret_key = Application.get_env(:backend_final, BackendWeb.Endpoint)[:secret_key_base]
        if secret != secret_key do
          conn
          |> put_resp_header(
               "content-type",
               "application/json; charset=UTF-8"
             )
          |> send_resp(
               :unprocessable_entity,
               Jason.encode!(%{"error" => "INVALID TOKEN"})
             )
          |> halt()
        else
          conn
        end
      {:error, err} ->
        conn
        |> put_resp_header(
             "content-type",
             "application/json; charset=UTF-8"
           )
        |> send_resp(
             :unprocessable_entity,
             Jason.encode!(%{"error" => err})
           )
        |> halt()
    end
  end
end
