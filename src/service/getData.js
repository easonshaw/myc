import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 墨月城-获取验证码
 */
export const getcaptchacode = () => fetch('/fore/vCode', {}, 'GET', 'fetch', 'text');

/**
 * 墨月城-账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/fore/login', {userName:username, password:password, vCode:captcha_code}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取用户余额
 */
export const getBalance = () => fetch('/fore/user/balance', {}, 'GET', 'fetch');

/**
 * 墨月城-获取用户信息
 */
export const getUser = (gameTypeGroupId='') => fetch('/fore/user/bonusInfo?rd='+Math.random()+'&gameTypeGroupId='+gameTypeGroupId, {}, 'GET');

/**
 * 墨月城-用户是否存在
 */
export const userExists = (username) => fetch('/public/userExists?userName='+username, {}, 'GET');

/**
 * 墨月城-获取找回渠道
 */
export const userPassgetWay = (username) => fetch('/public/forgotPwd/getWay?userName='+username, {}, 'GET');

/**
 * 墨月城-改密码（帐号）
 */
export const changePassword = (username, bankCardName, fundsPwd, answer, newPwdLogin) => fetch('/public/forgotPwd/update', {userName:username, bankCardName:bankCardName, fundsPwd:fundsPwd, answer:answer, newPwdLogin:newPwdLogin}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-退出登录
 */
export const signout = () => fetch('/fore/loginOut');

/**
 * 墨月城-公告资讯
 */
export const getNotice = (type, page, size) => fetch('/fore/notice/alert?type='+type+'&page='+page+'&size='+size, {}, 'GET');

/**
 * 墨月城-修改昵称
 */
export const setNickname = (nickName) => fetch('/fore/user/nickNameSet', {nickName:nickName}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取银行卡列表
 */
export const getBankCards = () =>  fetch('/fore/bank/list/user?rd='+Math.random(), {}, 'GET');

/**
 * 墨月城-获取银行列表
 */
export const getBankList = () =>  fetch('/fore/bank/list?rd='+Math.random(), {}, 'GET');

/**
 * 墨月城-锁定用户银行卡
 */
export const setBankLockStatus = () => fetch('/fore/bank/lock?rd='+Math.random(), {}, 'POST');

/**
 * 墨月城-创建银行卡
 */
export const addBankCard = (bankId, branchAddress, branchName, cardNo, cardUser, fundsPwd, firstCardNo) => fetch('/fore/bank/create', {bankId:bankId, branchAddress:branchAddress, branchName:branchName, cardNo:cardNo, cardUser:cardUser, fundsPwd:fundsPwd, firstCardNo:firstCardNo}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-修改登录密码
 */
export const setLoginPwd = (oldLoginPwd ='', newLoginPwd, ggCode = '') => fetch('/fore/safe/upLoginPwd', {oldLoginPwd:oldLoginPwd, newLoginPwd:newLoginPwd, ggCode:ggCode}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-修改资金密码
 */
export const setFundPwd = (oldFundPwd = '', newFundPwd, ggCode = '') => fetch('/fore/safe/upFundPwd', {oldFundPwd:oldFundPwd, newFundPwd:newFundPwd, ggCode:ggCode}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取安全信息
 */
export const getSafeInfo = () =>  fetch('/fore/safe/info?rd='+Math.random(), {}, 'GET');

/**
 * 墨月城-获取密保问题
 */
export const getSafeQuestion = () =>  fetch('/fore/safe/questionList?rd='+Math.random(), {}, 'GET');

/**
 * 墨月城-设置密保问题
 */
export const setanswerQue = (question, answer) => fetch('/fore/safe/answerSet', {question:question, answer:answer}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-设置异地登录
 */
export const setotherLogin = (status) => fetch('/fore/safe/otherLogin', {status:status}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取二维码
 */
export const getQrcode  = () =>  fetch('/fore/safe/qrcodeCreate', {}, 'GET');

/**
 * 墨月城-设置是否谷歌验证
 */
export const setgooglebinding = (pwdFuns, code, secret) => fetch('/fore/safe/googleBinding', {pwdFuns:pwdFuns, code:code, secret:secret}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取团队总览
 */
export const getTeamAnalysis = (startTime, endTime) =>  fetch('/fore/team/analysis?rd='+Math.random()+'&startTime='+startTime+'&endTime='+endTime, {}, 'GET');

/**
 * 墨月城-获取团队会员列表
 */
export const getTeamMemberList = (page=1, size, field='', direction='', userName='') => fetch('/fore/team/list', {page:page, size: size, field:field, direction:direction, userName:userName}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-修改会员信息
 */
export const updateUser = (id, accountType, rebatePointSSC, rebatePointLFFFC, rebatePointMMC, rebatePointFTC, rebatePoint11X5, rebatePointLF11X5, rebatePointBJSC, rebatePointK3, rebatePointBLYZ, rebatePointZRSX, quota1 = 0, quota2 = 0, quota3 = 0) => fetch('/fore/team/update', {
    id:id,
    accountType:accountType,
    rebatePointSSC:rebatePointSSC,
    rebatePointLFFFC:rebatePointLFFFC,
    rebatePointMMC:rebatePointMMC,
    rebatePointFTC:rebatePointFTC,
    rebatePoint11X5:rebatePoint11X5,
    rebatePointLF11X5:rebatePointLF11X5,
    rebatePointBJSC:rebatePointBJSC,
    rebatePointK3:rebatePointK3,
    rebatePointBLYZ:rebatePointBLYZ,
    rebatePointZRSX:rebatePointZRSX,
    quota1:quota1,
    quota2:quota2,
    quota3:quota3,
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-创建会员信息
 */
export const createUser = (userName, accountType, rebatePointSSC, rebatePointLFFFC, rebatePointMMC, rebatePointFTC, rebatePoint11X5, rebatePointLF11X5, rebatePointBJSC, rebatePointK3, rebatePointBLYZ, rebatePointZRSX, quota1 = 0, quota2 = 0, quota3 = 0) => fetch('/fore/team/create', {
    userName:userName,
    accountType:accountType,
    rebatePointSSC:rebatePointSSC,
    rebatePointLFFFC:rebatePointLFFFC,
    rebatePointMMC:rebatePointMMC,
    rebatePointFTC:rebatePointFTC,
    rebatePoint11X5:rebatePoint11X5,
    rebatePointLF11X5:rebatePointLF11X5,
    rebatePointBJSC:rebatePointBJSC,
    rebatePointK3:rebatePointK3,
    rebatePointBLYZ:rebatePointBLYZ,
    rebatePointZRSX:rebatePointZRSX,
    quota1:quota1,
    quota2:quota2,
    quota3:quota3,
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-当前登录用户玩法列表
 */
export const getPlays = (gameId, pFrom = '', version = '') => fetch('/fore/lottery/plays/'+gameId+'?pFrom='+pFrom+'&version='+version, {}, 'GET');

/**
 * 墨月城-修改返点前初始化数据
 */
export const getUserbeforeUpdate = (userId) => fetch('/fore/team/beforeUpdate', {userId:userId}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-创建推广链接
 */
export const createSpread = (remark, accountType, rebatePointSSC, rebatePointLFFFC, rebatePointMMC, rebatePointFTC, rebatePoint11X5, rebatePointLF11X5, rebatePointBJSC, rebatePointK3, rebatePointBLYZ, rebatePointZRSX) => fetch('/fore/spread/create', {
    remark:remark,
    accountType:accountType,
    bonusSSC:rebatePointSSC,
    rebatePointSSC:rebatePointSSC,
    rebatePointLFFFC:rebatePointLFFFC,
    rebatePointMMC:rebatePointMMC,
    rebatePointFTC:rebatePointFTC,
    rebatePoint11X5:rebatePoint11X5,
    rebatePointFF11X5:rebatePointLF11X5,
    rebatePointBJSC:rebatePointBJSC,
    rebatePointK3:rebatePointK3,
    rebatePointBLYZ:rebatePointBLYZ,
    rebatePointZRSX:rebatePointZRSX,
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取推广链接列表
 */
export const getSpreadList = (page = 1, size = 10) =>  fetch('/fore/spread/list?page='+page+'&size='+size, {}, 'GET');


/**
 * 墨月城-获取登录用户有效游戏类型
 */
export const gamesType = () => fetch('/fore/lottery/plays', {}, 'GET');

/**
 * 墨月城-获取投注记录(游戏记录)
 */
export const betList = (page = 1, size, type) => fetch('/fore/bet-record/list', { page: page, size: size, type: type }, 'POST', 'fetch', 'json', true);


