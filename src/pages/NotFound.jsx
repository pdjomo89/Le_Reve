import { Link } from "react-router-dom";
import Scene from "../components/Scene.jsx";

export default function NotFound({ message = "That page seems to have wandered off into the desert." }) {
  return (
    <section className="notfound">
      <div className="notfound__art" aria-hidden="true">
        <Scene variant={1} />
      </div>
      <div className="container container--narrow text-center notfound__inner">
        <span className="eyebrow">404</span>
        <h1>
          Lost in the <em className="script">Sonoran</em>
        </h1>
        <p className="lede">{message}</p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn--gold">
            Back home
          </Link>
          <Link to="/consultation" className="btn btn--ghost">
            Book a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
