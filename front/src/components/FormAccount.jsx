const FormAccount = () => {
    return (
        <form
            style={{
                width: "50%",
                margin: "50px auto",
                border: "2px solid black",
                borderRadius: "15px",
                padding: "20px",
            }}
            aria-labelledby="accountFormTitle"
            role="form"
        >
            <h2 style={{textAlign:"center"}} id="accountFormTitle" className="mb-4">Créer son Compte</h2>

            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    style={{ border: "2px solid grey" }}
                    aria-required="true"
                    aria-label="First Name"
                    autoComplete="given-name"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    style={{ border: "2px solid grey" }}
                    aria-required="true"
                    aria-label="Last Name"
                    autoComplete="family-name"
                    required
                />
            </div>

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
                    autoComplete="new-password"
                    required
                />
            </div>

            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary"
                    aria-label="Submit the account creation form"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default FormAccount;
