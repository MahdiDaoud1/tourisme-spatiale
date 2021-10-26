const intros = document.querySelectorAll(".introduction");
function shower(shows, animation) {
  shows.forEach((show) => {
    if (
      this.scrollY + this.innerHeight >= show.offsetTop &&
      this.scrollY < show.offsetTop + show.offsetHeight
    ) {
      show.style.animation = `${animation} 2s ease 0.1s forwards`;
    }
    if (
      this.scrollY + this.innerHeight < show.offsetTop ||
      this.scrollY > show.offsetTop + show.offsetHeight
    ) {
      show.style.animation = null;
    }
  });
}
function scaler(scaled) {
  if (
    this.scrollY + this.innerHeight >=
      scaled.offsetTop + (4 * scaled.offsetHeight) / 6 &&
    this.scrollY < scaled.offsetTop + scaled.offsetHeight
  ) {
    scaled.style.transform = "scale(1.15,1.1) translateY(-20px)";
    scaled.style.boxShadow = "-20px 24px 20px rgb(0, 1, 2)";
    scaled.style.transition = "0.8s ease all";
  }
  if (
    this.scrollY + this.innerHeight < scaled.offsetTop ||
    this.scrollY > scaled.offsetTop + scaled.offsetHeight
  ) {
    scaled.style.transform = null;
    scaled.style.boxShadow = null;
  }
}
function animation() {
  shower(intros, "appear");
}
window.addEventListener("scroll", animation);
