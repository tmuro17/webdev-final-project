defmodule BackendWeb.AirportView do
  use BackendWeb, :view
  alias BackendWeb.AirportView

  def render("index.json", %{airports: airports}) do
    %{data: render_many(airports, AirportView, "airport.json")}
  end

  def render("show.json", %{airport: airport}) do
    %{data: render_one(airport, AirportView, "airport.json")}
  end

  def render("airport.json", %{airport: airport}) do
    %{id: airport.id,
      name: airport.name,
      icao: airport.icao}
  end
end
