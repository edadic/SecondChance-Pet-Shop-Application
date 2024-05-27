$(document).ready(function () {
  const currentUser = window.localStorage.getItem("user");
  if (currentUser) {
    console.log("Current user", currentUser);
    $("#login-link").addClass("d-none");
    $("#logout-link").removeClass("d-none");
    $("#account-link").removeClass("d-none");
  }

  console.log("Script loaded");
  var app = $.spapp({
    defaultView: "#home",
    templateDir: "./views/",
    pageNotFound: "error_404",
    reloadView: true,
  });

  app.route({
    view: "home",
    load: "home.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Home is ready");
      console.log("constants", Constants.API_BASE_URL);
      initBookingForm("booking-form-home");
      fetchTestimonials();
      fetchTeamMembers("team-members");
    },
  });

  app.route({
    view: "about",
    load: "about.html",
    onCreate: function () {},
    onReady: function () {
      console.log("About is ready");
      fetchTeamMembers("team-members-about");
    },
  });

  app.route({
    view: "service",
    load: "service.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Service is ready");
      fetchAnimals();
    },
  });

  //Logout app route
  app.route({
    view: "logout",
    load: "logout.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Logout is ready!");
      window.localStorage.clear();
      window.location.hash = "#home";
      window.location.reload();
    },
  });

  app.route({
    view: "log-in",
    load: "log-in.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Signin is ready!");
      $("#signin-form").validate({
        rules: {
          password: "required",
          email: {
            required: true,
            email: true,
          },
        },
        invalidHandler: function (event, validator) {
          console.log("Invalid form login");
          $(".alert-danger").show();
        },
        submitHandler: function (form, event) {
          console.log("Sending login request...");
          event.preventDefault();
          let data = {};
          $.each($(form).serializeArray(), function () {
            console.log(this.name, this.value);
            data[this.name] = this.value;
          });

          console.log("valid form", data);
          RestClient.post(
            "login",
            data,
            function (response) {
              console.log("User logged in", response);
              window.localStorage.setItem("token", response.token);
              window.localStorage.setItem("user", response.name);
              window.location.hash = "#home";
              window.location.reload("/");
            },
            function (error) {
              $(".alert-danger").show();
            }
          );
        },
      });
    },
  });

  app.route({
    view: "contact",
    load: "contact.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Contact is ready");
      initContactForm("contact-form");
    },
  });

  app.route({
    view: "booking",
    load: "booking.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Booking is ready");
      initBookingForm("booking-form");
    },
  });

  app.route({
    view: "account",
    load: "account.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Account is ready!");
      RestClient.get("users/current", function (data) {
        console.log("Current user: ", data);
        $("#name").val(data.name);
        $("#phone").val(data.mobile_number);
        $("#addressLine1").val(data.address_line1);
        $("#addressLine2").val(data.address_line2);
        $("#city").val(data.city);
        $("#zipCode").val(data.zip_code);
        $("#image").attr("src", data.image);

        $("#personal-info-form").validate({
          rules: {
            password: "required",
            password_confirmation: "required",
            email: {
              required: true,
              email: true,
            },
          },
          invalidHandler: function (event, validator) {
            $(".alert-danger").show();
            console.log("Invalid form");
          },
          submitHandler: function (form, event) {
            event.preventDefault();
            let data = {};
            $.each($(form).serializeArray(), function () {
              console.log(this.name, this.value);
              data[this.name] = this.value;
            });

            console.log("valid form", data);
            RestClient.post(
              "users/me",
              data,
              function (response) {
                alert("Account updated successfully");
                console.log("Account updated", response);
              },
              function (error) {
                alert("Account update failed. Please try again.");
                $(".alert-danger").show();
              }
            );
          },
        });
      });
      deleteUser();
    },
  });

  app.route({
    view: "sign-up",
    load: "sign-up.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Sign up is ready");
      $(".alert-danger").hide();
      $("#signup-form").validate({
        rules: {
          password: "required",
          password_confirmation: "required",
          email: {
            required: true,
            email: true,
          },
        },
        invalidHandler: function (event, validator) {
          $(".alert-danger").show();
          console.log("Invalid form");
        },
        submitHandler: function (form, event) {
          event.preventDefault();
          let data = {};
          $.each($(form).serializeArray(), function () {
            console.log(this.name, this.value);
            data[this.name] = this.value;
          });

          console.log("valid form", data);
          RestClient.post(
            "users",
            data,
            function (response) {
              console.log("User added", response);
              alert("Sign up successful. Please login.");
              window.location.hash = "#log-in";
              form.reset();
              $(".alert-success").show();
            },
            function (error) {
              alert("Sign up unsuccessful. Please try again.");
              console.log("Error adding user", error);
              $(".alert-danger").show();
            }
          );
        },
      });
    },
  });

  app.run();
});

function initContactForm(form_id) {
  $(".alert-success").hide();
  $(".alert-danger").hide();

  $(`#${form_id}`).validate({
    rules: {},
    invalidHandler: function (event, validaor) {
      $(".alert-danger").show();
      console.log("Invalid form");
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      let data = {};
      $.each($(form).serializeArray(), function () {
        console.log(this.name, this.value);
        data[this.name] = this.value;
      });

      console.log("valid form", data);
      RestClient.post(
        "inquiry",
        data,
        function (response) {
          console.log("Inquiry sent", response);
          alert("Inquiry sent successfully");
          form.reset();
          $(".alert-success").show();
        },
        function (error) {
          alert("Inquiry not sent. Please try again.");
          console.log("Error adding contact", error);
          $(".alert-danger").show();
        }
      );
    },
  });
}

