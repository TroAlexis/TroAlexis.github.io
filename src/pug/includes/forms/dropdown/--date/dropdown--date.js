import Calendar from 'Includes/forms/calendar/calendar';

export default class DropdownDate extends Calendar {
    constructor(dropdownElement) {
        super(dropdownElement, {
            listeners: {
                buttons: true
            },
        });
        this.element.addEventListener('click', (evt) => {
          if (evt.target.closest(this.domstrings.select)) {
              if (this.elements.content.classList.contains('open')) {
                this.state = 'closed'
              } else {
                  this.state = 'arrival'
              }
              this.elements.content.classList.toggle('open')
          }
        })
    }
}