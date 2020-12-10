import consumer from "./consumer"

const chatRoomChannel = consumer.subscriptions.create("ChatRoomChannel", {
  connected() {
    console.log("Connected to the chat room!");
    document.getElementById('modal').classList.add('show');
  },

  disconnected() {},

  received(data) {
    if (data.message) {
      let current_name = sessionStorage.getItem('chat_room_name')
      let msg_class = data.sent_by === current_name ? "sent" : "received"
      document.getElementById('messages').innerHTML += '<p class="' + msg_class + '">' + data.message + '</p>'
    } else if(data.chat_room_name) {
      let name = data.chat_room_name;
      let announcement_type = data.type === 'join' ? 'присоединился к чату' : 'покинул чат';
      document.getElementById('messages').innerHTML += '<p class="announce"><em>' + name + '</em> ' + announcement_type + '</p>'
    }
  },

  speak(message) {
    let name = sessionStorage.getItem('chat_room_name')
    this.perform('speak', { message, name })
  },

  announce(content) {
    this.perform('announce', { name: content.name, type: content.type })
  }
});

export default chatRoomChannel;