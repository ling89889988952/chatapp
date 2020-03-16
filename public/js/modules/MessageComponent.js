// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement
import ChatComponent from "./ChatComponent.js";

const socket = io();

// props inside the component is coming from the login route - this is the nickname field
// and is send via the route params

export default {
    props: ["myusername"],

    template: `
    <div class="chat-container">
        <section class="form-container">
            <h2>Nickname: <br> {{ myusername }} </h2>


			<form>
				<label for="message">Something to say?</label>
				<textarea v-model="message" class="message" type="text" autocomplete="off" id="textarea"></textarea>
				<input @click.prevent="dispatchMessage"  type="submit">
			</form>
		</section>

        <section class="messages">
            <ul id="messages">
               
                    <p class="notice"> {{ myusername }} joined.</p>
                

				<!-- render a new message component for every message -->
                <newmessage v-for="message in messages" :msg="message"> </newmessage>
			</ul>
        </section>
    </div>
    `,    

    data() {
        return {
            message:'',
            messages: [],
            socketID : this.$parent.sockData.socketID,
            nickname:this.myusername
        }
    },        
        

   
    methods: {    
        
        // emit a message event to the server so that it can in 
        // turn send this to anyone who's connected
        dispatchMessage(){
            console.log('handle emit message');
            
            socket.emit('chat_message', {
                content:  this.message,
                name: this.nickname
            });
            this.message = "";
            socket.addEventListener('new_message',(message)=>{
                this.messages.push(message);
            });

        },
          
      
    },        

    mounted: function() {
        console.log('vue is done mounting');
        // this.socket.emit('new_message', (message) => {
        //     this.messages.push(message);
        //   });    
        },

    

    components:{
        newmessage: ChatComponent
    },



   
}

