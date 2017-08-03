// import permission_default from 'src/global/permission_default'

const getters = {
  	userIn: state => {
		      	return state.user.userInfo
	}, //用户所有信息
	// 员工信息
	staffIn:state => {
		return state.staff.staffManagment
	}
};
export default getters
