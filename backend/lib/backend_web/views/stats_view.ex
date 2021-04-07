defmodule BackendWeb.StatsView do
  use BackendWeb, :view
  alias BackendWeb.StatsView

  def render("user_airports_win_losses.json", %{win_losses: win_losses}) do
    %{data: render_many(win_losses, StatsView, "user_airport_win_loss.json")}
  end

  def render("user_airport_win_loss.json", %{stats: win_loss}) do
    # {airport_id, name, icao, W/L}
    {airport_id, airport_name, icao, wl_ratio} = win_loss
    %{
      airport_id: airport_id,
      airport_name: airport_name,
      icao: icao,
      wl_ratio: wl_ratio
    }
  end

  def render("user_win_loss.json", %{win_loss: win_loss}) do
    %{data: render_one(win_loss, StatsView, "win_loss.json")}
  end

  def render("win_loss.json", %{stats: win_loss}) do
    %{win_loss: win_loss}
  end

  def render("user_total_guesses.json", %{total_guesses: guess_count}) do
    %{data: render_one(guess_count, StatsView, "guess_count.json")}
  end

  def render("guess_count.json", %{stats: guess_count}) do
    %{total_guesses: guess_count}
  end

  def render("airports_stats.json", %{airports: airports}) do
    %{data: render_many(airports, StatsView, "airport_stat.json")}
  end

  def render("airport_stat.json", %{stats: airport_stats}) do
    # [{ icao, name, W/L , total}]
    {icao, name, wL, total} = airport_stats
    %{
      airport_name: name,
      icao: icao,
      win_loss: wL,
      total: total
    }
  end


  def render("airport_info.json", %{airport: airport}) do
    %{data: render_one(airport, StatsView, "airport_stats.json")}
  end

  def render("airport_stats.json", %{stats: stats}) do
    if(stats == nil) do
      %{}
    else
      {name, icao, wl, guesses} = stats
      %{
        name: name,
        icao: icao,
        wl: wl,
        guesses: guesses
      }
    end
  end

  def render("top_100_users.json", %{users: users}) do
    %{data: render_many(users, StatsView, "top_100_user.json")}
  end

  def render("top_100_user.json", %{stats: stats}) do
    {name, wl} = stats
    %{
      name: name,
      win_loss: wl
    }
  end
end
