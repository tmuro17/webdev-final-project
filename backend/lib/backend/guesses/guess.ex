defmodule Backend.Guesses.Guess do
  use Ecto.Schema
  import Ecto.Changeset

  schema "guesses" do
    field :correct, :boolean, default: false
    field :user_id, :id
    field :airport_id, :id
    timestamps()
  end

  @doc false
  def changeset(guess, attrs) do
    guess
    |> cast(attrs, [:correct])
    |> validate_required([:correct])
  end
end
