// @ts-nocheck

import s from "./App.module.css";
import { Table, Col, Row } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchesData } from "./Redux/BranchesReducer";
import InputMask from "react-input-mask";
import PopupAdd from "./Components/PopupAdd/PopupAdd";
import PopupDel from "./Components/PopupDel/PopupDel";

const App = () => {
	const dispatch = useDispatch();

	//  Состояние прелоадера
	const [isLoading, setIsLoading] = useState(true);

	//  Состояние попапа добавления
	const [addPopup, setAddPopup] = useState(false);

	//  Состояние попапа удаления
	const [delPopup, setDelPopup] = useState(false);

	//  При нажатии удаления в таблице мы сохраняем сюда значения полей удаляемой строки для передачи в попап
	const [delData, setDelData] = useState({});

	//  Функция сортировки
	const uniSort = (a, b) => (isNaN(a) && isNaN(b) ? a.localeCompare(b) : a - b);

	//  Настройки колонок таблицы
	const columns = [
		{
			title: "№",
			dataIndex: "id",
			sorter: (a, b) => uniSort(a.id, b.id),
			elipsis: true,
		},
		{
			title: "Адрес",
			dataIndex: "adress",
			sorter: (a, b) => uniSort(a.adress.street, b.adress.street),
			render: (adress) => (
				<div className={s.adressBlock}>
					<b className={s.adressBlock__street}>{adress.street}</b>
					<div className={s.adressBlock__city}>{adress.city}</div>
				</div>
			),
		},
		{
			title: "Телефон",
			dataIndex: "phone",
			sorter: (a, b) => uniSort(a.phone, b.phone),
		},
		{
			title: "Управляющий офиса",
			dataIndex: "manager",
			sorter: (a, b) => uniSort(a.manager, b.manager),
		},
		{
			title: "Администратор офиса",
			dataIndex: "admin",
			sorter: (a, b) => uniSort(a.admin, b.admin),
		},
		{
			title: "Статус",
			dataIndex: "isActive",
			sorter: (a, b) => uniSort(a.isActive, b.isActive),
			render: (active) => (
				<>
					{active ? (
						<div className={s.activeBtn}>Активный</div>
					) : (
						<div className={s.inactiveBtn}>Неактивный</div>
					)}
				</>
			),
		},
		{
			title: "Действия",
			render: (idk, data) => (
				<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
					<div
						className={s.deleteBtn}
						onClick={() => {
							setDelData(data);
							setDelPopup(true);
						}}
					></div>
				</div>
			),
			align:"center"
		},
	];

	//  Стэйт со значением инпута поиска
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		//  Таймаут для демонстрирования работы лоадера, т.к данные приходят почти моментально
		setTimeout(() => {
			dispatch(getBranchesData()).then(setIsLoading(false));
		}, 1000);
	}, [dispatch]);

	//	Принимаем из стора массив для фильтрации
	const branchesData = useSelector(
		(state) => state.BranchesReducer.branchesData
	);
	const filteredItems = branchesData.filter((val) => {
		if (searchTerm) {
			return val.phone.includes(searchTerm);
		} else {
			return val;
		}
	});

	return (
		<div className={s.global}>
			{addPopup ? <PopupAdd setAddPopup={setAddPopup} /> : null}
			{delPopup ? <PopupDel data={delData} setDelPopup={setDelPopup} /> : null}

			<Row justify="center">
				<Col>
					<h1 className={s.title}>Филиалы</h1>
					<div className={s.searchForm}>
						<InputMask
							mask="+7 999 999-99-99"
							maskChar={null}
							value={searchTerm}
							className={s.searchForm__input}
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
						/>
						<button className={s.addBtn} onClick={() => setAddPopup(true)}>
							Добавить
						</button>
					</div>
					<Table
						className={s.table}
						dataSource={filteredItems}
						loading={isLoading}
						columns={columns}
						pagination={false}
						rowKey="id"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default App;
