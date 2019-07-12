document.addEventListener("DOMContentLoaded", function() {
    //load_navpane();
    openOnly(0);
    openOnly(1);
});

function load_navpane() {
    const width = window.innerWidth;
    if (width <= 1200) {
        return;
    }

    let nav = document.getElementsByClassName("md-nav");
    let open = 0;
    for(var i = 0; i < nav.length; i++) {
        if (typeof nav.item(i).style === "undefined") {
            continue;
        }

        if (nav.item(i).getAttribute("data-md-level") && nav.item(i).getAttribute("data-md-component")) {
            if (open > 1) continue;
            //nav.item(i).style.display = 'block';
            //nav.item(i).style.overflow = 'visible';
            open++;
        }
    }

    nav = document.getElementsByClassName("md-nav__toggle");
    for(var i = 0; i < nav.length; i++) {
        nav.item(i).checked = true;
    }
}

function openOnly(n) {
    let nav = document.querySelectorAll('.md-nav[data-md-level="1"]').item(n);
    nav.style.display = 'block';
    nav.style.overflow = 'visible';
    let toggle = nav.parentElement.children.item(0);
    toggle.checked = true;
}