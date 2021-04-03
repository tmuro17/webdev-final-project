defmodule BackendWeb.GuessControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Guesses
  alias Backend.Guesses.Guess

  @create_attrs %{
    correct: true
  }
  @update_attrs %{
    correct: false
  }
  @invalid_attrs %{correct: nil}

  def fixture(:guess) do
    {:ok, guess} = Guesses.create_guess(@create_attrs)
    guess
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all guesses", %{conn: conn} do
      conn = get(conn, Routes.guess_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create guess" do
    test "renders guess when data is valid", %{conn: conn} do
      conn = post(conn, Routes.guess_path(conn, :create), guess: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.guess_path(conn, :show, id))

      assert %{
               "id" => id,
               "correct" => true
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.guess_path(conn, :create), guess: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update guess" do
    setup [:create_guess]

    test "renders guess when data is valid", %{conn: conn, guess: %Guess{id: id} = guess} do
      conn = put(conn, Routes.guess_path(conn, :update, guess), guess: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.guess_path(conn, :show, id))

      assert %{
               "id" => id,
               "correct" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, guess: guess} do
      conn = put(conn, Routes.guess_path(conn, :update, guess), guess: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete guess" do
    setup [:create_guess]

    test "deletes chosen guess", %{conn: conn, guess: guess} do
      conn = delete(conn, Routes.guess_path(conn, :delete, guess))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.guess_path(conn, :show, guess))
      end
    end
  end

  defp create_guess(_) do
    guess = fixture(:guess)
    %{guess: guess}
  end
end
