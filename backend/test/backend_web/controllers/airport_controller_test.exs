defmodule BackendWeb.AirportControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Airports
  alias Backend.Airports.Airport

  @create_attrs %{
    icao: "some icao",
    name: "some name"
  }
  @update_attrs %{
    icao: "some updated icao",
    name: "some updated name"
  }
  @invalid_attrs %{icao: nil, name: nil}

  def fixture(:airport) do
    {:ok, airport} = Airports.create_airport(@create_attrs)
    airport
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all airports", %{conn: conn} do
      conn = get(conn, Routes.airport_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create airport" do
    test "renders airport when data is valid", %{conn: conn} do
      conn = post(conn, Routes.airport_path(conn, :create), airport: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.airport_path(conn, :show, id))

      assert %{
               "id" => id,
               "icao" => "some icao",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.airport_path(conn, :create), airport: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update airport" do
    setup [:create_airport]

    test "renders airport when data is valid", %{conn: conn, airport: %Airport{id: id} = airport} do
      conn = put(conn, Routes.airport_path(conn, :update, airport), airport: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.airport_path(conn, :show, id))

      assert %{
               "id" => id,
               "icao" => "some updated icao",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, airport: airport} do
      conn = put(conn, Routes.airport_path(conn, :update, airport), airport: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete airport" do
    setup [:create_airport]

    test "deletes chosen airport", %{conn: conn, airport: airport} do
      conn = delete(conn, Routes.airport_path(conn, :delete, airport))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.airport_path(conn, :show, airport))
      end
    end
  end

  defp create_airport(_) do
    airport = fixture(:airport)
    %{airport: airport}
  end
end
