let stepper1
let stepper2
// var stepper3
let stepper4
let stepperForm

document.addEventListener('DOMContentLoaded', function () {
  stepper1 = new Stepper(document.querySelector('#stepper1'))
  stepper2 = new Stepper(document.querySelector('#stepper2'), {
    linear: false
  })

  stepper3 = new Stepper(document.querySelector('#stepper3'))

  const stepperFormEl = document.querySelector('#stepperForm')
  stepperForm = new Stepper(stepperFormEl, {
    animation: true
  })

  const btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
  const stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'))
  const inputMailForm = document.getElementById('inputMailForm')
  const inputPasswordForm = document.getElementById('inputPasswordForm')
  const form = stepperFormEl.querySelector('.bs-stepper-content form')

  btnNextList.forEach(function (btn) {
    btn.addEventListener('click', function () {
      stepperForm.next()
    })
  })

  stepperFormEl.addEventListener('show.bs-stepper', function (event) {
    form.classList.remove('was-validated')
    const nextStep = event.detail.indexStep
    let currentStep = nextStep

    if (currentStep > 0) {
      currentStep--
    }

    const stepperPan = stepperPanList[currentStep]

    if ((stepperPan.getAttribute('id') === 'test-form-1' && !inputMailForm.value.length) ||
    (stepperPan.getAttribute('id') === 'test-form-2' && !inputPasswordForm.value.length)) {
      event.preventDefault()
      form.classList.add('was-validated')
    }
  })
})
