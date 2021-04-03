defmodule Backend.ApiAgent do
  use Agent

  #  token format
  # {
  #   token: api_token
  #   expiry: time of expiry
  # }

  def start_link(_args) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def get_token_info() do
    Agent.get __MODULE__, fn token -> token end
  end

  def put_token_info(token) do
    Agent.update __MODULE__, fn _ -> token end
  end

  def api_info() do
    %{
      BASE_URL: "https://test.api.amadeus.com/v1",
      API_KEY: "IUeaxiFFS8DeMCBM8AG9zfUcvx2taUwr",
      API_SECRET: "nYZ1FpgsiAgzAXzr",
      API_ENDPOINT: "/reference-data/locations/airports",
      TOKEN_ENDPOINT: "/security/oauth2/token",
    }
  end

  def refresh_token() do
    info = api_info()
    token_info = get_token_info()

    expiry = token_info[:expiry]
    now = Time.utc_now()

    if expiry != nil && Time.compare(now, expiry) == :lt do
      IO.puts "Valid Token"
    else
      IO.puts "Refresh Token"

      body = {
        :form,
        [{"grant_type", "client_credentials"}, {"client_id", info[:API_KEY]}, {"client_secret", info[:API_SECRET]}]
      }
      headers = [{"Content-Type", "x-www-form-urlencoded"}]
      {_, resp} = HTTPoison.post "#{info[:BASE_URL]}#{info[:TOKEN_ENDPOINT]}", body, headers
      {_, data} = Jason.decode(resp.body)

      new_token = data["access_token"]
      expires_in = data["expires_in"]

      new_expire = Time.add(now, expires_in)

      put_token_info %{token: new_token, expiry: new_expire}
    end
  end


  # Coordinates = {latitude, longitude}
  # Search Radius in kilometers
  # Expected to have called refresh_token
  # before calling this function
  def get_airports_in_radius(coordinates, search_radius) do
    token = get_token_info()[:token]
    api_details = api_info()

    {lat, long} = coordinates
    params = [
      {"latitude", lat},
      {"longitude", long},
      {"radius", search_radius},
      {"sort", "distance"},
    ]

    headers = [{"Authorization", "Bearer #{token}"}]

    # https://developers.amadeus.com/self-service/category/air/api-doc/airport-nearest-relevant/api-reference
    {_, resp} = HTTPoison.get "#{info[:BASE_URL]}#{info[:API_ENDPOINT]}", headers, [{:params, params}]
    {_, data} = Jason.decode(resp.body)

    results = data["data"]

    airport_details = Enum.filter(results, fn airport -> airport["address"]["countryCode"] == "US" end)
                      |> Enum.map(
                           fn airport ->
                             %{
                               name: airport["name"],
                               icao: "K#{airport["iataCode"]}",
                               distance: "#{airport["distance"]["value"]} #{airport["distance"]["unit"]}",
                               coordinates: {airport["geoCode"]["latitude"], airport["geoCode"]["longitude"]},
                             }
                           end
                         )

    airport_details
  end
end
