(function(){
	
    // Inicializar Firebase
    var config = {    
        apiKey: "AIzaSyDc4O906kfHfNjNG10iO7PIIBNMkebQZKg",
        authDomain: "webcreate-ti.firebaseapp.com",
        databaseURL: "https://webcreate-ti.firebaseio.com",
        projectId: "webcreate-ti",
        storageBucket: "webcreate-ti.appspot.com",
        messagingSenderId: "192663076956"
    };
    firebase.initializeApp(config);

    // Obtener los elementos de index.html por su id=""
    var txtEmail    = document.getElementById('txtEmail');
    var txtPassword = document.getElementById('txtPassword');
    var btnLogin    = document.getElementById('btnLogin');

	btnLogin.addEventListener('click',e =>{
		//Obtener el Email y la password	
		var email 	  = txtEmail.value;
		var password  = txtPassword.value;
		//Validamos el formulario
		Autentificacion(email, password);
	});
	
	function limpiarFormulario(){
        //Obtener los elementos de index.html por su id="" y le ponemos como valor en blanco .value="";	
        document.getElementById('txtEmail').value ="";
        document.getElementById('txtPassword').value ="";
	}

/*-------------------------------------------- Funciones de las Alertas -------------------------------------------- */  			
	function AlertaBienIngreso(){
		swal({
            type: 'success',
            title: 'Se ha autentificado correctamente',
            showConfirmButton: false,
            timer: 1500
	    })
	}

	function AlertaCampoVacioEmail(){
		swal({
			type: 'warning',
			title: 'Le falta ingresar su Correo Electronico',
			showConfirmButton: false,
			timer: 1500
		})
	}

	function AlertaCamposVacioPassword(){
		swal({
			type: 'warning',
			title: 'Le falta ingresar su Contraseña',
			showConfirmButton: false,
			timer: 1500
        })
    }

	function AlertaCamposVacios(){
		swal({
			type: 'warning',
			title: 'Ingrese sus Credenciales',
			showConfirmButton: false,
			timer: 1500
	    })
	}

	function AlertaErrorIngreso(){
		swal({
			type: 'error',
			title: 'Error en sus Credenciales',
			showConfirmButton: false,
			timer: 1500
	    })
	}

	function AlertaRegistroExitoso(){
		swal({
			type: 'success',
			title:'Gracias por Registrarte',
			text: 'Revisa tu correo electrónico, para verificar la cuenta',
			showConfirmButton: false,
			timer: 1500
        })
	}
    
	function Observador(){
		firebase.auth().onAuthStateChanged(function(user) {
		  	if (user) {
		  		console.log("Existe usuario activo");
			    // User is signed in.
			    var displayName = user.displayName;
			    var email = user.email;
			    var emailVerified = user.emailVerified;
			    var photoURL = user.photoURL;
			    var isAnonymous = user.isAnonymous;
			    var uid = user.uid;
			    var providerData = user.providerData;
                //Imprimir por consola todos los datos del usuario
                console.log("Nombre del usuario: "+displayName);
                console.log("Email del Usuario: "+email);
                console.log("Si el email ha sido verificado: "+emailVerified);
                console.log("Foto del Usuario: "+photoURL);
                console.log("Codigo del Usuario: "+uid);
                Redirect('./index.html');
                // ...
		  	}else{
                // User is signed out.
			    console.log("No existe usuario activo");
		  	}
	    });
    }

	function CerrarSesion(){
		firebase.auth().signOut()
			.then(function(){
				console.log("Se ha cerrado Sesion");
			})
			.catch(function(error){
				console.log(error);
			}) 	
    }

    function Autentificacion(e, p){
		if(e != "" ) {
            if(p != "") {
                firebase.auth().signInWithEmailAndPassword(e,p)
                    .then(function(){
                        AlertaBienIngreso();
                        //limpiarFormulario(); 
                        Redirect('./index.html');
                    })
                    .catch(function(error){
                        //Manejo de Errores.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);  
                        AlertaErrorIngreso();
                    });        
            }else{
                AlertaCamposVacioPassword();
            }
        }else{
			AlertaCampoVacioEmail();
		}
    }

    function validateEmail(mail){  
    	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.val())) {  
    		mail.parent().find('p').remove();
        	return (true)  
    	}else{
    		mail.parent().find('p').remove();
    		mail.parent().append('<p class="text-danger">Email no valido</p>');
    	} 
        return (false)  
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


        function ActualizarPerfil(){
          
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: "Jane Q. User",
              photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
          // Update successful.
          }).catch(function(error) {
          // An error happened.
          });  


        }


			//Metòdo Activo para saber el estado del Usuario
  		Observador();	
}());


	 

	



	

 