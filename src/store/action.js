import {
	getBalance,
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS,
	GET_BALANCE
} from './mutation-types.js'

export default {
	async getBalance({
		commit,
		state
	}) {
		let res = await getBalance();
		if(res != undefined && res.code == 0){
			commit(GET_BALANCE,  res.result.accountBalance);
		} else {
			commit(GET_BALANCE,  null);
		}
	},
	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		if(res != undefined && res.code == 0){
			commit(GET_USERINFO,  res.result.userInfo);
		} else {
			commit(GET_USERINFO,  null);
		}
	},
}