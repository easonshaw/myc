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
export const updateUser = (id, accountType, rebatePointSSC, rebatePointLFFFC, rebatePointMMC, rebatePointFTC, rebatePoint11X5, rebatePointLF11X5, rebatePointBJSC, rebatePointK3, rebatePointZRSX, quota1 = 0, quota2 = 0, quota3 = 0) => fetch('/fore/team/update', {
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
    rebatePointZRSX:rebatePointZRSX,
    quota1:quota1,
    quota2:quota2,
    quota3:quota3,
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-创建会员信息
 */
export const createUser = (userName, accountType, rebatePointSSC, rebatePointLFFFC, rebatePointMMC, rebatePointFTC, rebatePoint11X5, rebatePointLF11X5, rebatePointBJSC, rebatePointK3, rebatePointZRSX, quota1 = 0, quota2 = 0, quota3 = 0) => fetch('/fore/team/create', {
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
export const createSpread = (remark, accountType, rebatePointSSC, rebatePointLFFFC, rebatePointMMC, rebatePointFTC, rebatePoint11X5, rebatePointLF11X5, rebatePointBJSC, rebatePointK3, rebatePointZRSX) => fetch('/fore/spread/create', {
    remark:remark,
    accountType:accountType,
    bonusSSC:rebatePointSSC,
    rebatePointSSC:rebatePointSSC,
    rebatePointLFFFC:rebatePointLFFFC,
    rebatePointMMC:rebatePointMMC,
    rebatePointFTC:rebatePointFTC,
    rebatePoint11X5:rebatePoint11X5,
    rebatePointLF11X5:rebatePointLF11X5,
    rebatePointBJSC:rebatePointBJSC,
    rebatePointK3:rebatePointK3,
    rebatePointZRSX:rebatePointZRSX,
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取推广链接列表
 */
export const getSpreadList = (page = 1, size = 10, field = '', direction = '') =>  fetch('/fore/spread/list?page='+page+'&size='+size+'&field='+field+'&direction='+direction+'&rd='+Math.random(), {}, 'GET');

/**
 * 墨月城-当前登录用户有效游戏列表
 */
export const getGames = () => fetch('/fore/lottery/games', {}, 'GET');

/**
 * 墨月城-获取推广链接详情
 */
export const getSpreadDetail = (id) =>  fetch('/fore/spread/detail?id='+id+'&rd='+Math.random(), {}, 'GET');

/**
 * 墨月城-删除推广链接
 */
export const delSpread = (id) => fetch('/fore/spread/delete', {id:id}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取投注记录(游戏记录)
 */
export const betList = (startTime, endTime, field, direction, gameId, issue, billNo, page = 1, size, type) => fetch('/fore/bet-record/list', { startTime: startTime, endTime: endTime, field: field, direction: direction, gameId: gameId, issue: issue, billNo:billNo,page: page, size: size, type: type }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取近期投注记录
 */
export const getlatelybetList = (count = 10) => fetch('/fore/bet-record/lately', { count: count  }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取单条投注明细
 */
export const getbetDetail = (orderNo) => fetch('/fore/bet-record/list/'+orderNo, {}, 'GET', 'fetch', 'json', true);

/**
 * 墨月城-当前登录用户的追号记录
 */
export const chaseRecord = (startTime, endTime, gameId, page = 1, size, field, direction) => fetch('/fore/chase-record/list', { startTime: startTime, endTime: endTime, gameId: gameId, page: page, size: size, field: field, direction: direction}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-我的帐变明细记录查询
 */
export const transaction = (startTime, endTime, billNo, page = 1, size, type, field, direction) => fetch('/fore/transaction/list', { startTime: startTime, endTime: endTime, billNo: billNo, page: page, size: size, type: type, field: field, direction: direction}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-我的报表(盈亏报表)
 */
export const getReport = (startTime, endTime, type, userName = '') => fetch('/fore/report/list', { startTime: startTime, endTime: endTime, type: type, userName:userName }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取登录用户充提记录
 */
export const getRechargeList = (startTime, endTime, page = 1, size, type, field, direction) => fetch('/fore/recharge/list', { startTime: startTime, endTime: endTime, page: page, size: size, type: type, field: field, direction: direction }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取团队投注记录(游戏记录)
 */
export const getTeamBetList = (page = 1, size,  field, direction , startTime, endTime, type, userName = '', gameId, issue, billNo) => fetch('/fore/bet-record-team/list', {
    page: page,
    size: size,
    field: field,
    direction: direction,
    startTime: startTime,
    endTime: endTime,
    type: type,
    userName: userName,
    gameId: gameId,
    issue: issue,
    billNo: billNo
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取团队追号记录
 */
export const getTeamScheduleList = (page = 1, size,  field, direction , startTime, endTime, userName = '', gameId) => fetch('/fore/chase-record-team/list', {
    page:page,
    size:size,
    field:field,
    direction:direction,
    startTime:startTime,
    endTime:endTime,
    userName:userName,
    gameId:gameId,
}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取团队报表记录
 */
export const getTeamReportsList = (page = 1, size,  field, direction , startTime, endTime, userName = '', type, floor = '') => fetch('/fore/report-team/list', {
    page:page,
    size:size,
    field:field,
    direction:direction,
    startTime:startTime,
    endTime:endTime,
    userName:userName,
    type:type,
    floor:floor,
}, 'POST', 'fetch', 'json', true);


/**
 * 墨月城-获得游戏玩法
 */
export const getLotteryPlays = (gameId) => fetch('/fore/lottery/plays/'+gameId, {}, 'GET', 'fetch', 'json', true);

/**
 * 墨月城-获得VR第三方链接
 */
export const getVrLoginUrl = (gameId) => fetch('/fore/lottery/getVrLoginUrl', {gameId:gameId}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获得VR第三方链接
 */
export const getAgLoginUrl = () => fetch('/fore/third/getLoginUrl', {platform:2, gameType:0, isTryPlay:0}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获得当前期数据
 */
export const getCurIssue = (gameId) => fetch('/fore/lotteryNumber/curIssue', {gameId:gameId, rd:Math.random()}, 'GET', 'fetch', 'json', false);

/**
 * 墨月城-获得历史数据
 */
export const getLotteryHistory = (gameId, count = 15) => fetch('/fore/lotteryNumber/history', {gameId:gameId, count:count, rd:Math.random()}, 'GET', 'fetch', 'json', false);

/**
 * 墨月城-获得游戏冷热遗漏值
 */
export const getLotteryMissCold = (gameId) => fetch('/fore/lotteryNumber/hot-cold', {gameId:gameId, rd:Math.random()}, 'GET', 'fetch', 'json', false);

/**
 * 墨月城-获取支付方式
 */
export const getPayWays = (pFrom, version) => fetch('/fore/recharge/pay-ways', { pFrom: pFrom, version: version}, 'GET');

/**
 * 墨月城-第三方充值
 */
export const submitOnline = (merchantId, platformName, bankId, bankName, amount) => fetch('/fore/recharge/submit-online', { merchantId: merchantId, platformName: platformName, bankId: bankId, bankName, bankName, amount: amount }, 'GET');

/**
 * 墨月城-线下充值:入参说明1-支付宝转账;2-网银汇款等;
 */
export const submitOffline = (rechargeType, bankId, amount, payeeAccountName) => fetch('/fore/recharge/submit-offline', { rechargeType: rechargeType, bankId: bankId, amount: amount, payeeAccountName, payeeAccountName }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取用户提款前初始化数据
 */
export const getwithdrawData = () => fetch('/fore/withdraw/before', {}, 'GET', 'fetch', 'json');

/**
 * 墨月城-用户提款
 */
export const withdrawSubmit = (userBankCardId, amount, pwdFuns) => fetch('/fore/withdraw/submit', { userBankCardId: userBankCardId, amount: amount, pwdFuns: pwdFuns}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取各平台余额(额度转换前初始化数据)
 */
export const getThirdBalance = (pFrom, version) => fetch('/fore/third-exchange/balance', { pFrom: pFrom, version: version}, 'GET');

/**
 * 墨月城-额度转换
 */
export const exchangeSubmit = (platformFrom, platformTo, amount, pwdFuns) => fetch('/fore/third-exchange/submit', { platformFrom: platformFrom, platformTo: platformTo, amount: amount, pwdFuns: pwdFuns }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-转点功能
 */
export const transferSubmit = (userId, pwdFunds, transferType, amount) => fetch('/fore/transfer/submit', { userId: userId, pwdFunds: pwdFunds, transferType: transferType, amount: amount }, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-获取登录用户转点记录
 */
export const getTransferList = (page = 1, size, field, direction, type, startTime, endTime) => fetch('/fore/transfer/list', { page: page, size: size, field: field, direction: direction, type: type, startTime: startTime, endTime: endTime}, 'POST', 'fetch', 'json', true);

/**
 * 墨月城-额度转换记录
 */
export const getExchangeList = (page = 1, size, field, direction, type, startTime, endTime) => fetch('/fore/third-exchange-record/list', { 
    page: page, 
    size: size, 
    field: field, 
    direction: direction, 
    type: type, 
    startTime: startTime, 
    endTime: endTime 
}, 'GET', "fetch", "json");

/**
 * 墨月城-获取活动优惠
 */
export const getActivitys = () => fetch('/fore/activity/list', {}, 'GET');
