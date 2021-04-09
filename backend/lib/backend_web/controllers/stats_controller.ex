defmodule BackendWeb.StatsController do
  use BackendWeb, :controller

  alias Backend.Stats
  alias Backend.Airports

  action_fallback BackendWeb.FallbackController

  def user_airports_win_losses(conn, %{"id" => id}) do
    {id, _} = Integer.parse(id)
    win_losses = Stats.user_airports_win_losses(id)
    render(conn, "user_airports_win_losses.json", win_losses: win_losses)
  end

  def user_win_loss(conn, %{"id" => id}) do
    {id, _} = Integer.parse(id)
    win_loss = Stats.user_win_loss(id)
    render(conn, "user_win_loss.json", win_loss: win_loss)
  end

  def user_total_guesses(conn, %{"id" => id}) do
    {id, _} = Integer.parse(id)
    guess_count = Stats.user_total_guesses(id)
    render(conn, "user_total_guesses.json", total_guesses: guess_count)
  end

  def airports_hardest_25(conn, _params) do
    airports = Stats.airports_win_loss_bottom_25()
    render(conn, "airports_stats.json", airports: airports)
  end

  def airports_easiest_25(conn, _params) do
    airports = Stats.airports_win_loss_top_25()
    render(conn, "airports_stats.json", airports: airports)
  end

  def airport_info(conn, %{"icao" => icao}) do
    icao = String.upcase(icao)
    airport = Airports.get_airport_by_icao(icao)
    airport = if airport == nil do
      nil
    else
      wl = Stats.airport_win_loss(airport.id)
      guesses = Stats.airport_total_guesses(airport.id)
      {airport.name, airport.icao, wl, guesses}
    end
    render(conn, "airport_info.json", airport: airport)
  end

  def top_100(conn, _params) do
    users = Stats.users_win_loss()
    render(conn, "top_100_users.json", users: users)
  end
end
