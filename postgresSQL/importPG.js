process.stdin.on('readable', function(){
    console.log(process.stdin.read());
});