defmodule Backend.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    field :airport_id, :id
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :airport_id, :user_id])
    |> validate_required([:body, :airport_id, :user_id])
  end
end
