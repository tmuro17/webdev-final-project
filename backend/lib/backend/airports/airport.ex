defmodule Backend.Airports.Airport do
  use Ecto.Schema
  import Ecto.Changeset

  schema "airports" do
    field :icao, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(airport, attrs) do
    airport
    |> cast(attrs, [:name, :icao])
    |> validate_required([:name, :icao])
  end
end
