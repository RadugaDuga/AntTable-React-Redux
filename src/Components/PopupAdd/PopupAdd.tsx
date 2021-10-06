// @ts-nocheck
import s from "./PopupAdd.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import InputMask from "react-input-mask";
import { addBranch } from './../../Redux/BranchesReducer';

const PopupAdd = (props) => {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		phone: "",
		adress: "",
		manager:"",
		admin:""
	});



	return (
		<div className={s.background}>
			<div className={s.popup}>
				<h1 className={s.popup__title}>Добавление филиала</h1>
				<div className={s.popup__content}>

					<h2 className={s.popup__subtitle}>Адрес</h2>
					<input
						className={s.popup__input}
						type="text"
						value={state.adress}
						onChange={e => setState({ ...state, adress: e.target.value })}
					/>

					<h2 className={s.popup__subtitle}>Управляющий</h2>
					<input
						className={s.popup__input}
						type="text"
						value={state.manager}
						onChange={e => setState({ ...state, manager: e.target.value })}
					/>

					<h2 className={s.popup__subtitle}>Администратор</h2>
					<input
						className={s.popup__input}
						type="text"
						value={state.admin}
						onChange={e => setState({ ...state, admin: e.target.value })}
					/>

					<h2 className={s.popup__subtitle}>Телефон</h2>
					<InputMask
						mask="+7 999 999-99-99"
						maskChar={null}
						value={state.phone}
						className={s.popup__input}
						onChange={e => setState({ ...state, phone: e.target.value })}
					/>

					<button className={s.popup__button}onClick={() => {dispatch(addBranch(state));props.setAddPopup(false)}}>
						Сохранить
					</button>
					<button className={s.popup__button} onClick={() => props.setAddPopup(false)}>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopupAdd;
