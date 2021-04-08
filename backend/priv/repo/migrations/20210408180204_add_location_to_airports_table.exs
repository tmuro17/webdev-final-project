defmodule Backend.Repo.Migrations.AddLocationToAirportsTable do
  use Ecto.Migration

  def up do
    alter table(:airports) do
      add :lat, :float
      add :lng, :float
    end
  end

  def down do
    alter table(:airports) do
      remove :lat
      remove :lng
    end
  end
end
