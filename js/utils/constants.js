var Constants = {
 get_api_base_url: function() {
  if(location.hostname == 'localhost') {
    return "http://localhost/Web_programming_2024_edadic/web-project/edadic-Web_programming_2024_edadic/backend/";
  }else {
    return "https://walrus-app-49tpt.ondigitalocean.app/backend/";
  }
 }
};
