function navigate(target)
{
    const active_tab = document.getElementsByClassName('active-tab')[0];
    active_tab.classList.remove("active-tab");

    const target_tab = document.getElementById(target);
    target_tab.classList.add('active-tab');

    history.pushState({}, '', target);
}