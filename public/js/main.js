// imports always go first - if we're importing anything
import MessageComponent from "./modules/MessageComponent.js";
import LoginComponent from "./modules/LoginComponent.js";

(() => {
    const socket = io();

    function setUserId({sID}) {
        console.log(sID);
        vm.sockData.socketID = sID;
    }
    
    function showDisconnectMessage() {
        console.log('a user disconnected');
    }

    let router = new VueRouter({   
        mode: "history",
        
        routes:[
            { path:'/', name: 'login', component: LoginComponent },
            { path:'/welcome-to-chat', name:'message', component: MessageComponent, props: true },
        ]        
    });

    const vm = new Vue({
        data(){
            return{
                authenticated: false,
                notice: false,
                mockAccount:{
                    username:'admin',
                    password:'admin'
                },

                sockData:{
                    socketID: "",
                    message: "",
                    nickname: "",
                    messages: []
                },
            }
        },

        methods:{
            setAuthenticated(status) {
                this.authenticated = status;
            },

            logout(){
                this.authenticated = false;
                this.$router.push({ path: "/" });
            },         
        },

        router:router
    }).$mount("#app");

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('disconnect', showDisconnectMessage);
})();