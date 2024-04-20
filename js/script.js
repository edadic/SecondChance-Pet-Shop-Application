console.log("Script loaded");
var app = $.spapp({
  defaultView: "#home",
  templateDir: "./scss/",
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
    activePage();
  },
});

app.route({
  view: "about",
  load: "about.html",
  onCreate: function () {},
  onReady: function () {
    console.log("About is ready");
    fetchTeamMembers("team-members-about");
    activePage();
  },
});

app.route({
  view: "service",
  load: "service.html",
  onCreate: function () {},
  onReady: function () {
    console.log("Service is ready");
    fetchAnimals();
    activePage();
  },
});

app.route({
  view: "sign-up",
  load: "sign-up.html",
  onCreate: function () {},
  onReady: function () {
    activePage();
    console.log("sign up is ready");
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("signUpForm");

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        signup(form);
      });
    });
  },
});

app.route({
  view: "login",
  load: "login.html",
  onCreate: function () {},
  onReady: function () {
    console.log("Login is ready");
    activePage();
    setTimeout(function () {
      document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          let enteredUsername = document.getElementById("email").value;
          let enteredPassword = document.getElementById("password").value;
          login(enteredUsername, enteredPassword);
        });
    }, 0);
  },
});

app.route({
  view: "contact",
  load: "contact.html",
  onCreate: function () {},
  onReady: function () {
    activePage();
    console.log("Contact is ready");
    initContactForm("contact-form");
  },
});

app.route({
  view: "booking",
  load: "booking.html",
  onCreate: function () {},
  onReady: function () {
    activePage();
    console.log("Booking is ready");
    initBookingForm("booking-form");
  },
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
        "add_inquiries.php",
        data,
        function (response) {
          console.log("Inquiry sent", response);
          form.reset();
          $(".alert-success").show();
        },
        function (error) {
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
        "add_bookings.php",
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

function signup(form) {
  let formData = {};
  new FormData(form).forEach((value, key) => {
    formData[key] = value;
  });

  if (formData.password === formData.passwordconfirm) {
    console.log(formData);
    alert("Sign up successful!");
    window.location.href = "#account";
    form.reset();
  } else {
    alert("Passwords do not match. Please try again.");
  }
}

function login(enteredUsername, enteredPassword) {
  fetch(
    "/Web_programming_2024_edadic/web-project/edadic-Web_programming_2024_edadic/json/users.json"
  )
    .then((response) => response.json())
    .then((users) => {
      let user = users.find(
        (user) =>
          user.email === enteredUsername && user.password === enteredPassword
      );

      if (user) {
        console.log(user);
        alert("Login successful");
        window.location.href = "#home";
      } else {
        alert("You don't have an account yet. Please sign up.");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function fetchTestimonials() {
  RestClient.get("get_testimonials.php", function (data) {
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
  RestClient.get("get_team_members.php", function (data) {
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
  RestClient.get("get_animals.php", function (data) {
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

function activePage() {
  $(".nav-item.nav-link").click(function () {
    $(".nav-item.nav-link").removeClass("active");
    $(this).addClass("active");
  });
}

app.run();
