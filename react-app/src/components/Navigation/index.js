import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './instasite.png';
import splash1 from './splash1.png';
import dragDemo from './dragDemo.webm';
import editorDemo from './editorDemo.webm';
import { useState, useEffect } from 'react';
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { toggleBigLoader } from '../../store/modals';
import { Redirect } from 'react-router-dom';
import { signUp, loginDemo } from "../../store/session";

function Splash() {
	const [currentSplash, setCurrentSplash] = useState(0);
	const [hasLoaded, setHasLoaded] = useState(false);
	const splashText = [

		'Use a rich text editor to create HTML',
		'Design templates with easy click and drag tools',
	];

	const splashImage = [
		editorDemo,
		dragDemo,
	]
	const [splash, setSplash] = useState('');
	const fadeLeft = 'fade-out-left';
	const fadeRight = 'fade-in-right';
	useEffect(() => {
		const splash = document.querySelector('.navigation-header');

		splash.classList.add(fadeLeft);

		setTimeout(() => {
			splash.classList.remove(fadeLeft);
			setSplash(splashText[currentSplash % splashText.length]);
			splash.classList.add(fadeRight);
		}, 800);
		return () => {
			splash.classList.remove('fade-in-left');
			splash.classList.remove('fade-in-right');
		};
	}, [currentSplash]);
	useEffect(() => {
		setTimeout(() => {
			setHasLoaded(true);
		}, 600);
		let id = setInterval(() => {

			setCurrentSplash((currentSplash) => currentSplash + 1);

		}, 8500);
		return () => {
			clearInterval(id);
		}
	}, []);



	return (
		<div className='navigation-header'>
			{hasLoaded && (
				<div className='nav-center'>
					<div className='splash-content'>
						<video key={splash} width='600' height='300' autoPlay muted loop className='drag-demo'>
							<source src={splashImage[currentSplash % splashImage.length]} type='video/webm' />
						</video>
						<h2>
							{splash}
						</h2>
					</div>
				</div>

			)}
		</div>
	);
}

function LoginModal({ setshow }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const [redirect, setRedirect] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		} else {

			dispatch(toggleBigLoader());
			setTimeout(() => {
				setRedirect(true)
				setTimeout(() => {

					dispatch(toggleBigLoader());
				}, 700);
			}, 50);

		}
	};
	return (
		<div className='login-modal-content'>
			{redirect && <Redirect to='/dashboard' />}
			<div className='login-modal-x-button' onClick={() => {
				setshow(false)
			}}>
				<FontAwesomeIcon icon={faX} />
			</div>
			<div className='login-modal-header'>
				Login
			</div>
			<div className='login-modal-inputs'>
				<div className='login-modal-input'>
					<input

						type='text'
						placeholder='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='login-modal-input'>
					<input

						type='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<div className='login-modal-buttons'>
				<div className='login-modal-button'
					onClick={handleSubmit}
				>
					Login
				</div>
				<div className='login-modal-button'>
					Demo
				</div>
			</div>
		</div>
	);
}

function SignupModal({ setshow }) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const [redirect, setRedirect] = useState(false);
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				dispatch(toggleBigLoader());
				setTimeout(() => {
					setRedirect(true)
					setTimeout(() => {

						dispatch(toggleBigLoader());
					}, 700);
				}, 50);

			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};
	return (
		<div className='login-modal-content'>
			{redirect && <Redirect to='/dashboard' />}
			<div className='login-modal-x-button' onClick={() => {
				setshow(false)
			}}>
				<FontAwesomeIcon icon={faX} />
			</div>
			<div className='login-modal-header'>
				Signup
			</div>
			<div className='login-modal-inputs'>
				<div className='login-modal-input'>
					<input

						type='text'
						placeholder='email'
						value={email}

						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='login-modal-input'>
					<input

						type='text'
						placeholder='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='login-modal-input'>
					<input

						type='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='login-modal-input'>
					<input

						type='password'
						placeholder='confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
			</div>
			<div className='login-modal-buttons'>
				<div className='login-modal-button'
					onClick={handleSubmit}
				>
					Signup
				</div>
				<div className='login-modal-button'>
					Demo
				</div>
			</div>
		</div>
	);
}
function DemoModal() {
	return null;
}


function Modal({ show, modal, setshow }) {
	if (show) {
		switch (modal) {
			case 'login':
				return <div className='login-modal'><LoginModal setshow={setshow} /></div>
			case 'signup':
				return <div className='login-modal'><SignupModal setshow={setshow} /></div >
			case 'demo':
				return <div className='login-modal'><DemoModal setshow={setshow} /></div >
			default:
				return null;
		}
	}
	return null;
}

function Navigation({ isLoaded }) {
	const [show, setShow] = useState(false);
	const [modal, setModal] = useState('');
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [redirect, setRedirect] = useState(false);
	return (<>
		<div className='navigation'>
			{redirect && <Redirect to='/dashboard' />}
			<div className='dashboard-header landing'>
				<img src={logo} alt='logo' className='logo' />
				<div className='navigation-buttons'>
					<div className='navigation-button'
						onClick={() => {
							setShow(true)
							setModal('login')
						}}
					>
						login
					</div>
					<div className='navigation-button'
						onClick={() => {
							setShow(true)
							setModal('signup')
						}}
					>
						signup
					</div>
					<div className='navigation-button'
						onClick={() => {
							dispatch(toggleBigLoader());

							setTimeout(() => {

								dispatch(loginDemo());
								setTimeout(() => {
									setRedirect(true)
									dispatch(toggleBigLoader());
								}, 700);
							}, 50);
						}}

					>
						demo
					</div>
				</div>
			</div>



		</div>
		<div className='navigation-header'>
			<Splash />
		</div>
		<div className='navigation-socials'>
			<div className='navigation-social'>
				<div>Created by <a href='https://github.com/brandonetter'>Brandon Etter</a></div>
				<div className='navigation-social-links'>
					<a href='https://github.com/brandonetter/SiteEditor'>
						<img src='https://shields.io/badge/Github-Repo-green?logo=github&style=plastic' />
					</a>
				</div>


			</div>
		</div>
		<Modal show={show} modal={modal} setshow={setShow} />
	</>

	);
}

export default Navigation;
