export function validateAppointmentForm(form) {
  const errors = {}

  if (!form.patientName.trim())
    errors.patientName = 'Nom du patient requis'

  if (!form.phone.trim())
    errors.phone = 'Numéro de téléphone requis'
  else if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, '')))
    errors.phone = 'Numéro invalide (10 chiffres)'

  if (!form.specialty)
    errors.specialty = 'Spécialité requise'

  if (!form.doctor.trim())
    errors.doctor = 'Nom du médecin requis'

  if (!form.date)
    errors.date = 'Date requise'
  else if (new Date(form.date) < new Date(new Date().toDateString()))
    errors.date = 'La date ne peut pas être dans le passé'

  if (!form.time)
    errors.time = 'Créneau horaire requis'

  if (!form.type)
    errors.type = 'Type de consultation requis'

  return errors
}
