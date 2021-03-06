import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const main = r => require.ensure([], () => r(require('../page/main/main')), 'main')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const account = r => require.ensure([], () => r(require('../page/account/center')), 'account')
const info = r => require.ensure([], () => r(require('../page/account/info')), 'info')
const updatenickname = r => require.ensure([], () => r(require('../page/account/info/updateNickname')), 'updatenickname')
const bankcard = r => require.ensure([], () => r(require('../page/account/bankcard')), 'bankcard')
const safe = r => require.ensure([], () => r(require('../page/account/safe')), 'safe')
const lotterys = r => require.ensure([], () => r(require('../page/account/lotterys')), 'lotterys')
const contract = r => require.ensure([], () => r(require('../page/account/contract')), 'contract')
const createbankcard = r => require.ensure([], () => r(require('../page/account/bankcard/create')), 'createbankcard')
const bankcardlist = r => require.ensure([], () => r(require('../page/account/bankcard/list')), 'bankcardlist')
const safehome  = r => require.ensure([], () => r(require('../page/account/safe/home')), 'safehome')
const safepasswd = r => require.ensure([], () => r(require('../page/account/safe/passwd')), 'safepasswd')
const safefundpasswd = r => require.ensure([], () => r(require('../page/account/safe/fundpasswd')), 'safefundpasswd')
const safeanswer = r => require.ensure([], () => r(require('../page/account/safe/answer')), 'safeanswer')
const safeotherlogin = r => require.ensure([], () => r(require('../page/account/safe/otherlogin')), 'safeotherlogin')
const safegoogle = r => require.ensure([], () => r(require('../page/account/safe/google')), 'safegoogle')
const team  = r => require.ensure([], () => r(require('../page/team/team')), 'team')
const teamsummary = r => require.ensure([], () => r(require('../page/team/summary')), 'teamsummary')
const user = r => require.ensure([], () => r(require('../page/team/user')), 'user')
const userlist = r => require.ensure([], () => r(require('../page/team/user/list')), 'userlist')
const createuser  = r => require.ensure([], () => r(require('../page/team/user/createuser')), 'createuser')
const updateuser  = r => require.ensure([], () => r(require('../page/team/user/updateuser')), 'updateuser')
//------------------------------------订单报表------------------------------------------------//
const bets = r => require.ensure([], () => r(require('../page/bets/bets')), 'bets')
const gamerecord = r => require.ensure([], () => r(require('../page/bets/gamerecord')), 'gamerecord')
const chaserecord = r => require.ensure([], () => r(require('../page/bets/chaserecord')), 'chaserecord')
const transaction = r => require.ensure([], () => r(require('../page/bets/transaction')), 'transaction')
const reportlist = r => require.ensure([], () => r(require('../page/bets/reportlist')), 'reportlist')
const agrecord = r => require.ensure([], () => r(require('../page/bets/agrecord')), 'agrecord')
const agreport = r => require.ensure([], () => r(require('../page/bets/agreport')), 'agreport')

//------------------------------------订单报表------------------------------------------------//
//------------------------------------财务管理------------------------------------------------//
const finance = r => require.ensure([], () => r(require('../page/finance/finance')), 'finance')
const recharge = r => require.ensure([], () => r(require('../page/finance/recharge')), 'recharge')
//------------------------------------财务管理------------------------------------------------//

const helpcenter = r => require.ensure([], () => r(require('../page/helpcenter/helpcenter')), 'helpcenter')
const palyways = r => require.ensure([], () => r(require('../page/helpcenter/palyways')), 'palyways')
const deposit = r => require.ensure([], () => r(require('../page/helpcenter/deposit')), 'deposit')
const problem = r => require.ensure([], () => r(require('../page/helpcenter/problem')), 'problem')



