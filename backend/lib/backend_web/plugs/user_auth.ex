defmodule BackendWeb.Plugs.UserAuth do
  import Plug.Conn

  def init(args), do: args

  # Taken from Homework 9 implementation
  # Was going to authenticate off of whether or not the request came from the server,
  # but that doesn't make sense, and was a momentary lapse in judgement from the
  # original implementor (This comment's author)
  def call(conn, _args) do
    token = Enum.at(get_req_header(conn, "x-auth"), 0)
    case Phoenix.Token.verify(conn, "user_id", token, max_age: 86400) do
      {:ok, user_id} ->
        user = Backend.Users.get_user!(user_id)
        assign(conn, :current_user, user)
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
