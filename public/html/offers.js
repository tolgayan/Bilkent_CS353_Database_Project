const users = require('./dat');
document.getElementById("offers").innerHTML = `
<div class="offer_content"> <div class="offer_header">
    <h2>Offerer Club:${users.map(function (suser){
    console.log(suser.username);
    return suser.username;
})}</h2> </div>
    <div class="offer_body"> ${users.map(function(suser){
    return suser.id;
}).join('')}</div>
    <button class="my_button">Accept</button>
    <button class="my_button">Deny</button>
</div>`;