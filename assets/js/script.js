// DISPLAY CURRENT DATE + DAY BELOW HEADING


// COLOR-CODE EACH TIMEBLOCK TO INDICATE WHETHER IT'S IN THE PAST, PRESENT OR FUTURE
// if (moment().format('H')) === div.id) {class: present}
// else if (moment().format('H')) < div.id) {class: future}
// else if (moment().format('H')) > div.id) {class: past}


// WHEN TIMEBLOCK IS CLICKED, USER CAN ENTER TEXT
// html textarea element


// WHEN SAVE BUTTON IS CLICKED WHEN THERE IS TEXT IN THE TIMEBLOCK, IT WILL BE SAVED IN LOCAL STORAGE
// add click event to save buttons so that when they are clicked, textarea value is saved to local storage

$(document).ready(function() {
    var currentDay = moment().format('dddd, MMMM Do, YYYY');
    $("#currentDay").text(currentDay);
    
    $(".time-block").each(function() {
        if (moment().format('H') === this.id) {
            $(this).addClass("present");
        } else if (moment().format('H') > this.id) {
            $(this).addClass("past");
        } else {
            $(this).addClass("future");
        }
    })
});
