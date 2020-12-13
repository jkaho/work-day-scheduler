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

    var currentHour = moment().format('H');

    $(".time-block").each(function() {
        if (parseInt(currentHour) === parseInt(this.id)) {
            $(this).addClass("present");
        } else if (parseInt(currentHour) > parseInt(this.id)) {
            $(this).addClass("past");
        } else {
            $(this).addClass("future");
        }
    })

    var storedEvents = [];

    initialise();

    function renderEvents() {
        $("textarea").each(function() {
            this.value = "";
        })
        
        $.each(storedEvents, function() {
            $("textarea." + this.eventTime)[0].value = this.eventText;
        }) 
    }

    function initialise() {
        var userEvent = JSON.parse(localStorage.getItem("storedEvents"));
        if (userEvent !== null) {
            storedEvents = userEvent;
        }

        renderEvents();
    }

    function storeEvents() {
        localStorage.setItem("storedEvents", JSON.stringify(storedEvents));
    }

    $(".saveBtn").on("click", function(event) {
        event.preventDefault();
        var className = $(event.target).attr("class");

        var eventObject = {
            eventTime: className,
            eventText: $("textarea." + className)[0].value
        }

        // if (eventObject.eventText === "") {
        //    alert("There is no event to save.")
        //    return;
        // }

        // if there is already an existing event for a time, replace the event, else push
        
        if (storedEvents.length > 0) {
            $.each(storedEvents, function() {
                if (this.eventTime === event.target.className) {
                    storedEvents.splice($.inArray(this, storedEvents), 1);
                }    
            });
        }

        storedEvents.push(eventObject);
        storeEvents();
        renderEvents();
    })
});
