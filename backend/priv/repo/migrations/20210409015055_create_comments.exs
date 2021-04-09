defmodule Backend.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :text
      add :airport_id, references(:airports, on_delete: :delete_all) # delete all comments if an airport is deleted
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:comments, [:airport_id])
    create index(:comments, [:user_id])
  end
end
