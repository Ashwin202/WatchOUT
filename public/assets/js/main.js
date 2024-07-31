document.getElementById('addFieldsButton').addEventListener('click', function() {
    const additionalFields = document.getElementById('additionalFields');
    const isNewHostSelectorOpened = additionalFields.classList.toggle('show');
    if(isNewHostSelectorOpened)
        document.getElementById('hostSelect').disabled = true;
    else
        document.getElementById('hostSelect').disabled = false;
  });

  document.querySelectorAll('input[name="fileOrPassword"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      const fileUpload = document.getElementById('fileUpload');
      const passwordInput = document.getElementById('passwordInput');
      if (this.value === 'file') {
        fileUpload.classList.remove('d-none');
        passwordInput.classList.add('d-none');
      } else {
        fileUpload.classList.add('d-none');
        passwordInput.classList.remove('d-none');
      }
    });
  });

  const openSelectHostModal = ()=>{
    toggleSidebar()
    $('#test').modal('show')
}