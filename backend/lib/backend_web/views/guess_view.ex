defmodule BackendWeb.GuessView do
  use BackendWeb, :view
  alias BackendWeb.GuessView

  def render("index.json", %{guesses: guesses}) do
    %{data: render_many(guesses, GuessView, "guess.json")}
  end

  def render("show.json", %{guess: guess}) do
    %{data: render_one(guess, GuessView, "guess.json")}
  end

  def render("guess.json", %{guess: guess}) do
    %{id: guess.id,
      correct: guess.correct}
  end
end