const spread = r => require.ensure([], () => r(require('../page/team/spread')), 'spread')
const teambets = r => require.ensure([], () => r(require('../page/team/bets')), 'teambets')
const teamschedule = r => require.ensure([], () => r(require('../page/team/schedule')), 'teamschedule')
const teamreports = r => require.ensure([], () => r(require('../page/team/reports')), 'teamreports')




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '', //地址为空时跳转home页面
            redirect: '/home'
        },
        {
            path: '/home', //首页城市列表页
            name: 'home',
            component: home
        },
        {
            path: '/login', //登录注册页
            name: 'login',
            component: login
        },
        {
            name: 'forget',
            path: '/forget/:username',
            component: forget
        },
        //主页
        {
            path: '/main/:id(\\d+)?/:platform([1-3])?',
            name: 'main',
            component: main
        },
        //我的账户
        {
            path: '/account',
            component: account,
            children: [{
                path: 'info', //个人资料
                name: 'accountInfo',
                component: info,
                children: [{
                    path: 'updateNickname', //修改昵称
                    name: 'updateNickname',
                    component: updatenickname,
                }]
            },{
                path: 'bindbankcard', //银行卡绑定
                name: 'accountBankcard',
                component: bankcard,
                children: [{
                    path: 'create', //修改昵称
                    name: 'createBankcard',
                    component: createbankcard,
                },{
                    path: 'list', //修改昵称
                    name: 'bankCardList',
                    component: bankcardlist,
                }]
            },{
                path: 'safe', //账户安全
                name: 'accountSafe',
                component: safe,
                children: [{
                    path: 'safehome', //修改昵称
                    name: 'safehome',
                    component: safehome,
                },{
                    path: 'safepasswd', //修改昵称
                    name: 'safepasswd',
                    component: safepasswd,
                },{
                    path: 'safefundpasswd', //修改昵称
                    name: 'safefundpasswd',
                    component: safefundpasswd,
                },{
                    path: 'safeanswer', //修改昵称
                    name: 'safeanswer',
                    component: safeanswer,
                },{
                    path: 'safeotherlogin', //修改昵称
                    name: 'safeotherlogin',
                    component: safeotherlogin,
                },{
                    path: 'safegoogle', //修改昵称
                    name: 'safegoogle',
                    component: safegoogle,
                }
                ]
            },{
                path: 'lotterys', //彩种信息
                name: 'accountLotterys',
                component: lotterys,
            },{
                path: 'contract', //我的契约
                name: 'accountContract',
                component: contract,
            }]
        },
        //代理管理
        {
            path: '/team',
            component: team,
            children: [{
                path: 'index', //团队总览
                name: 'teamsummary',
                component: teamsummary,
            },{
                path: 'createuser', //会员管理
                name: 'createuser',
                component: createuser,
            },{
                path: 'user', //会员管理
                name: 'user',
                component: user,
                children: [{
                    path: 'list', //会员管理
                    name: 'userlist',
                    component: userlist,
                },{
                    path: 'update/:uid', //会员管理
                    name: 'updateuser',
                    component: updateuser,
                },]
            },{
                path: 'spread', //推广管理
                name: 'spread',
                component: spread,
            },{
                path: 'bets', //团队投注
                name: 'teambets',
                component: teambets,
            },{
                path: 'schedule', //团队追号
                name: 'teamschedule',
                component: teamschedule,
            },{
                path: 'reports', //团队报表
                name: 'teamreports',
                component: teamreports,
            }]
        },
        //订单报表
        {
            path: '/bets',
            component: bets,
            children: [{
                path: 'gamerecord', //游戏记录
                name: 'gamerecord',
                component: gamerecord,
            }, {
                path:'agrecord',//真人电子投注
                name: 'agrecord',
                component: agrecord,
            },{
                path:'chaserecord',//追号记录
                name: 'chaserecord',
                component: chaserecord,
            },{
                path: 'transaction',//账变记录
                name: 'transaction',
                component: transaction,
            },{
                path: 'reportlist', //盈亏报表
                name: 'reportlist',
                component: reportlist,
            },{
                path:'agreport',//真人电子报表
                name:'agreport',
                component:agreport,
            }]
        },
        //财务管理
        {
            path: '/finance',
            component: finance,
            children: [{
                path: 'recharge', //用户充值
                name: 'recharge',
                component: recharge,
            }]
        },
        //帮助中心
        {
            path: '/helpcenter', 
            component: helpcenter,
            children: [{
                path: 'palyways', //玩法介绍
                name: 'palyways',
                component: palyways,
            },{
                path:"deposit",//如何存款
                name:'deposit',
                component: deposit,
            }, {
                path: "problem",//常见问题
                name: 'problem',
                component: problem,
            }]
        }
    ]
}]