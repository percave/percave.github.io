function navigate(target)
{
    const active_tab = document.getElementsByClassName('active-tab')[0];
    active_tab.classList.remove("active-tab");

    const target_tab = document.getElementById(target);
    target_tab.classList.add('active-tab');
}

document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();

    const submit_btn = document.getElementById('submit-btn');
    submit_btn.disabled = true;
    submit_btn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Sending...";

    fetch(
        this.action,
        {
            method: this.method,
            body: new FormData(this),
            headers: {
                accept: 'application/json'
            }
        }
    ).then(function(resp) {

        const status = document.getElementById('status');

        if (resp.ok)
        {
            status.innerHTML = "Thanks for your submission!";
            status.classList.remove();
            status.classList.add('error-success');
        }
        else
        {
            status.classList.remove();
            status.classList.add('error-danger');
            resp.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = "<b>Error!</b> " + data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form"
                }
            })
        }

        submit_btn.disabled = false;
        submit_btn.innerHTML = "Send";
    });
});