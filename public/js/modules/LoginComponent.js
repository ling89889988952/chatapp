export default {
    // props: ['user'],
    props: {
        cuser: String,},

    template: `
    <div id="formapp">
        <h2>Welcome to ChatApp!</h2>
        <p>Please fill in the form below.</p>
        <form @submit.prevent="login" id="my-form">
            <label for="username">Username:</label>
            <input v-model="input.username" type="text" name="username" id="username" value="">

            <label for="password">Password:</label>
            <input v-model="input.password" id="password" type="password" name="password"   value="">

            <label for="nickname">Nickname</label>
            <input v-model="input.nickname" id="nickname" type="text" name="nickname" value="" v-bind:cuser="input.nickname">

            <input type="submit" value="Login">
          
        </form>
    </div> 
    `,

    data(){
        return {
            input:{
                username: '',
                password: '',
                nickname:'' 
            },
            // user:{
            //     nickname = input.nickname,
            // }
            
            
        }
    },

    methods:{
        login() {
            if(this.input.username != '' && this.input.password != ''){
                if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                    this.$emit("authenticated", true);
                    this.$emit("notice", true);

                    // this.$emit("nickname", this.input.nickname);
                    this.$router.replace({ name: "message", params:{ currentuser: this.user} });
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username password and nickname must be present");
            }

            }
        },

       
    }

    