// imports always go first - if we're importing anything
import ChatMessage from "./modules/MessageComponent.js";
import LoginComponent from "./modules/LoginComponent.js";


(() => {
    const socket = io();

    function setUserId({sID}) {
        // debugger;
        console.log(sID);
        vm.sockData.socketID = sID;
    }
    
    function showDisconnectMessage() {
        console.log('a user disconnected');
    }
    
    // function appendMessage(message) {
    //     vm.sockData.messages.push(message); 
    // }


    let router = new VueRouter(
        {
            routes:[
                { path:'/', redirect:{name:'login'} },
                { path:'/login', name:'login', component:LoginComponent },
                { path:'/message', name:'message', component:ChatMessage},

            ]
        }
    );


    const vm = new Vue({
        data(){
            return{
                authenticated: false,
                notice: false,
                mockAccount:{
                    username:'admin',
                    password:'admin'
                } 
                ,
                sockData:{
                    socketID: "",
                    message: "",
                    nickname: "",
                    messages: []
                },
                // notices = 'hello'
            }
        },


        methods:{
            setAuthenticated(status) {
                this.authenticated = status;
                // this.notice= status;
            },
            logout(){
                this.authenticated = false;
                // this.notice = false;
                this.$router.push({ path: "/login" });
            },
                       

        },

        router:router
    }).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
// socket.addEventListener('new_message', appendMessage);

})();



