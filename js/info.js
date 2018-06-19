var provider = new firebase.auth.GoogleAuthProvider();


//Leer de la base de datos
firebase.database().ref("match")
.on("child_added",function(s){
	var user = s.val();
	$('#view').append("<div class='container'>  <section class='cuadros'> <article> <img src="+user.foto+" alt='Avatar' class='image'>  <div class='overlay'>    <div class='text'>"+user.nombre+"</div>  </div>  </article> </section>  </div>")


})



function CerrarSesion(){
            firebase.auth().signOut()
            .then(function(){
                console.log("Se ha cerrado Sesion");
                provider.addScope('index.html');
                Redirect('./index.html');
            })
            .catch(function(error){
                console.log(error);
            }) 
}

function Redirect (url) {
        var ua        = navigator.userAgent.toLowerCase(),
            isIE      = ua.indexOf('msie') !== -1,
            version   = parseInt(ua.substr(4, 2), 10);

        // Internet Explorer 8 and lower
        if (isIE && version < 9) {
            var link = document.createElement('a');
            link.href = url;
            document.body.appendChild(link);S
            link.click();
        }
        // All other browsers
        else { window.location.href = url; }
    }

