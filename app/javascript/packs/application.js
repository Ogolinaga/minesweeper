// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import chatRoomChannel from "../channels/chat_room_channel";

document.addEventListener("turbolinks:load", function() {
  document.getElementById('set_name').addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById('add_name').value
    sessionStorage.setItem('chat_room_name', name)
    chatRoomChannel.announce({ name, type: 'join'})
    document.getElementById('modal').classList.remove('show');
  })

  document.getElementById('send_message').addEventListener("submit", function(event) {
    event.preventDefault();
    let message = document.getElementById('message').value
    if (message.length > 0) {
      chatRoomChannel.speak(message);
      document.getElementById('message').value = ''
    }
  });

  window.addEventListener("beforeunload", function() {
    let name = sessionStorage.getItem('chat_room_name')
    chatRoomChannel.announce({ name, type: 'leave'})
  });
})