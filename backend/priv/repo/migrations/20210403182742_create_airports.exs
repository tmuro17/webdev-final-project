defmodule Backend.Repo.Migrations.CreateAirports do
  use Ecto.Migration

  def change do
    create table(:airports) do
      add :name, :string
      add :icao, :string

      timestamps()
    end

    create index(:airports, [:icao])
  end
end
