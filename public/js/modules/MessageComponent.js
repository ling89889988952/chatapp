// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement
import ChatComponent from "./ChatComponent.js";

const socket = io();

export default {
    props: ['currentuser'],

    template: `
    <div>
        <section class="form-container">
			<label for="nickname">Your Nickname</label>
			<input type="text" id="name" class="name" value ='' v-bind:currentuser='nickname'>

			<form>
				<label for="message">Something to say?</label>
				<textarea v-model="message" class="message" type="text" autocomplete="off" id="textarea"></textarea>
				<input @click.prevent="dispatchMessage" type="submit">
			</form>
		</section>

        <section class="messages">
			<ul id="messages">
				<!-- render a new message component for every message -->
                <newmessage v-for="message in messages" :msg="message">
                </newmessage>
			</ul>
        </section>

        </div>
        `

    ,

    

    data(){
        return {
                // nickname: '',
                message:'',
                messages: [],
                socketID : this.$parent.sockData.socketID,
                // matchedID: this.$parent.sockData.socketID == this.msg.id,
                // content: this.message    

                // message:{
                //     nickname: this.$parent.sockData.nickname,
                //     content: this.$parent.sockData.message,
                //     matchedID: this.$parent.sockData.socketID 
                // }
        }
     
    },

    created: function(){
        this.appendMessage() 
    
    },
   
    methods: {
        
        // emit a message event to the server so that it can in 
        // turn send this to anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');
                //  this.input.nickname == this.$parent.sockData.nickname
                //  this.input.message  == this.$parent.sockData.message
                    // this.message =this.$parent.sockData.message
                    // this.nickname =this.$parent.sockData.nickname
                    socket.emit('chat_message', {
                        content:  this.message,
                        name: this.nickname 
                        // || "anonymous"
                    })
        
                    this.message = "";
                },

        appendMessage(){
            
            messages.push(message)

            }
        },
        

    mouted: function() {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatComponent
    }  
}










