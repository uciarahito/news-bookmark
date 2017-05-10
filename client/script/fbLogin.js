window.fbAsyncInit = function() {
  FB.init({
    appId      : '1188694054574729',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    // console.log(response);
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      FB.api('/me', {fields: 'first_name, name, email'}, function (apiResponse) {
        console.log(apiResponse.id);
        console.log(apiResponse.first_name);
        console.log(apiResponse.email);
        console.log(response.authResponse.accessToken);
        window.localStorage.setItem('token', response.authResponse.accessToken);
        window.localStorage.setItem('id', apiResponse.id);
        window.localStorage.setItem('name', apiResponse.first_name);
        window.localStorage.setItem('login_method', 'facebook');
        let url = 'http://localhost:3000/api/signinfb';
        let body = {
          id: apiResponse.id,
          email: apiResponse.email,
          first_name:apiResponse.first_name,
          token: response.authResponse.accessToken
        }
        axios.post(url, body)
          .then((res) => {
            console.log(res);
            // window.location.href='../index.html';
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // function facebookLogOut() {
  //   if(localStorage.getItem('login_method') === 'facebook') {
  //     if(confirm('Log out from Facebook as well?')) {
  //       FB.logout(function(response) {
  //         console.log(response);
  //       });
  //     }
  //   }
  // }
