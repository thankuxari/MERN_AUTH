import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Navbar from './components/Navbar';
import FloatingShape from './components/FloatingShape';
import axios from 'axios';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';
function App() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden">
				<FloatingShape
					color="bg-blue-400"
					size="w-64 h-64"
					top="-5%"
					left="10%"
					delay={0}
				/>
				<FloatingShape
					color="bg-blue-600"
					size="w-48 h-48"
					top="70%"
					left="80%"
					delay={5}
				/>
				<FloatingShape
					color="bg-blue-600"
					size="w-32 h-32"
					top="40%"
					left="-10%"
					delay={2}
				/>
				<Routes>
					<Route path={'/'} element={<Home />} />
					<Route path={'/login'} element={<Login />} />
					<Route path={'/signup'} element={<SignUp />} />
					<Route
						path={'/forgot_password'}
						element={<ForgotPassword />}
					/>
					<Route
						path={'/reset_password/:token'}
						element={<ResetPassword />}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
