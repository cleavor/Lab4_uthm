// Show Menu
const sidebarToggle = (sidebarId, toggleId) => {
  const sidebar = document.getElementById(sidebarId),
        toggle = document.getElementById(toggleId);

  if(sidebar && toggle){
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('active')
      toggle.classList.toggle('rotate')
    })
  }
}
sidebarToggle('sidebar', 'nav-toggle')
 
// Link Active
const menuLink = document.querySelectorAll('.menu')
function linkActive(){
  menuLink.forEach(i => i.classList.remove('active'))
  this.classList.add('active')
}
menuLink.forEach(i => i.addEventListener('click', linkActive))

function clearForm() {
  document.getElementById("registrationForm").reset();
}