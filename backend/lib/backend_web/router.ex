defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BackendWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

#   Other scopes may use custom stacks.
   scope "/api/v1", BackendWeb do
     pipe_through :api

     resources "/users", UserController, except: [:new, :edit]
     resources "/session", SessionController, only: [:create]
     resources "/frontend_auth", FrontendAuthController, only: [:create]
     resources "/airports", AirportController, except: [:new, :edit]
     resources "/guesses", GuessController, except: [:new, :edit]
     get "/user_airports_win_losses/:id", StatsController, :user_airports_win_losses
     get "/user_win_loss/:id", StatsController, :user_win_loss
     get "/user_total_guesses/:id", StatsController, :user_total_guesses
     get "/airports_easiest_25", StatsController, :airports_easiest_25
     get "/airports_hardest_25", StatsController, :airports_hardest_25
     get "/airport/:icao", StatsController, :airport_info
     get "/top_100", StatsController, :top_100
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: BackendWeb.Telemetry
    end
  end
end
