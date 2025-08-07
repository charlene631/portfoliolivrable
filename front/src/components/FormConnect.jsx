import { Link } from "react-router-dom";

const FormConnect = () => {
    return (
        <form
            style={{
                width: "50%",
                margin: "50px auto",
                border: "2px solid black",
                borderRadius: "15px",
                padding: "20px",
            }}
            aria-labelledby="formConnectTitle"
            role="form"
        >
            <h2 style={{textAlign:"center"}} id="formConnectTitle" className="mb-4">Connectez Vous</h2>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    style={{ border: "2px solid grey" }}
                    aria-required="true"
                    aria-label="Email address"
                    autoComplete="email"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    style={{ border: "2px solid grey" }}
                    aria-required="true"
                    aria-label="Password"
                    autoComplete="current-password"
                    required
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    id="rememberMe"
                    className="form-check-input"
                    style={{ border: "2px solid grey" }}
                    aria-label="Remember me"
                />
                <label htmlFor="rememberMe" className="form-check-label">
                    Remember me
                </label>
            </div>

            <div className="d-flex justify-content-center mb-3">
                <button
                    type="submit"
                    className="btn btn-primary"
                    aria-label="Submit login form"
                >
                    Submit
                </button>
            </div>

            <div style={{ textAlign: "center" }}>
                <Link to="/createaccount" aria-label="Go to create account page">
                    Pas encore de compte ? Créez-le !
                </Link>
            </div>
        </form>
    );
};

export default FormConnect;
