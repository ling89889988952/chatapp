export default {
    props: ['msg'],

    template: `
        <p class="new-message" :class="{ 'my-message' : matchedID }">
            <span>{{ msg.message.name }} says: ></span>
            {{ msg.message.content }}
        </p>

        
    `,

    data: 
    function(){
        return { 
            message: "hello from the template",
            matchedID: this.$parent.nickname == this.msg.message.name         
        };
    }

}