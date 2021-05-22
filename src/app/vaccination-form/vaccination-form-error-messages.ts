export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const VaccinationFormErrorMessages = [
  new ErrorMessage(
    'key',
    'required',
    'Eine Abkürzung für die Impfung muss angegeben werden'
  ),
  new ErrorMessage(
    'date',
    'required',
    'Es muss ein Datum für die Impfung ausgewählt werden'
  ),
  new ErrorMessage(
    'max_registrations',
    'required',
    'Es muss eine maximale Registrierungsanzahl für die Impfung angegeben werden'
  ),
  new ErrorMessage(
    'key',
    'minlength',
    'Die Abkürzung muss mindestens 5 Zeichen enthalten'
  ),
  new ErrorMessage('Date', 'required', 'Es muss ein Datum angegeben werden'),
  new ErrorMessage(
    'key',
    'maxlength',
    'Die Abkürzung darf höchstens 10 Zeichen enthalten'
  ),

  new ErrorMessage(
    'address',
    'required',
    'Es muss eine vollständige Ortsangabe erfolgen'
  ),
  new ErrorMessage(
    'post_code',
    'required',
    'Es muss eine vollständige Ortsangabe erfolgen'
  ),
  new ErrorMessage(
    'city',
    'required',
    'Es muss eine vollständige Ortsangabe erfolgen'
  )
];
