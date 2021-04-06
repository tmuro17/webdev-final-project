

function Controls({ options, handleGuess, getNewQuestion, result }) {

  const optionButtons = options.map((option, index) => (
    <div key={index} className="flex w-1/2 p-4 text-center justify-center">
      <button className="bg-orange hover:bg-lightgray w-3/5 p-2 rounded" onClick={e => handleGuess(option.icao)}>{option.icao}</button>
    </div>
  ))

  let resultSection = null;

  if (result) {
    if (result.correct) {
      resultSection = (
        <div className="p-4 text-lg">
          <div>
            You were right! The answer was {result.option}
          </div>
          <button className="bg-orange hover:bg-lightgray w-4/5 p-2 rounded" onClick={e => getNewQuestion()}>Next Airport!</button>
        </div>
      )
    } else {
      resultSection = (
        <div className="p-4 text-lg">
          <div>
            Please try again. Your guess {result.option} was incorrect.
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <h1 className="my-4 font-bold">Which airport is this?</h1>
      <div className="flex flex-wrap text-xl">
        {optionButtons}
      </div>
        {result &&
          resultSection
        }
    </div>
  )
}

export default Controls;