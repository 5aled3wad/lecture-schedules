
import "./main.scss"
import { UpcomingEvents } from "../../components/upcomingEvents/upcomingEvents";

export const Home = () => {
  return <div className="home">
    <div className="container-st">
      <UpcomingEvents />
    </div>

  </div>;
};

