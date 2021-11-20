const messageData = require('./../messageData')
function page (targetInfo){

    return `        <div style="margin: 0; padding: 0;
    max-width: 500px;  border: 1px solid rgb(0, 0, 0, 0.1);
    background-color: rgb(239, 239, 247); border-radius: 5px; height: 400px;">
       <div style="margin: 0; padding: 0;">
           <h2 style="color: rgb(27, 17, 100); padding-left: 10px;">Succes in Delivered the Message</h2>
           <p style=" margin: 0; padding: 10px;">${messageData[targetInfo.Language].first}
</p>
       </div>
       <div style="background-color: rgb(235, 222, 213); ">

           <div style=" margin: 0; margin-bottom: 0px; padding: 10px;">
           
           <p>Name: <strong>${targetInfo.name}</strong></br></p>
           <p>Email: <strong>${targetInfo.email}</strong></br></p></br>
           <p style=" margin: 0; margin-bottom: 10px; padding: 10px;">${targetInfo.message}</p>

           </div>
       </div>
       <div style="padding-left: 10px;"> ${messageData[targetInfo.Language].second}

       </div>
   </div>`
}

module.exports = page