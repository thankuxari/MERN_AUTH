import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MoveLeft, MoveRight } from 'lucide-react';

function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

	async function handleSendRecoveryEmail(e) {
		e.preventDefault();
		try {
			await axios.post('/forgot_password', { email: email });
			setIsSubmitted(true);
			enqueueSnackbar('Recovery Email Sent', { variant: 'success' });
		} catch (error) {
			enqueueSnackbar(error.response.data.message, { variant: 'error' });
			console.error(error.message);
		}
	}

	return (
		<>
			{isSubmitted ? (
				<div className="flex items-center flex-col w-[75%] md:w-[27.5%]">
					<div className="flex flex-col gap-6 w-full bg-slate-800 p-6  rounded-t-xl md:p-12">
						<h1 className="text-center text-3xl font-bold">
							Reset Password
						</h1>
						<p className="text-center">
							If there is an account associated with this email,
							you will receive an email with instructions to reset
							your password.
						</p>
					</div>
					<div className="bg-black flex justify-center w-full rounded-b-xl p-4">
						<Link
							to={'/reset_password'}
							className="hover:underline text-sm flex gap-3"
						>
							Go to Password Reset Page
							<MoveRight />
						</Link>
					</div>
				</div>
			) : (
				<div className="flex items-center flex-col w-[75%] md:w-[27.5%]">
					<div className="flex flex-col gap-6 w-full bg-slate-800 p-6  rounded-t-xl md:p-12">
						<h1 className="text-center text-3xl font-bold">
							Forgot Password
						</h1>
						<p className="text-center">
							Enter your email address and we will send you a link
							to reset your password.
						</p>
						<form
							className="flex flex-col gap-6"
							onSubmit={handleSendRecoveryEmail}
						>
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

							<button type="submit" className="btn btn-outline">
								Send Recovery Email
							</button>
						</form>
					</div>
					<div className="bg-black flex justify-center w-full rounded-b-xl p-4">
						<Link
							to={'/login'}
							className="hover:underline text-sm flex gap-3"
						>
							<MoveLeft />
							Back to Login
						</Link>
					</div>
				</div>
			)}
		</>
	);
}

export default ForgotPassword;
