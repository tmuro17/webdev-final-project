defmodule BackendWeb.SessionController do
  use BackendWeb, :controller

  def create(conn, %{"email" => email, "password" => password}) do
    user = Backend.Users.auth(email, password)
    if user do
      session = %{
        user_id: user.id,
        email: user.email,
        token: Phoenix.Token.sign(conn, "user_id", user.id)
      }

      conn
      |> put_resp_header(
           "content-type",
           "application/json; charset=UTF-8"
         )
      |> send_resp(
           :created,
           Jason.encode!(%{session: session})
         )
    else
      conn
      |> put_resp_header(
           "content-type",
           "application/json; charset=UTF-8"
         )
      |> send_resp(
           :unauthorized,
           Jason.encode!(%{error: "fail"})
         )
    end
  end
end
