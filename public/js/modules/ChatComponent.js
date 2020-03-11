export default {
    props: ['msg'],

    template: `
            <p class="new-message" :class="{ 'my-message' : matchedID}">
                <span>{{ msg.message.nickname }} says: ></span>
                {{ msg.message.content }}
            </p>
    `,

    data: function(){
        return { message: "hello from the template",
        matchedID: this.$parent.socketID == this.msg.id         
    };

    }

}