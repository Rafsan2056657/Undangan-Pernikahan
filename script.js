if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

if (window.location.hash) {
    history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
    );
}

const tanggalPernikahan = new Date("2027-06-06T08:00:00+07:00").getTime();
function updateCountdown() {
    const sekarang = Date.now();
    const selisih = tanggalPernikahan - sekarang;

    const hari = Math.max(0, Math.floor(selisih / 86400000));
    const jam = Math.max(0, Math.floor((selisih % 86400000) / 3600000));
    const menit = Math.max(0, Math.floor((selisih % 3600000) / 60000));
    const detik = Math.max(0, Math.floor((selisih % 60000) / 1000));

    document.getElementById("days").textContent = String(hari).padStart(2, "0");
    document.getElementById("hours").textContent = String(jam).padStart(2, "0");
    document.getElementById("minutes").textContent = String(menit).padStart(2, "0");
    document.getElementById("seconds").textContent = String(detik).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const rootElement = document.querySelector(":root");
const AudioIconWrapper = document.querySelector(".audio-icon-wrapper");
const song = document.querySelector("#song");
const audioIcon = document.querySelector(".audio-icon-wrapper i");

let isPlaying = false;

function disableScroll() {
    window.onscroll = function() {
        window.scrollTo(0, 0);
    };

    rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
    window.onscroll = null;
    rootElement.style.scrollBehavior = "smooth";
    playAudio();
}

function playAudio() {
    song.volume = 0.1;
    AudioIconWrapper.style.display = "flex";

    song.play().then(() => {
        isPlaying = true;
        audioIcon.className = "bi bi-pause";
    }).catch(() => {
        isPlaying = false;
        audioIcon.className = "bi bi-disc";
    });
}

AudioIconWrapper.onclick = async function() {
    if (isPlaying) {
        song.pause();
        isPlaying = false;
        audioIcon.className = "bi bi-disc";
    } else {
        try {
            await song.play();
            isPlaying = true;
            audioIcon.className = "bi bi-pause";
        } catch (error) {
            isPlaying = false;
            audioIcon.className = "bi bi-disc";
        }
    }
};

window.addEventListener("load", function() {
    window.scrollTo(0, 0);
    disableScroll();

    const form = document.getElementById("my-form");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const data = new FormData(form);
            const action = e.target.action;

            fetch(action, {
                method: "POST",
                body: data
            }).then(() => {
                alert("Konfirmasi kehadiran berhasil terkirim!");
            });
        });
    }
});
