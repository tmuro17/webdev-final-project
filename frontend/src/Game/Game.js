import MapImage from './MapImage';
import Controls from './Controls';

function Game() {
  return (
    <div id="game">
      <div className="flex flex-row w-full">
        <div className="w-2/3">
          <MapImage coordinates={{ lat: 40.641766, lng: -73.780968 }}/> {/* rn this is the location of KJFK */}
        </div>
        <div className="flex flex-col w-1/3 align-center text-center">
          <Controls/>
        </div>
      </div>
      
    </div>
  )
}

export default Game;