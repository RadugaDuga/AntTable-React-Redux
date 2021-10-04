// @ts-nocheck

import axios from "axios";

const ADD_BRANCH = "ADD_BRANCH";
const DELETE_BRANCH = "DELETE_BRANCH";
const SET_BRANCHES = "SET_BRANCHES";



let initialState = {
	branchesData: [],
	mockId:11
}


const BranchesReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_BRANCH:
			return {
                ...state,
				branchesData: state.branchesData.filter( el => el.id !== action.id )
            };
		case SET_BRANCHES:
			return {
                ...state,
				branchesData: action.data
            };
		case ADD_BRANCH:
			return {
                ...state,
				mockId:state.mockId +1,
				branchesData: 
					[
						...state.branchesData,
						{	id: state.mockId,
							phone: action.data.phone,
							adress: {street: action.data.adress, city: "Новосибирск"},
							manager: action.data.manager,
							admin: action.data.admin,
							isActive: false
						}
					]
				}
		default:
			return state;
	}
};


export const addBranch = (data) => ({ type: ADD_BRANCH, data });
export const deleteBranch = id => ({ type: DELETE_BRANCH, id });
export const setBranches = data => ({ type: SET_BRANCHES, data });


export const getBranchesData = () => async  dispatch  => {
	let response = await axios.get('http://localhost:5000/posts')
	dispatch(setBranches(response.data));
};


export default BranchesReducer;
