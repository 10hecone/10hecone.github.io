const minuteur = document.getElementsByClassName("title-horloge")[0];
const startBot = new Date('February 19, 2023 00:00:00');

function checkTime() {
    const date = new Date(startBot.getTime() - new Date().getTime());
    minuteur.innerHTML = `Bot start in ${date.getDate() - 1} days ${date.getHours()} hours ${date.getMinutes()} minutes ${date.getSeconds()} seconds`;
    setTimeout(checkTime, 1200);
}

checkTime();