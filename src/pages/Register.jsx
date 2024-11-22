
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Register = () => {
    const navigate = useNavigate();
    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState({});


    const handleRegister = (e) => {
        e.preventDefault();
        //  get form data
        setError('')
        const form = new FormData(e.target);
        const name = form.get('name')
        if (name.length < 5) {
            setError({ ...error, name: "Must be 5 character Longer" })
            return;
        };

        const photo = form.get('photo')
        const email = form.get('email')
        const password = form.get('password')
        if (password.length < 6) {
            setError({ ...error, password: "Password Must be 6 character Longer" })
            return;
        }
        // console.log(name, photo, email, password)
        // Authintication
        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user)
                // console.log(user)
                updateUserProfile({ displayName: name, photoURL: photo })
                .then(() => {
                    navigate('/')
                })
                .catch(err => {
                    console.log(err.message)
                })
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log('ERROR',error.message)
                console.log('ERROR', errorCode, errorMessage)
            })


    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg p-10 shrink-0 shadow-2xl">
                <h2 className="text-2xl font-semibold text-center">Register your account</h2>
                <form onSubmit={handleRegister} className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input name="name" type="text" placeholder="Enter Your name" className="input input-bordered" required />
                        {
                            error.name && (
                                <label className="label text-xs text-red-600">
                                    {error.name}

                                </label>
                            )
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input name="photo" type="text" placeholder="Enter Your photo URL" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Enter Your email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="Enter Your password" className="input input-bordered" required />
                        {
                            error.password && (
                                <label className="label text-xs text-red-600">
                                    {error.password}

                                </label>
                            )
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral">Register</button>
                    </div>
                </form>
                <p className="text-center font-semibold">Already Have An Account ? <Link to='/auth/login' className="text-red-700 underline">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;