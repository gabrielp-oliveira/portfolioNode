// function validateEmail(email) {
function validateEmail(req, res, next) {
    const email = req.body.info.email
    if(email.trim() == ''){
        throw '1'
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(email).toLowerCase());
    if(result){
        next()
    }else{
        throw '2'
    }
}
module.exports = validateEmail