import { useTime } from "../../services/hooks/useTime";
import "./main.scss"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


const RemainingLec = () => {
  const time = useTime()
  return <div className="lec-remaining">
    <CircularProgressbarWithChildren value={10}
      styles={buildStyles({
        strokeLinecap: 'round',
        pathTransitionDuration: 0.5,
        pathColor: '#049F9A',
        trailColor: '#CCECEA',
      })}
    >
    </CircularProgressbarWithChildren>
  </div>
}

const Lectures = () => {
  return <div className="lecture">
    <div className="container-lec">
      <div className="calender">
        <div className="mon">SEP</div>
        <div className="day">22</div>
      </div>
      <div className="inf">
        <div className="title" title="Computer Network - Shrief Abo Elaine">
          Computer Network - Shrief Abo Elaine
        </div>
        <div className="date">
          12:30 PM - 02:00 PM
        </div>
      </div>
      <RemainingLec />
    </div>
  </div>
}



export const UpcomingEvents = () => {
  return <div className="upcoming-events">
    <div className="container">
      <div className="title">
        Upcoming Lectures
      </div>
      <Lectures />
      <Lectures />
      <Lectures />
    </div>
  </div>
};
