let detectwp = (string) => {
if(/\s/.test(string)){
return 1;
}
else{
return 0;
}
};

module.exports = {detectwp};