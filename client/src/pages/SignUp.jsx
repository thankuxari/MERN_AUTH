import axios from 'axios';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	async function signUpUser(e) {
		e.preventDefault();
		try {
			await axios.post('/signup', {
				email: email,
				password: password,
				username: username,
			});
			enqueueSnackbar(
				`Account created successfully, Welcome ${username}`,
				{
					variant: 'success',
				}
			);
			navigate('/');
		} catch (error) {
			enqueueSnackbar(error.response.data.message, {
				variant: 'error',
			});
			console.error(error.message);
		}
	}

	return (
		<div className="flex items-center flex-col w-[75%] md:w-[27.5%]">
			<div className="flex flex-col gap-6 w-full bg-slate-800 p-6  rounded-t-xl md:p-12">
				<h1 className="text-center text-3xl font-bold">Sign Up</h1>
				<form className="flex flex-col gap-6" onSubmit={signUpUser}>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
							<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
						</svg>
						<input
							type="text"
							className="grow"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path
								fillRule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clipRule="evenodd"
							/>
						</svg>
						<input
							type="password"
							className="grow"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
						</svg>
						<input
							type="text"
							className="grow"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<PasswordStrengthMeter password={password} />
					<button type="submit" className="btn btn-outline">
						Sign Up
					</button>
				</form>
			</div>
			<div className="bg-black flex justify-center w-full rounded-b-xl p-4">
				<p className="text-sm">
					Already have an account?{' '}
					<Link to={'/login'} className="font-bold hover:underline">
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SignUp;
