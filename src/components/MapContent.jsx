import { Map, Marker } from "pigeon-maps"
import { FaDirections } from "react-icons/fa";

const MapContent = () => {

    return (
        <div className="md:flex md:gap-5">
            <div className="md:w-1/2 w-full">

                <Map height={300} defaultCenter={[18.92176, 72.83297]} defaultZoom={11}>
                    <Marker width={50} anchor={[18.92176, 72.83297]} />
                </Map>
            </div>
            <div className="md:w-1/2 w-full">
                <h1 className="font-bold text-2xl">The Taj Mahal Palace Hotel</h1>
                <p className="text-xs ">Building</p>
                <div className="divider"></div>
                <div className="flex justify-between flex-wrap">
                    <div className="flex flex-col items-center">
                        <div className="btn btn-circle "><FaDirections /></div>
                        <span>
                            Directions
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="btn btn-circle "><FaDirections /></div>
                        <span>
                            Directions
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="btn btn-circle "><FaDirections /></div>
                        <span>
                            Directions
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="btn btn-circle "><FaDirections /></div>
                        <span>
                            Directions
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="btn btn-circle "><FaDirections /></div>
                        <span>
                            Directions
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MapContent;