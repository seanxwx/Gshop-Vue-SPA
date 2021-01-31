<template>
	<section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">G Shop</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: loginMethod}" @click="loginMethod=true">Text Msg Login</a>
            <a href="javascript:;" :class="{on: !loginMethod}" @click="loginMethod=false">Password Login</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on: loginMethod}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="Mobile Number" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" 
												:class="{right_phone: rightPhone}" @click.prevent="getCode">
									{{computeTime > 0 ? `Sent(${computeTime}s)` : 'Get Verification Code'}}
								</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="verification code" v-model="code">
              </section>
              <section class="login_hint">
                Tips: If you have not registered your G shop account, you will automatically register when you log in.
                <a href="javascript:;">User Agreement</a>
              </section>
            </div>
            <div :class="{on: !loginMethod}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="Mobile/Email/Username" v-model="name">
                </section>
                <section class="login_verification">
									<input type="text" maxlength="8" placeholder="password" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="password" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd ? 'on' : 'off' " @click="showPwd =! showPwd">
                    <div class="switch_circle" :class="{right: showPwd}"></div>
                    <span class="switch_text">{{showPwd ? 'abc': '...' }}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="verification code" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
											@click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">Login</button>
          </form>
          <a href="javascript:;" class="about_us">About</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
			<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
export default {
	data(){
		return {
			loginMethod: true, // true --- text message login // flase --- password login
			computeTime: 0, // count time
			showPwd: false, // whether show password or not
			phone: '', // mobile number
			code: '', // mobile text verification code
			name: '', //username
			pwd: '',// pwd
			captcha: '', //picture verification code
			alertText: '', //alert text
			alertShow: false, //if show alert modal
		}
	},
	computed: {
		rightPhone(){
			return /^1\d{10}$/.test(this.phone)
		}
	},
	methods:{
		//async get text verification code
		async getCode(){
			//if no countdown for now
			if(!this.computeTime){
				//start countdown
				this.computeTime = 30;
				this.intervalId = setInterval(()=>{
					this.computeTime--
					if(this.computeTime <= 0){
						//stop countdown
						clearInterval(this.intervalId)
					}
				}, 1000)
				//send ajax request(send verification text msg to mobile)
				const result = await reqSendCode(this.phone)
				if(result.code ===1 ){
					//display tip
					this.showAlert(result.msg)
					//end countdown
					if(this.computeTime){
						this.computeTime = 0
						clearInterval(this.intervalId)
						this.intervalId = undefined
					}
				}
			}
			
		},

		showAlert(alertText){
			this.alertShow = true
			this.alertText =  alertText
		},

		async login(){
			// console.log('loginnnnn')
			let result
			//form validation
			if(this.loginMethod){ //text login
				const {rightPhone, phone, code} = this
				if(!this.rightPhone){
					//mobile number incorrect
					this.showAlert('Mobile Number incorrect.')
					return
				}else if(!/^\d{6}$/.test(code)){
					//verification code has to be 6-digit number.
					this.showAlert('Verification code has to be 6-digit number.')
					return
				}
				//send ajax request sms login
				result = await reqSmsLogin(phone, code)

			}else{ //password login
				const {name, pwd, captcha} = this
				if(!this.name){
					//username cannot be empty
					this.showAlert('Username cannot be empty.')
					return
				}else if(!this.pwd){
					//password cannot be empty
					this.showAlert('Password cannot be empty.')
					return
				}else if(!this.captcha){
					//captcha cannot be empty
					this.showAlert('Captcha cannot be empty.')
					return
				}
				//send ajax request pwd login
				result = await reqPwdLogin({name, pwd, captcha})
			}
			//end countdown
			if(this.computeTime){
				this.computeTime = 0
				clearInterval(this.intervalId)
				this.intervalId = undefined
			}
			
			//handle data based on result
			if(result.code===0){
				const user = result.data
				//save user into vuex's state
				this.$store.dispatch('recordUser', user)
				//go to profile page
				this.$router.replace('/profile')
			}else{
				//show new picture verification code
				this.getCaptcha()
				//show waring msg
				const msg = result.msg
				this.showAlert(msg)
			}

		},

		closeTip(){
			this.alertShow = false
			this.alertText =  ''
		},
		//get new picture varification code every time
		getCaptcha(){
			this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
		}
	},

	components:{
		AlertTip
	}

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl"
	.loginContainer
		width 100%
		height 100%
		background #fff
		.loginInner
			padding-top 60px
			width 80%
			margin 0 auto
			.login_header
				.login_logo
					font-size 40px
					font-weight bold
					color #02a774
					text-align center
				.login_header_title
					padding-top 40px
					text-align center
					>a
						color #333
						font-size 14px
						padding-bottom 4px
						&:first-child
							margin-right 40px
						&.on
							color #02a774
							font-weight 700
							border-bottom 2px solid #02a774
			.login_content
				>form
					>div
						display none
						&.on
							display block
						input
							width 100%
							height 100%
							padding-left 10px
							box-sizing border-box
							border 1px solid #ddd
							border-radius 4px
							outline 0
							font 400 14px Arial
							&:focus
								border 1px solid #02a774
						.login_message
							position relative
							margin-top 16px
							height 48px
							font-size 14px
							background #fff
							.get_verification
								position absolute
								top 50%
								right 10px
								transform translateY(-50%)
								border 0
								color #ccc
								font-size 14px
								background transparent
								&.right_phone
									color black
						.login_verification
							position relative
							margin-top 16px
							height 48px
							font-size 14px
							background #fff
							.switch_button
								font-size 12px
								border 1px solid #ddd
								border-radius 8px
								transition background-color .3s,border-color .3s
								padding 0 6px
								width 30px
								height 16px
								line-height 16px
								color #fff
								position absolute
								top 50%
								right 10px
								transform translateY(-50%)
								&.off
									background #fff
									.switch_text
										float right
										color #ddd
								&.on
									background #02a774
								>.switch_circle
									//transform translateX(27px)
									position absolute
									top -1px
									left -1px
									width 16px
									height 16px
									border 1px solid #ddd
									border-radius 50%
									background #fff
									box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
									transition transform .3s
									&.right
										transform translateX(30px)
						.login_hint
							margin-top 12px
							color #999
							font-size 14px
							line-height 20px
							>a
								color #02a774
					.login_submit
						display block
						width 100%
						height 42px
						margin-top 30px
						border-radius 4px
						background #4cd96f
						color #fff
						text-align center
						font-size 16px
						line-height 42px
						border 0
				.about_us
					display block
					font-size 12px
					margin-top 20px
					text-align center
					color #999
			.go_back
				position absolute
				top 5px
				left 5px
				width 30px
				height 30px
				>.iconfont
					font-size 20px
					color #999

</style>