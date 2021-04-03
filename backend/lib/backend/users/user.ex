defmodule Backend.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> add_hash(attrs["password"])
    |> validate_required([:email, :name, :password_hash])
  end

  def add_hash(changes, nil) do
    changes
  end

  def add_hash(changes, password) do
    change(changes, Argon2.add_hash(password))
  end
end
