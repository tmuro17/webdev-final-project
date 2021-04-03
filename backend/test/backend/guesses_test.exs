defmodule Backend.GuessesTest do
  use Backend.DataCase

  alias Backend.Guesses

  describe "guesses" do
    alias Backend.Guesses.Guess

    @valid_attrs %{correct: true}
    @update_attrs %{correct: false}
    @invalid_attrs %{correct: nil}

    def guess_fixture(attrs \\ %{}) do
      {:ok, guess} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Guesses.create_guess()

      guess
    end

    test "list_guesses/0 returns all guesses" do
      guess = guess_fixture()
      assert Guesses.list_guesses() == [guess]
    end

    test "get_guess!/1 returns the guess with given id" do
      guess = guess_fixture()
      assert Guesses.get_guess!(guess.id) == guess
    end

    test "create_guess/1 with valid data creates a guess" do
      assert {:ok, %Guess{} = guess} = Guesses.create_guess(@valid_attrs)
      assert guess.correct == true
    end

    test "create_guess/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Guesses.create_guess(@invalid_attrs)
    end

    test "update_guess/2 with valid data updates the guess" do
      guess = guess_fixture()
      assert {:ok, %Guess{} = guess} = Guesses.update_guess(guess, @update_attrs)
      assert guess.correct == false
    end

    test "update_guess/2 with invalid data returns error changeset" do
      guess = guess_fixture()
      assert {:error, %Ecto.Changeset{}} = Guesses.update_guess(guess, @invalid_attrs)
      assert guess == Guesses.get_guess!(guess.id)
    end

    test "delete_guess/1 deletes the guess" do
      guess = guess_fixture()
      assert {:ok, %Guess{}} = Guesses.delete_guess(guess)
      assert_raise Ecto.NoResultsError, fn -> Guesses.get_guess!(guess.id) end
    end

    test "change_guess/1 returns a guess changeset" do
      guess = guess_fixture()
      assert %Ecto.Changeset{} = Guesses.change_guess(guess)
    end
  end
end
