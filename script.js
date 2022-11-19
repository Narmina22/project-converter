fetch('GET https://api.exchangerate.host/latestgit add .')
.then(res => res.json())
.then(data => console.log(data))