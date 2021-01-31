const $ = document;

$.addEventListener("DOMContentLoaded", () => {
    console.log("Page chargée");

    $.querySelector(".connect").addEventListener("click", () => {
        $.querySelector(".hidden").classList.toggle("display");
    });

    //   Ecoute de la soumission du formulaire
    $.querySelector("#contact-form").addEventListener(
        "submit",
        async (event) => {
            console.log("Soumission du formulaire");

            // Annule le comportement par défaut du formulaire (cad, le rafraîchissement de la page)
            event.preventDefault();

            // Les données du formulaire
            const data = {
                firstname: $.querySelector("#firstname").value,
                lastname: $.querySelector("#lastname").value,
                email: $.querySelector("#email").value,
                message: $.querySelector("#message").value,
            };

            // console.log(data);

            const response = await axios.post(
                "http://localhost:3000/form",
                data
            );
            console.log(response);

            if (response.status === 200) {
                alert("Formulaire soumis, email envoyé");
            } else {
                alert("ERROR");
            }
        }
    );
});
