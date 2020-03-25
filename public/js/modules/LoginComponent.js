const socket = io();

export default {   
    template: `
    <div id="formapp">
        <h2>Chat App</h2>
        <form @submit.prevent="login" id="my-form">
            
            <label for="username">Username:</label>
            <input v-model="input.username" type="text" name="username" id="username" value="">
        
        
            <label for="password">Password:</label>
            <input v-model="input.password" id="password" type="password" name="password"   value="">
            

           
            <label for="nickname">Nickname</label>
            <input v-model="input.nickname" id="nickname" type="text" name="nickname"  value="">
            

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
                      
        }
    },

    methods:{
        login() {
            if(this.input.username != '' && this.input.password != ''){
                if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                    this.$emit("authenticated", true);
                    
                    socket.emit('new_user', this.input.nickname);
                    // send the username via the route (as a parameter - this gets pushed into props in the message component)
                    this.$router.push({ name: "message", params: { myusername:this.input.nickname } });
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username password and nickname must be present");
            }
        }
    }       
}

    