defmodule BackendWeb.CommentView do
  use BackendWeb, :view
  alias BackendWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{username: comment.username,
      body: comment.body}
  end

  def render("comments_for_airport.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end
end
