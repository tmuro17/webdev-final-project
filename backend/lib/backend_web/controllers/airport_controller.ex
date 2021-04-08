defmodule BackendWeb.AirportController do
  use BackendWeb, :controller

  alias Backend.Airports
  alias Backend.Airports.Airport

  action_fallback BackendWeb.FallbackController

  alias BackendWeb.Plugs
  plug Plugs.FrontendAuth

  def index(conn, _params) do
    airports = Airports.list_airports()
    render(conn, "index.json", airports: airports)
  end

  def create(conn, %{"airport" => airport_params}) do
    with {:ok, %Airport{} = airport} <- Airports.create_airport(airport_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.airport_path(conn, :show, airport))
      |> render("show.json", airport: airport)
    end
  end

  def show(conn, %{"id" => id}) do
    airport = Airports.get_airport!(id)
    render(conn, "show.json", airport: airport)
  end

  def update(conn, %{"id" => id, "airport" => airport_params}) do
    airport = Airports.get_airport!(id)

    with {:ok, %Airport{} = airport} <- Airports.update_airport(airport, airport_params) do
      render(conn, "show.json", airport: airport)
    end
  end

  def delete(conn, %{"id" => id}) do
    airport = Airports.get_airport!(id)

    with {:ok, %Airport{}} <- Airports.delete_airport(airport) do
      send_resp(conn, :no_content, "")
    end
  end
end
