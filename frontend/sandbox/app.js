const list = document.getElementById("list");
list.addEventListener('click', (e) => {
    console.log(`Hello ${e.target.textContent}`);
});