defmodule Backend.Airports.Airport do
  use Ecto.Schema
  import Ecto.Changeset

  schema "airports" do
    field :icao, :string
    field :name, :string
    field :lat, :float
    field :lng, :float

    timestamps()
  end

  @doc false
  def changeset(airport, attrs) do
    airport
    |> cast(attrs, [:name, :icao, :lat, :lng])
    |> validate_required([:name, :icao, :lat, :lng])
  end
end
