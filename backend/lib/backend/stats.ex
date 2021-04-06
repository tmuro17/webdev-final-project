defmodule Backend.Stats do
  import Ecto.Query, warn: false
  alias Backend.Repo

  def user_win_loss(user_id) do
    {_, results} = Repo.query(
      "SELECT (SUM(CASE WHEN correct = TRUE THEN 1 ELSE 0 END) / COUNT(*)::float) * 100 AS win_loss FROM users JOIN guesses g ON users.id = g.user_id WHERE user_id = $1 GROUP BY user_id;",
      [user_id]
    )

    hd hd results.rows
    # W/L
  end

  def airport_win_loss(airport_id) do
    {_, results} = Repo.query(
      "SELECT (SUM(CASE WHEN correct = TRUE THEN 1 ELSE 0 END) / COUNT(*)::float) * 100 AS win_loss FROM airports JOIN guesses g ON airports.id = g.airport_id WHERE airport_id = $1 GROUP BY airport_id;",
      [airport_id]
    )

    hd hd results.rows
    # W/L
  end

  def airports_win_loss() do
    {_, results} = Repo.query(
      "SELECT icao, name, (SUM(CASE WHEN correct = TRUE THEN 1 ELSE 0 END) / COUNT(*)::float) * 100 AS win_loss FROM guesses JOIN airports a ON airport_id = a.id GROUP BY icao, name ORDER BY win_loss DESC;"
    )

    Enum.map(
      results.rows,
      fn r -> {r |> hd, r |> tl |> hd, r |> tl |> tl |> hd} end
    )
    # [{ icao, name, W/L }]
  end

  def users_win_loss() do
    {_, results} = Repo.query(
      "SELECT user_id, name, (SUM(CASE WHEN correct = TRUE THEN 1 ELSE 0 END) / COUNT(*)::float) * 100 AS win_loss FROM guesses JOIN users u ON guesses.user_id = u.id GROUP BY user_id, name ORDER BY win_loss DESC;"
    )

    Enum.map(results.rows,
      fn r -> {r |> hd, r |> tl |> hd, r |> tl |> tl |> hd} end
    )
    # [{user_id, name, W/L}]
  end

  def airport_total_guesses(airport_id) do
    {_, results} = Repo.query(
      "select count(*) from guesses join airports a ON guesses.airport_id = a.id where airport_id = $1 GROUP BY airport_id;",
      [airport_id]
    )

    hd hd results.rows
    # Total guesses as int
  end

  def user_total_guesses(user_id) do
    {_, results} = Repo.query(
      "SELECT COUNT(*) FROM guesses JOIN users u ON guesses.user_id = u.id WHERE user_id = $1 GROUP BY user_id;",
      [user_id]
    )

    hd hd results.rows
    # Total guesses as int
  end

  def user_guesses_airports(user_id) do
    {_, results} = Repo.query(
      "SELECT airport_id, a.name, icao FROM guesses JOIN users u ON guesses.user_id = u.id JOIN airports a ON guesses.airport_id = a.id WHERE user_id = $1 GROUP BY user_id, airport_id, a.name, icao;",
      [user_id]
    )

    Enum.map(results.rows,
      fn r -> {r |> hd, r |> tl |> hd, r |> tl |> tl |> hd} end)

    # [{airport_id, name, icao}]
  end

  def user_airport_win_loss(user_id, airport_id) do
    {_, results} = Repo.query(
      "SELECT (SUM(CASE WHEN correct = TRUE THEN 1 ELSE 0 END) / COUNT(*)::float) * 100 AS win_loss FROM users JOIN guesses g ON users.id = g.user_id join airports a ON g.airport_id = a.id WHERE user_id = $1 and airport_id = $2 GROUP BY user_id;",
      [user_id, airport_id]
    )

    hd hd results.rows

    # W/L
  end

  def user_airports_win_losses(user_id) do
    user_guesses_airports(user_id)
    |> Enum.map(fn {air_id, name, icao} -> {air_id, name, icao, user_airport_win_loss(user_id, air_id)} end)
     # [{airport_id, name, icao, W/L}]
  end
end
