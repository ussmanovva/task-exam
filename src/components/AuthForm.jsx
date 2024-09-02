import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
		number: "",
	});

	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validate = () => {
		let tempErrors = {};

		tempErrors.name =
			formData.name.length >= 2 ? "" : "Имя должно быть не менее 2 символов";
		tempErrors.surname =
			formData.surname.length >= 2
				? ""
				: "Фамилия должна быть не менее 2 символов";
		tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
			? ""
			: "Некорректный email";
		tempErrors.password = /^(?=.*[A-Z]).{8,}$/.test(formData.password)
			? ""
			: "Пароль должен содержать не менее 8 символов и одну заглавную букву";
		tempErrors.number = /^[0-9]+$/.test(formData.number)
			? ""
			: "Номер должен содержать только цифры";

		setErrors(tempErrors);
		return Object.values(tempErrors).every((x) => x === "");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				await dispatch(login(formData)).unwrap();
				navigate("/dashboard");
			} catch (err) {
				console.error("Ошибка", err);
			}
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: "flex",
				flexDirection: "column",
				width: 300,
				margin: "0 auto",
				gap: 2,
			}}>
			<TextField
				name="name"
				label="Имя"
				variant="outlined"
				value={formData.name}
				onChange={handleChange}
				error={Boolean(errors.name)}
				helperText={errors.name}
			/>
			<TextField
				name="surname"
				label="Фамилия"
				variant="outlined"
				value={formData.surname}
				onChange={handleChange}
				error={Boolean(errors.surname)}
				helperText={errors.surname}
			/>
			<TextField
				name="email"
				label="Email"
				variant="outlined"
				value={formData.email}
				onChange={handleChange}
				error={Boolean(errors.email)}
				helperText={errors.email}
			/>
			<TextField
				name="password"
				label="Пароль"
				type="password"
				variant="outlined"
				value={formData.password}
				onChange={handleChange}
				error={Boolean(errors.password)}
				helperText={errors.password}
			/>
			<TextField
				name="number"
				label="Номер"
				variant="outlined"
				value={formData.number}
				onChange={handleChange}
				error={Boolean(errors.number)}
				helperText={errors.number}
			/>
			<Button type="submit" variant="contained" color="primary">
				Отправить
			</Button>
		</Box>
	);
};

export default AuthForm;
