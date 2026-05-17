document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm-password");
    const confirmErrorMsg = document.querySelector(".confirm-error-msg");
    
    form.addEventListener("submit", function (event) {
        let passwordsMatch = true;
        if (confirm) {
            passwordsMatch = password.value === confirm.value;
        }
        
        if (!form.checkValidity() || !passwordsMatch) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (confirm) {
            if (!passwordsMatch) {
                confirm.classList.add("is-invalid");
                confirm.classList.remove("is-valid");
                confirm.classList.add("password-mismatch");
                confirmErrorMsg.style.display = "block";
            } else {
                confirm.classList.remove("is-invalid", "password-mismatch");
                confirm.classList.add("is-valid");
                confirmErrorMsg.style.display = "none";
            }
        }

        form.classList.add("was-validated");

        if (form.checkValidity() && passwordsMatch) {
        event.preventDefault();
        setTimeout(() => {
            window.location.href = "home.html";
        }, 100);
        }
    });
});

