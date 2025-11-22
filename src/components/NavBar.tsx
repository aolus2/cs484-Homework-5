import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav
            style={{
                padding: "1rem",
                marginBottom: "1rem",
                fontSize: "1.2rem",
            }}
        >
            <Link to="/" style={{ marginRight: "1rem" }}>
                Problem 1
            </Link>
            <Link to="/problem2" style={{ marginRight: "1rem" }}>
                Problem 2
            </Link>
            <Link to="/problem3" style={{ marginRight: "1rem" }}>
                Problem 3
            </Link>
            <Link to="/problem4" style={{ marginRight: "1rem" }}>
                Problem 4
            </Link>
        </nav>
    );
}
