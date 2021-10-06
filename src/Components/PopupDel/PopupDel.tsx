// @ts-nocheck
import s from "./PopupDel.module.css";
import { useDispatch } from "react-redux";
import { deleteBranch } from "../../Redux/BranchesReducer";

const PopupDel = (props) => {
	const dispatch = useDispatch();

	return (
		<div className={s.background}>
			<div className={s.popup}>
				<h1 className={s.popup__title}>Удаление филиала</h1>
				<div className={s.popup__content}>
					<h2 className={s.popup__subtitle}>
						Вы действительно хотите удалить филиал:
					</h2>
					<h2 className={s.popup__about}>{props.data.adress.city}, {props.data.adress.street} ?</h2>

					<button
						className={s.popup__button}
						onClick={() => {
							dispatch(deleteBranch(props.data.id));
							props.setDelPopup(false);
						}}
					>
						Удалить
					</button>
					<button
						className={s.popup__button}
						onClick={() => {
							props.setDelPopup(false);
						}}
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopupDel;
