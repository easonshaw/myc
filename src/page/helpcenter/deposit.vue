<template>
    <div class="help-content">
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>没有网银怎么进行充值？
                </template>
                <div class="ask">A</div><span>选择充值页面银行存款选项，根据页面提示的卡号信息到柜台或ATM进行存款，存款后通过在线客服协助核对；平台也有提供支付宝、微信、财付通渠道，可以多加利用，谢谢</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>每日存款限额是多少？存款时间到几点？什么时候到帐？
                </template>
                <div class="ask">A</div><span>1.选择支付宝入款最低10元，最高100000元;2.存款时间：存款不限次数，支付宝、网银、财付通、微信、第三方在线24小时皆可入款3.所有入款到帐时间为银行或该交易渠道商处理完毕，皆可及时到帐，跨行用户请使用跨行快汇才能极速到账，若长时间尚未到帐，可联系在线客服协助查询款项；第三方到帐时间一般为及时到帐，若在30分钟内还未到帐，可联系在线客服协助查询款项</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>转帐附言是什么？为什么一定要填？
                </template>
                <div class="ask">A</div><span>填写充值金额并获取存款卡号的时候，在您通过银行/支付宝等存款方式转账时，除了准确金额和转账账户以外，请一定要在备注/附言/捎句话等处填上会员帐号或真实姓名，否则无法自动到账。若填错或不填的话，存款无法及时到帐，需要联系在线客服协助查询</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>忘记填写附言转帐不到怎么办?
                </template>
                <div class="ask">A</div><span>您好，请您将"转账姓名、转账金额、具体转账时间、转帐交易号"联系在线客服提供处理，谢谢</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>存款到已停用（旧）存款帐户怎么办?
                </template>
                <div class="ask">A</div><span>每次存款前请获取最新的银行卡账户，存至旧的银行卡账户墨月城恕不负责</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>取款一般多久能到帐?
                </template>
               <div class="ask">A</div><span>墨月城娱乐承诺，除非遇到非可控因素（如银行维护等相关问题）我们将为您提供在180秒至300秒内快速到帐的提款服务</span>
            </el-collapse-item>
             <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>单笔取款金额是多少？那每日取款限额是多少？取款时间到几点?
                </template>
               <div class="ask">A</div><span>1.单笔取款金额最低为100元，最高为50000元，提现次数免费5次会员提款必须要消费充值的百分之30方可免手续费，否则无法进行提交提款申请单动作。2.每日取款最高250000元；若是VIP客户将享有专线服务，不在此限3.取款时间为：每日24小时</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>可以用多少张银行卡取款?
                </template>
               <div class="ask">A</div><span>您可以使用自己姓名的多张银行卡进行提款申请，但不能使用除了注册姓名之外的银行卡进行提款</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>免费取款标准是什么?
                </template>
               <div class="ask">A</div><span>您好，每次取款必须达到充值金额的消费百分之30，方可免费取款，谢谢</span>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>为什么我取款有时候没有即时到帐?
                </template>
               <div class="ask">A</div><span>您好，若是您在取款高峰期申请取款，财务部门将会依序处理，若是您希望您的款项飞速到帐，可联系在线客服协助贴心提醒：银行短信有时候没有及时通知服务，容易让客户误会款项尚未取款成功，建议您养成实际到银行查收款项的习惯，避免造成对平台的误解，谢谢</span>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    // import {} from '../../service/getData'

    export default {
        data(){
            return{
                
            }    
        },
    }
</script>

<style lang="scss" scoped>
.icon{
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    margin-top: 6px;
    line-height: 36px;
    font-size: 1.8em;
    font-weight: bold;
    margin-right: 15px;
}
.ask{
    width: 36px;
    height: 36px;
    background: #F39800;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    line-height: 36px;
    font-size: 1.8em;
    font-weight: bold;
    margin-right: 15px;
    color: #fff;
}
</style>
