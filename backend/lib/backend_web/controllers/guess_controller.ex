defmodule BackendWeb.GuessController do
  use BackendWeb, :controller

  alias Backend.Guesses
  alias Backend.Guesses.Guess

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    guesses = Guesses.list_guesses()
    render(conn, "index.json", guesses: guesses)
  end

  def create(conn, %{"guess" => guess_params}) do
    with {:ok, %Guess{} = guess} <- Guesses.create_guess(guess_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.guess_path(conn, :show, guess))
      |> render("show.json", guess: guess)
    end
  end

  def show(conn, %{"id" => id}) do
    guess = Guesses.get_guess!(id)
    render(conn, "show.json", guess: guess)
  end

  def update(conn, %{"id" => id, "guess" => guess_params}) do
    guess = Guesses.get_guess!(id)

    with {:ok, %Guess{} = guess} <- Guesses.update_guess(guess, guess_params) do
      render(conn, "show.json", guess: guess)
    end
  end

  def delete(conn, %{"id" => id}) do
    guess = Guesses.get_guess!(id)

    with {:ok, %Guess{}} <- Guesses.delete_guess(guess) do
      send_resp(conn, :no_content, "")
    end
  end
end
