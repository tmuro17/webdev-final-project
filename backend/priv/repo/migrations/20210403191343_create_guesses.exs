defmodule Backend.Repo.Migrations.CreateGuesses do
  use Ecto.Migration

  def change do
    create table(:guesses) do
      add :correct, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing)
      add :airport_id, references(:airports, on_delete: :nothing)

      timestamps()
    end
    create index(:guesses, [:user_id])
    create index(:guesses, [:airport_id])
  end
end
