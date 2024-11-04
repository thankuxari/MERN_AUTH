import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
function ResetPassword() {
	const [newPassword, setNewPassword] = useState('');

	const { token } = useParams();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	async function handleResetPassword(e) {
		e.preventDefault();
		try {
			await axios.post(`/reset_password/${token}`, {
				password: newPassword,
			});
			enqueueSnackbar('Password Reset Successfully', {
				variant: 'success',
			});
			navigate('/login');
		} catch (error) {
			enqueueSnackbar(error.response.data.message, { variant: 'error' });
			console.error(error.message);
		}
	}
	return (
		<div className="flex items-center flex-col w-[75%] md:w-[27.5%]">
			<div className="flex flex-col gap-6 w-full bg-slate-800 p-6  rounded-t-xl md:p-12">
				<h1 className="text-center text-3xl font-bold">
					Reset Password
				</h1>
				<p className="text-center">Enter your new password</p>
				<form
					className="flex flex-col gap-6"
					onSubmit={handleResetPassword}
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
							type="password"
							className="grow"
							placeholder="Password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</label>

					<button type="submit" className="btn btn-outline">
						Submit New Password
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
	);
}

export default ResetPassword;
