const a = document.querySelector(".start")

a.addEventListener("click",() => {
    let category = document.querySelector("#category").value
    localStorage.setItem("cat",category)
})
