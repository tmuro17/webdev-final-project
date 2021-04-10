defmodule BackendWeb.GameChannel do
  use Phoenix.Channel

  alias Backend.ApiAgent
  alias Backend.Users
  alias Backend.Guesses
  alias Backend.Airports
  alias BackendWeb.Endpoint
  alias Backend.Stats

  def join("game:global", _message, socket) do
    {:ok, socket}
  end

  def join("game:announcements", _message, socket) do
    {:ok, socket}
  end

  def handle_in("user_location", %{"user_id" => user_id, "coordinates" => coordinates, "regional" => regional}, socket) do
    user = Users.get_user!(user_id)
    airports =
      case regional do
        true ->
          ApiAgent.get_airports_in_radius(coordinates, 500)
          |> Enum.shuffle
        false ->
          # get top 25 hardest airports
          Stats.game_airports_hardest_25()
      end

    socket =
      socket
      |> assign(:coordinates, coordinates)
      |> assign(:unused_airports, airports)
      |> assign(:used_airports, [])
      |> assign(:user, user)
    {:reply, :ok, socket}
  end

  def handle_in("get_question", _msg, socket) do
    airports = socket.assigns[:unused_airports]
    socket =
      case length(airports) > 4 do
        true ->
          [correct | rest] = airports
          options = Enum.take(airports, 4)
          # insert in db if it isnt already
          if Airports.get_airport_by_icao(correct[:icao]) == nil do
            Airports.create_airport(%{
              icao: correct[:icao],
              name: correct[:name],
              lat: correct[:coordinates][:lat],
              lng: correct[:coordinates][:lng]
            })
          end

          round = %{options: Enum.shuffle(options), map_coords: correct[:coordinates]}
          push(socket, "incoming_question", round)

          socket
          |> assign(:unused_airports, rest)
          |> assign(:used_airports, socket.assigns[:used_airports] ++ [correct])
          |> assign(:correct_answer, correct[:icao])

        false ->
          # game over, get new airports preemptively
          airports =
            ApiAgent.get_airports_in_radius(socket.assigns[:coordinates], 500)
            |> Enum.shuffle
          push(socket, "game_over", %{})
          socket
          |> assign(:unused_airports, airports)
          |> assign(:used_airports, [])
      end

    {:noreply, socket}
  end

  def handle_in("new_game", _msg, socket) do
    {:reply, :ok, socket}
  end

  def handle_in("new_guess", %{"guess" => guess}, socket) do
    user = socket.assigns[:user]
    correct = socket.assigns[:correct_answer]

    outcome = correct == guess

    new_guess = Guesses.create_guess(%{
      correct: outcome,
      user_id: user.id,
      airport_id: Airports.get_airport_by_icao(correct).id
    })

    outcome_obj = %{correct: outcome}

    outcome_obj =
      if outcome do
        Map.put(outcome_obj, :option, correct)
      else
        Map.put(outcome_obj, :option, guess)
      end

    push(socket, "outcome", outcome_obj)

    # add name to broadcast for widget display
    outcome_obj =
      outcome_obj
      |> Map.put(:username, user.name)
      |> Map.put(:actual, correct)
    Endpoint.broadcast!("game:announcements", "guess_announcement", outcome_obj)
    {:noreply, socket}
  end
end