function initBookingForm(form_id) {
  $(".alert-success").hide();
  $(".alert-danger").hide();

  $(`#${form_id}`).validate({
    rules: {},
    invalidHandler: function (event, validaor) {
      $(".alert-danger").show();
      console.log("Invalid form");
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      let data = {};
      $.each($(form).serializeArray(), function () {
        console.log(this.name, this.value);
        data[this.name] = this.value;
      });

      console.log("valid form", data);
      RestClient.post(
        "bookings",
        data,
        function (response) {
          console.log("Booking added", response);
          form.reset();
          $(".alert-success").show();
        },
        function (error) {
          console.log("Error adding booking", error);
          $(".alert-danger").show();
        }
      );
    },
  });
}

function fetchTestimonials() {
  RestClient.get("testimonials", function (data) {
    console.log("Rest client data: ", data);
    const testimonialsContainer = document.getElementById(
      "testimonials-container"
    );
    testimonialsContainer.innerHTML = "";

    data.forEach((testimonial) => {
      const testimonialCard = document.createElement("div");
      testimonialCard.className = "col-md-4 mb-4 testimonial-card"; // Set up columns for a 3-column layout
      testimonialCard.innerHTML = `
      <div class="card">
        <img class="card-img-top" src="${testimonial.image}" alt="Testimonial image">
        <div class="card-body">
          <h5 class="card-title">${testimonial.name}</h5>
          <p class="card-text">${testimonial.comment}</p>
        </div>
      </div>
    `;
      testimonialsContainer.appendChild(testimonialCard);
    });
  });
}

function fetchTeamMembers(container_id) {
  RestClient.get("team_member", function (data) {
    console.log("Rest client data: ", data);
    const teamContainer = document.getElementById(container_id);
    console.log("teamContainer", teamContainer);
    teamContainer.innerHTML = "";
    data.forEach((member) => {
      const memberElement = `
                      <div class="col-lg-3 col-md-6">
                          <div class="team card position-relative overflow-hidden border-0 mb-4">
                              <img class="card-img-top" src="${member.image}" alt="${member.name}">
                              <div class="card-body text-center p-0">
                                  <div class="team-text d-flex flex-column justify-content-center bg-light">
                                      <h5>${member.name}</h5>
                                      <i>${member.position}</i>
                                  </div>
                                  <div class="team-social d-flex align-items-center justify-content-center bg-dark">
                                      <a class="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="${member.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                      <a class="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="${member.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                                      <a class="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="${member.linkedin}"target="_blank"><i class="fab fa-linkedin-in"></i></a>
                                      <a class="btn btn-outline-primary rounded-circle text-center px-0" style="width: 36px; height: 36px;" href="${member.instagram}"target="_blank"><i class="fab fa-instagram"></i></a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      teamContainer.innerHTML += memberElement;
    });
  });
}

function fetchAnimals() {
  RestClient.get("animal", function (data) {
    console.log("Rest client data: ", data);
    const dogs = [];
    const cats = [];
    const therapyAnimals = [];

    // Separate the animals into different arrays based on their type
    data.forEach((animal) => {
      if (animal.service_name === "Dog Adoption") {
        dogs.push(animal);
      } else if (animal.service_name === "Cat Adoption") {
        cats.push(animal);
      } else if (animal.service_name === "Pet Therapy") {
        therapyAnimals.push(animal);
      }
    });

    populateAnimals(dogs, "dogs-row");
    populateAnimals(cats, "cats-row");
    populateAnimals(therapyAnimals, "therapy-row");
  });
}

function deleteUser() {
  $("#delete-button").on("click", function () {
    const confirmed = confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      RestClient.delete(
        "users/current",
        {},
        function (response) {
          console.log("User deleted", response);
          window.localStorage.clear();
          alert("User deleted successfully");
          window.location.hash = "#home";
          window.location.reload();
        },
        function (error) {
          console.error("Error deleting user", error);
          alert("Failed to delete account. Please try again.");
        }
      );
    }
  });
}

function populateAnimals(animals, sectionId) {
  console.log(animals);

  const section = document.getElementById(sectionId);
  if (!section) {
    console.error("Section not found:", sectionId);
    return;
  }

  // Clear the section
  section.innerHTML = "";

  // Create a card for each animal and add it to the section
  animals.forEach((animal) => {
    const card = `
          <div class="col-lg-3 col-md-6">
              <div class="team card position-relative overflow-hidden border-0 mb-4">
                  <img class="card-img-top" src="${animal.image}" alt="">
                  <div class="card-body text-center p-0">
                      <div class="team-text d-flex flex-column justify-content-center bg-light">
                          <h5>${animal.name}</h5>
                          <i>${animal.breed}</i>
                      </div>
                      <div class="team-social d-flex align-items-center justify-content-center bg-dark">
                          <a href="#booking" class="btn btn-lg btn-primary mt-4 mt-md-1 px-2">Book a Visit</a>
                      </div>
                  </div>
              </div>
          </div>
      `;

    section.innerHTML += card;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav>li>a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const navbarMenu = document.querySelector(".navbar-collapse");
      if (navbarMenu) {
        navbarMenu.classList.remove("show");
      }
    });
  });
});
