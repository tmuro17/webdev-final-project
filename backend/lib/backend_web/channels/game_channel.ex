defmodule BackendWeb.GameChannel do
  use Phoenix.Channel

  alias Backend.ApiAgent
  alias Backend.Users
  alias Backend.Guesses
  alias Backend.Airports

  def join("game:global", _message, socket) do
    {:ok, socket}
  end

  def handle_in("user_location", %{"user_id" => user_id, "coordinates" => coordinates}, socket) do
    user = Users.get_user!(user_id)
    airports =
      ApiAgent.get_airports_in_radius(coordinates, 200)
      |> Enum.shuffle # set to 200km for now
    socket =
      socket
      |> assign(:unused_airports, airports)
      |> assign(:used_airports, [])
      |> assign(:user, user)
    {:reply, :ok, socket}
  end

  def handle_in("get_question", _msg, socket) do
    airports = socket.assigns[:unused_airports]
    [correct | rest] = airports
    options = Enum.take(airports, 4)

    # insert in db if it isnt already
    if Airports.get_airport_by_icao(correct[:icao]) == nil do
      Airports.create_airport(%{
        icao: correct[:icao],
        name: correct[:name]
      })
    end

    socket =
      socket
      |> assign(:unused_airports, rest)
      |> assign(:used_airports, socket.assigns[:used_airports] ++ [correct])
      |> assign(:correct_answer, correct[:icao])
    round = %{options: Enum.shuffle(options), map_coords: correct[:coordinates]}
    push(socket, "incoming_question", round)
    {:noreply, socket}
  end

  def handle_in("new_guess", %{"guess" => guess}, socket) do
    user = socket.assigns[:user]
    correct = socket.assigns[:correct_answer]

    IO.puts("user guessed: #{guess}, correct: #{correct}")

    outcome = correct == guess

    new_guess = Guesses.create_guess(%{
      correct: outcome,
      user_id: user.id,
      airport_id: Airports.get_airport_by_icao(correct).id
    })

    IO.puts("guess obj: #{Kernel.inspect(new_guess)}")

    if outcome do
      push(socket, "outcome", %{correct: true, option: correct})
    else
      push(socket, "outcome", %{correct: false, option: guess})
    end

    {:noreply, socket}
  end
end
