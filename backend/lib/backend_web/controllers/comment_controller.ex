defmodule BackendWeb.CommentController do
  use BackendWeb, :controller

  alias Backend.Comments
  alias Backend.Comments.Comment
  alias BackendWeb.Plugs

  action_fallback BackendWeb.FallbackController

  plug Plugs.UserAuth when action in [:create, :delete]

  def create(conn, %{"comment" => comment_params}) do
    IO.puts("creating comment...#{Kernel.inspect(comment_params)}")
    with {:ok, %Comment{} = comment} <- Comments.create_comment(comment_params) do
      conn
      |> put_status(:created)
      |> json(%{status: 200})
    end
  end

  def comments_for_airport(conn, %{"id" => id}) do
    comments = Comments.get_comments_for_airport(id)
    conn
    |> render("comments_for_airport.json", %{comments: comments})
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
